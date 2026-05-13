#!/usr/bin/env python3
"""Minimal md to pdf for tareas-operador.md. Handles headers, paragraphs,
bullets, numbered lists, tables, inline bold/italic/code, and blockquotes.
"""
import re
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
)
from reportlab.lib import colors


def parse_inline(text):
    text = text.replace('&', '&amp;')
    text = text.replace('<', '&lt;').replace('>', '&gt;')
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    text = re.sub(r'(?<!\*)\*([^\*]+?)\*(?!\*)', r'<i>\1</i>', text)
    text = re.sub(
        r'`(.+?)`',
        r'<font face="Courier" backColor="#f0f0f0">\1</font>',
        text,
    )
    return text


def convert(md_path, pdf_path):
    with open(md_path, 'r') as f:
        raw = f.read()
    lines = raw.split('\n')

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'TitleX', parent=styles['Title'], fontSize=18, spaceAfter=12,
        textColor=colors.HexColor('#222222'),
    )
    h1_style = ParagraphStyle(
        'H1X', parent=styles['Heading1'], fontSize=15, spaceBefore=14,
        spaceAfter=8, textColor=colors.HexColor('#222222'),
    )
    h2_style = ParagraphStyle(
        'H2X', parent=styles['Heading2'], fontSize=12.5, spaceBefore=10,
        spaceAfter=5, textColor=colors.HexColor('#333333'),
    )
    h3_style = ParagraphStyle(
        'H3X', parent=styles['Heading3'], fontSize=10.8, spaceBefore=7,
        spaceAfter=3, textColor=colors.HexColor('#444444'),
    )
    body_style = ParagraphStyle(
        'BodyX', parent=styles['BodyText'], fontSize=9.5, leading=12,
        spaceAfter=4,
    )
    bullet_style = ParagraphStyle(
        'BulletX', parent=body_style, leftIndent=18, bulletIndent=6,
    )
    quote_style = ParagraphStyle(
        'QuoteX', parent=body_style, leftIndent=14,
        textColor=colors.HexColor('#555555'),
        fontName='Helvetica-Oblique',
    )
    cell_style = ParagraphStyle(
        'CellX', parent=body_style, fontSize=8.5, leading=10.5,
        spaceAfter=0,
    )

    flowables = []

    # Skip YAML frontmatter
    if lines and lines[0].strip() == '---':
        end = 0
        for i in range(1, len(lines)):
            if lines[i].strip() == '---':
                end = i
                break
        lines = lines[end + 1:]

    i = 0
    while i < len(lines):
        line = lines[i].rstrip()

        if not line.strip():
            i += 1
            continue

        if line.strip() == '---':
            flowables.append(Spacer(1, 8))
            i += 1
            continue

        if line.startswith('### '):
            flowables.append(Paragraph(parse_inline(line[4:]), h3_style))
            i += 1
            continue
        if line.startswith('## '):
            flowables.append(Paragraph(parse_inline(line[3:]), h2_style))
            i += 1
            continue
        if line.startswith('# '):
            flowables.append(Paragraph(parse_inline(line[2:]), title_style))
            i += 1
            continue

        # Table detection: header row | ... | followed by separator | ---|
        if (
            line.startswith('|')
            and i + 1 < len(lines)
            and lines[i + 1].lstrip().startswith('|')
            and re.search(r'-{3,}', lines[i + 1])
        ):
            table_lines = [line]
            j = i + 1
            while j < len(lines) and lines[j].lstrip().startswith('|'):
                table_lines.append(lines[j])
                j += 1
            i = j

            rows = []
            for idx, tl in enumerate(table_lines):
                if idx == 1:
                    continue
                cells = [c.strip() for c in tl.strip().strip('|').split('|')]
                rows.append([
                    Paragraph(parse_inline(c) if c else '&nbsp;', cell_style)
                    for c in cells
                ])

            if rows:
                n_cols = len(rows[0])
                # Compute column widths: distribute available width
                available = 17 * cm
                col_widths = [available / n_cols] * n_cols
                t = Table(rows, colWidths=col_widths, repeatRows=1)
                t.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0),
                        colors.HexColor('#e8e8e8')),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, -1), 8.5),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
                    ('TOPPADDING', (0, 0), (-1, -1), 3),
                    ('LEFTPADDING', (0, 0), (-1, -1), 4),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
                    ('GRID', (0, 0), (-1, -1), 0.4,
                        colors.HexColor('#bbbbbb')),
                    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ]))
                flowables.append(t)
                flowables.append(Spacer(1, 6))
            continue

        # Numbered list with continuations
        m = re.match(r'^(\d+)\.\s+(.*)', line)
        if m:
            number = m.group(1)
            text = m.group(2)
            while i + 1 < len(lines):
                nxt = lines[i + 1]
                if nxt.startswith('   ') and not nxt.lstrip().startswith('-'):
                    text += ' ' + nxt.strip()
                    i += 1
                else:
                    break
            flowables.append(Paragraph(
                f'<b>{number}.</b> {parse_inline(text)}', bullet_style,
            ))
            i += 1
            continue

        # Bullet
        if line.startswith('- '):
            text = line[2:]
            # Capture continuation lines indented by 2+ spaces
            while i + 1 < len(lines):
                nxt = lines[i + 1]
                if (nxt.startswith('  ') and nxt.strip()
                        and not nxt.lstrip().startswith('-')
                        and not re.match(r'^\s*\d+\.', nxt)):
                    text += ' ' + nxt.strip()
                    i += 1
                else:
                    break
            flowables.append(Paragraph(
                f'• {parse_inline(text)}', bullet_style,
            ))
            i += 1
            continue

        # Blockquote
        if line.startswith('> '):
            text = line[2:]
            while i + 1 < len(lines):
                nxt = lines[i + 1]
                if nxt.startswith('> '):
                    text += ' ' + nxt[2:]
                    i += 1
                elif nxt.startswith('>') and nxt.strip() == '>':
                    text += '<br/><br/>'
                    i += 1
                else:
                    break
            flowables.append(Paragraph(parse_inline(text), quote_style))
            i += 1
            continue

        # Regular paragraph: collect consecutive non-special lines
        para = line
        while i + 1 < len(lines):
            nxt = lines[i + 1]
            if (not nxt.strip()
                    or nxt.startswith('#')
                    or nxt.startswith('- ')
                    or nxt.startswith('> ')
                    or nxt.startswith('|')
                    or nxt.strip() == '---'
                    or re.match(r'^\d+\.\s', nxt)):
                break
            para += ' ' + nxt.strip()
            i += 1
        flowables.append(Paragraph(parse_inline(para), body_style))
        i += 1

    doc = SimpleDocTemplate(
        pdf_path, pagesize=A4,
        topMargin=2 * cm, bottomMargin=2 * cm,
        leftMargin=2 * cm, rightMargin=2 * cm,
        title='Tareas del operador — Amazon Resale Project',
        author='Claude (Amazon Resale Project)',
    )
    doc.build(flowables)


if __name__ == '__main__':
    convert(sys.argv[1], sys.argv[2])
