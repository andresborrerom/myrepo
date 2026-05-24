#!/usr/bin/env python3
"""Genera el lead magnet "How to Choose Your First Home Espresso Setup".

Output: site/public/lead-magnets/espresso-setup-guide.pdf

Diseño:
  - Cover page (pag 1).
  - Budget tiers (pag 2-3).
  - Espresso machine criteria (pag 4-5).
  - Grinder criteria (pag 6-7).
  - Accessories starter pack (pag 8).
  - Common mistakes + watch-outs (pag 9-10).
  - Glossary mini (pag 11).
  - Next steps + links (pag 12).

Anti-gray-hat (CLAUDE.md):
  - Recommendations son las MISMAS que están en el sitio (no inflamos).
  - Todos los precios y specs vienen del catalog real.
  - Cero promesas de "save thousands" o "you'll be a barista".
  - Honest tone: tradeoffs explicitos, "skip if" cuando aplica.

Usa reportlab (ya instalado para md-to-pdf.py del repo).
"""
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

# ---------- Output path ----------
OUT_PATH = Path(__file__).resolve().parent.parent / "public" / "lead-magnets" / "espresso-setup-guide.pdf"
OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

SITE_URL = "https://baristapath.com"

# ---------- Styles ----------
styles = getSampleStyleSheet()

cover_title = ParagraphStyle(
    "CoverTitle",
    parent=styles["Title"],
    fontSize=28,
    leading=34,
    spaceAfter=18,
    textColor=colors.HexColor("#1a1816"),
    alignment=1,  # CENTER
)
cover_subtitle = ParagraphStyle(
    "CoverSubtitle",
    parent=styles["Title"],
    fontSize=14,
    leading=18,
    spaceAfter=24,
    textColor=colors.HexColor("#5c554c"),
    alignment=1,
    fontName="Helvetica",
)
cover_byline = ParagraphStyle(
    "CoverByline",
    parent=styles["Normal"],
    fontSize=10,
    textColor=colors.HexColor("#8a4b1a"),
    alignment=1,
    spaceAfter=8,
)
h1 = ParagraphStyle(
    "H1X",
    parent=styles["Heading1"],
    fontSize=20,
    leading=24,
    spaceBefore=4,
    spaceAfter=10,
    textColor=colors.HexColor("#1a1816"),
)
h2 = ParagraphStyle(
    "H2X",
    parent=styles["Heading2"],
    fontSize=14,
    leading=18,
    spaceBefore=12,
    spaceAfter=6,
    textColor=colors.HexColor("#333333"),
)
h3 = ParagraphStyle(
    "H3X",
    parent=styles["Heading3"],
    fontSize=11.5,
    leading=15,
    spaceBefore=8,
    spaceAfter=3,
    textColor=colors.HexColor("#8a4b1a"),
)
body = ParagraphStyle(
    "BodyX",
    parent=styles["BodyText"],
    fontSize=10.5,
    leading=14.5,
    spaceAfter=6,
    textColor=colors.HexColor("#1a1816"),
)
bullet = ParagraphStyle(
    "BulletX",
    parent=body,
    leftIndent=16,
    bulletIndent=4,
    spaceAfter=3,
)
caption = ParagraphStyle(
    "CaptionX",
    parent=body,
    fontSize=9,
    textColor=colors.HexColor("#5c554c"),
    fontName="Helvetica-Oblique",
    spaceAfter=8,
)
callout_label = ParagraphStyle(
    "CalloutLabel",
    parent=body,
    fontSize=9,
    textColor=colors.HexColor("#8a4b1a"),
    fontName="Helvetica-Bold",
    spaceAfter=2,
)
footer = ParagraphStyle(
    "FooterX",
    parent=body,
    fontSize=8.5,
    textColor=colors.HexColor("#5c554c"),
    alignment=1,
)
cell = ParagraphStyle(
    "CellX",
    parent=body,
    fontSize=9,
    leading=12,
    spaceAfter=0,
)
cell_bold = ParagraphStyle(
    "CellBoldX",
    parent=cell,
    fontName="Helvetica-Bold",
)


def p(text: str, style=body):
    return Paragraph(text, style)


def b(text: str) -> Paragraph:
    return Paragraph(f"• {text}", bullet)


def callout(label: str, body_text: str):
    """Caja con label superior + body. Usada para 'skip if' y 'watch-out'."""
    inner = [
        Paragraph(label.upper(), callout_label),
        Paragraph(body_text, body),
    ]
    t = Table([[inner]], colWidths=[17 * cm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f6f4f1")),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#c4742c")),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return t


def tier_table(rows):
    """Render budget-tier table. rows = list of (tier, budget_total, machine_pick, grinder_pick, fit_for)."""
    data = [
        [
            Paragraph("Tier", cell_bold),
            Paragraph("Total budget", cell_bold),
            Paragraph("Machine pick", cell_bold),
            Paragraph("Grinder pick", cell_bold),
            Paragraph("Fit for", cell_bold),
        ]
    ]
    for r in rows:
        data.append([Paragraph(x, cell) for x in r])
    col_widths = [2.4 * cm, 3.0 * cm, 4.0 * cm, 4.0 * cm, 3.6 * cm]
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e8e4dd")),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#bbbbbb")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return t


def glossary_table(entries):
    data = [[Paragraph("Term", cell_bold), Paragraph("What it means", cell_bold)]]
    for term, definition in entries:
        data.append([Paragraph(f"<b>{term}</b>", cell), Paragraph(definition, cell)])
    t = Table(data, colWidths=[4.5 * cm, 12.5 * cm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e8e4dd")),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#bbbbbb")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return t


def on_page(canvas, doc):
    """Footer en cada página: site URL + page number."""
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#5c554c"))
    page_num = canvas.getPageNumber()
    canvas.drawCentredString(
        A4[0] / 2,
        1.0 * cm,
        f"baristapath.com  ·  How to Choose Your First Home Espresso Setup  ·  Page {page_num}",
    )
    canvas.restoreState()


def build():
    flow = []

    # ---------- Page 1 — Cover ----------
    flow.append(Spacer(1, 4 * cm))
    flow.append(Paragraph("How to Choose Your First", cover_title))
    flow.append(Paragraph("Home Espresso Setup", cover_title))
    flow.append(Spacer(1, 0.5 * cm))
    flow.append(
        Paragraph(
            "A practical, no-fluff guide to budget tiers, machine and grinder selection, accessories, and the mistakes that cost beginners the most money.",
            cover_subtitle,
        )
    )
    flow.append(Spacer(1, 2 * cm))
    flow.append(Paragraph("Published by Barista Path", cover_byline))
    flow.append(Paragraph("baristapath.com", cover_byline))
    flow.append(Spacer(1, 1.5 * cm))
    flow.append(
        Paragraph(
            "This guide is free. It is funded by Amazon affiliate links on our site — we earn a commission if you buy through them, at no extra cost to you. We do not accept payment for product placement or rankings. The recommendations here are the same we publish openly on baristapath.com.",
            caption,
        )
    )
    flow.append(PageBreak())

    # ---------- Page 2 — Intro + budget tiers (1/2) ----------
    flow.append(p("Welcome", h1))
    flow.append(
        p(
            "If you have spent more than 20 minutes researching home espresso, you have probably noticed: every blog post pushes a different machine, the price gap between the cheapest and most expensive option is roughly 50x, and almost no source tells you what to skip."
        )
    )
    flow.append(
        p(
            "This guide gives you a decision framework. After reading the 12 pages, you should be able to:"
        )
    )
    flow.append(b("Pick a realistic budget tier instead of guessing."))
    flow.append(b("Read espresso machine specs without translating jargon."))
    flow.append(b("Avoid the three most common $300–$500 mistakes."))
    flow.append(b("Know which accessories are essential vs. nice-to-have."))
    flow.append(Spacer(1, 0.4 * cm))
    flow.append(p("How to use this guide", h2))
    flow.append(
        p(
            "Read it front-to-back the first time. Then skip back to the budget tier that matches your situation and use it as a checklist. Each section ends with a 'Skip if' callout that tells you when a recommendation does NOT apply to you — worth re-reading before you click 'buy'."
        )
    )
    flow.append(p("Budget tiers — what each level actually gets you", h1))
    flow.append(
        p(
            "Espresso equipment splits into four meaningful price tiers. The jumps are not linear: going from Budget to Mid roughly doubles cup quality; going from Premium to Pro mostly buys you durability and dial-in resolution, not noticeably better espresso for a beginner palate."
        )
    )
    flow.append(Spacer(1, 0.2 * cm))
    flow.append(
        tier_table(
            [
                (
                    "Budget",
                    "$150–$500",
                    "Breville Bambino Plus ($499) or DeLonghi Dedica ($249)",
                    "Baratza Encore ESP ($199) or 1Zpresso Q2 hand ($129)",
                    "First-timers; small kitchens; mostly milk drinks.",
                ),
                (
                    "Mid",
                    "$500–$1,000",
                    "Breville Barista Pro ($799) or Gaggia Classic Pro ($499)",
                    "Baratza Sette 270 ($399) or DF54 ($249)",
                    "Comfortable home users; daily 1–3 drinks.",
                ),
                (
                    "Premium",
                    "$1,000–$2,000",
                    "Profitec Go ($1,049) or Lelit Anna PL41TEM ($799 + grinder)",
                    "Eureka Mignon Specialita ($579) or 1Zpresso K-Ultra ($249)",
                    "Hobbyists who want espresso to keep up with their curiosity.",
                ),
                (
                    "Pro",
                    "$2,000+",
                    "Breville Dual Boiler ($1,599) or ECM Synchronika ($3,395)",
                    "Niche Zero ($699) or Eureka Atom 75 ($929)",
                    "Daily multi-drink households; serious latte art; brew comparisons.",
                ),
            ]
        )
    )
    flow.append(PageBreak())

    # ---------- Page 3 — Budget tiers (2/2) + first decision ----------
    flow.append(p("How to pick your tier", h2))
    flow.append(
        p(
            "Three questions decide your tier honestly. Answer them before reading any product reviews."
        )
    )
    flow.append(p("1. How many espresso drinks will you make per day?", h3))
    flow.append(
        p(
            "If the answer is one or zero on most days, Budget is the right tier — anything more expensive will sit cold on the counter while you reach for the kettle. If two or more, Mid is the sweet spot. Premium starts to make sense at three-plus daily drinks across multiple drinkers."
        )
    )
    flow.append(p("2. What is your real grinder budget?", h3))
    flow.append(
        p(
            "<b>The single most common beginner mistake</b> is spending 90% of the budget on the machine and 10% on the grinder. A $1,500 machine with a $50 blade grinder will produce worse espresso than a $500 machine with a $300 burr grinder. Allocate at least 30–40% of total budget to the grinder. We expand this in the grinder section."
        )
    )
    flow.append(p("3. Do you actually want to learn, or do you want a button?", h3))
    flow.append(
        p(
            "Manual machines (Gaggia Classic Pro, Lelit Anna) reward patience and pay back over years. Auto-frother machines (Bambino Plus) save 18 months of learning curve at the cost of some ceiling. Super-automatics (Jura, DeLonghi Eletta) get you a passable latte in 30 seconds and never let you make a great espresso. None of these is wrong — but pick honestly."
        )
    )
    flow.append(
        callout(
            "Skip if",
            "You currently make zero espresso at home and are unsure whether you will enjoy the workflow. Start with a $40 Bialetti Moka pot or $40 AeroPress for a month. If the ritual sticks, then commit to a real setup — you will know your preferences better and waste less money.",
        )
    )
    flow.append(PageBreak())

    # ---------- Page 4 — Machine criteria (1/2) ----------
    flow.append(p("Choosing the espresso machine", h1))
    flow.append(
        p(
            "Five specs decide whether a machine can produce real espresso. Everything else — chrome trim, app integration, built-in milk wand presets — is downstream. If a machine fails any of the five, the price does not matter."
        )
    )
    flow.append(p("1. Boiler type", h2))
    flow.append(
        p(
            "<b>Thermoblock / Thermojet</b>: small, fast (3–7 second heat-up), used in single-boiler machines like the Bambino Plus and Barista Pro. Excellent for one or two back-to-back drinks. Less stable temperature on long sessions."
        )
    )
    flow.append(
        p(
            "<b>Single boiler with HX (heat exchanger)</b>: brews and steams from one boiler with a clever bypass. Lelit Anna, Rancilio Silvia. Cheaper than dual-boiler, more capable than thermoblock for multi-drink sessions, requires a brief cooling flush between shot and steam."
        )
    )
    flow.append(
        p(
            "<b>Dual boiler</b>: separate brew and steam boilers, ready simultaneously. Breville Dual Boiler, Profitec Pro 600. Best workflow, biggest footprint, biggest price."
        )
    )
    flow.append(p("2. PID temperature control", h2))
    flow.append(
        p(
            "PID is a controller that keeps brew temperature within ±1°F of the target. Without it, temperature drifts shot-to-shot, which means flavor drifts. Below $400 it is rare. From $400 up, it should be standard — if a machine in that range lacks PID, that is a red flag, not a feature trade-off."
        )
    )
    flow.append(p("3. Group head and portafilter size", h2))
    flow.append(
        p(
            "<b>54mm</b> (Breville Bambino, Barista series): proprietary; limits aftermarket basket and accessory options. Works fine, just locks you into Breville-compatible parts."
        )
    )
    flow.append(
        p(
            "<b>58mm</b> (Gaggia Classic Pro, Lelit, Profitec, Rocket): commercial standard. Huge aftermarket: bottomless portafilters, precision baskets, puck screens, distribution tools. If you think you will eventually tinker, 58mm pays off."
        )
    )
    flow.append(PageBreak())

    # ---------- Page 5 — Machine criteria (2/2) ----------
    flow.append(p("4. Pressure profiling and pre-infusion", h2))
    flow.append(
        p(
            "Marketing loves 19-bar and 20-bar numbers. Espresso is brewed at 9 bar; everything above that is either marketing inflation or pressure that gets relieved internally. What matters is whether the machine has a pre-infusion stage (low pressure for 5–10 seconds before full 9-bar extraction) that wets the puck and reduces channeling. Pre-infusion is present on most $500+ machines and absent on most sub-$300 ones."
        )
    )
    flow.append(p("5. Steam wand quality", h2))
    flow.append(
        p(
            "Three options, ranked by latte-art capability:"
        )
    )
    flow.append(
        b(
            "<b>Auto-frother (Bambino Plus, Barista Touch)</b>: presses a button, gets foam. Convenient. Not useful for latte art; the texture is too aerated."
        )
    )
    flow.append(
        b(
            "<b>Panarello wand (DeLonghi Dedica, EC155)</b>: a plastic sleeve that adds air. Easier for beginners, harder ceiling — you remove the panarello eventually."
        )
    )
    flow.append(
        b(
            "<b>Commercial-style wand (Gaggia Classic Pro, Rancilio Silvia, every $500+ machine)</b>: bare steam tip. Requires learning, rewards practice. Required for real latte art."
        )
    )
    flow.append(p("What you can safely ignore", h2))
    flow.append(b("App integration. You will use it twice."))
    flow.append(
        b(
            "15-bar / 19-bar / 20-bar marketing. Espresso is brewed at 9 bar. Higher number is not better espresso."
        )
    )
    flow.append(
        b(
            "Built-in tampers on cheap machines. They tamp inconsistently. You will buy a real tamper anyway."
        )
    )
    flow.append(
        b(
            "Built-in grinders on cheap all-in-ones (sub-$800). The grinder portion is usually the weak link; you would do better buying machine + grinder separately at the same total."
        )
    )
    flow.append(
        callout(
            "Skip if",
            "You only want milk drinks (lattes, cappuccinos) and have no interest in learning manual steaming. A Breville Bambino Plus auto-frother saves you 6–12 months of practice and produces drinks indistinguishable from a casual cafe latte. Saves money, saves frustration.",
        )
    )
    flow.append(PageBreak())

    # ---------- Page 6 — Grinder criteria (1/2) ----------
    flow.append(p("Choosing the grinder", h1))
    flow.append(
        p(
            "Grind quality matters as much as the machine — sometimes more. A great machine cannot rescue an inconsistent grind. A great grinder can make a $400 machine punch above its price."
        )
    )
    flow.append(p("Burr type: flat vs. conical", h2))
    flow.append(
        p(
            "<b>Conical burrs</b> (Baratza Encore ESP, Niche Zero, most hand grinders): two cone-shaped burrs, one inside the other. Easier to manufacture, generally lower retention, slightly more bimodal grind distribution. Tends toward more body, more chocolate notes in the cup."
        )
    )
    flow.append(
        p(
            "<b>Flat burrs</b> (DF54, Eureka Mignon Specialita, Niche Duo, commercial grinders): two flat rings spinning against each other. Cleaner grind distribution, often clearer separation of taste notes. Slightly higher retention on most designs."
        )
    )
    flow.append(
        p(
            "Honest take: in blind tastings, most home drinkers cannot reliably tell flat from conical at the same price tier. Pick on workflow (single-dose vs. hopper) and retention before agonizing over geometry."
        )
    )
    flow.append(p("Single-dose vs. hopper-fed", h2))
    flow.append(
        p(
            "<b>Single-dose</b>: you weigh your beans, dump them in the top, grind, brew. Designed for bean rotation (rotating multiple bags). Lower retention. Slower workflow. Niche Zero, DF54, most hand grinders."
        )
    )
    flow.append(
        p(
            "<b>Hopper-fed</b>: keep 250g of beans in a hopper, grind on demand. Faster workflow for daily drivers; loses freshness if beans sit more than a week. Baratza Encore, Eureka Specialita with stock hopper."
        )
    )
    flow.append(p("Stepped vs. stepless adjustment", h2))
    flow.append(
        p(
            "Espresso requires precision. A stepless grinder (infinite intermediate settings) makes dialing easier than a 40-step grinder. Above $300 most grinders are stepless or have very fine stepping; below that, watch the spec sheet."
        )
    )
    flow.append(PageBreak())

    # ---------- Page 7 — Grinder criteria (2/2) ----------
    flow.append(p("Hand grinder or electric?", h2))
    flow.append(
        p(
            "A serious hand grinder ($129 1Zpresso Q2 to $249 K-Ultra) often outperforms electric grinders three times the price. Trade-off: 60–90 seconds of cranking per dose, and your wrist will know. If you make one drink a day, a hand grinder is the best value in coffee. If you make 3+, electric is worth the convenience tax."
        )
    )
    flow.append(p("Recommended pairings by total budget", h2))
    flow.append(
        p(
            "<b>$400 total</b>: DeLonghi Dedica ($249) + 1Zpresso Q2 hand grinder ($129). Single best espresso-at-home setup under $500 if you don't mind hand grinding."
        )
    )
    flow.append(
        p(
            "<b>$700 total</b>: Gaggia Classic Pro ($499) + Baratza Encore ESP ($199). Classic Pro is a learning curve, but the ceiling is 10 years of upgrades."
        )
    )
    flow.append(
        p(
            "<b>$1,000 total</b>: Breville Bambino Plus ($499) + DF54 ($249) + tamper + scale ($50). Modern workflow, auto-frother for milk drinks, real grinder."
        )
    )
    flow.append(
        p(
            "<b>$1,500 total</b>: Lelit Anna PL41TEM ($799) + Eureka Mignon Specialita ($579) + accessories ($100). Both punch into prosumer territory for total ~$1,500."
        )
    )
    flow.append(
        callout(
            "Watch-out",
            "Avoid pressurized baskets long-term. Most beginner machines ship with double-walled 'pressurized' baskets that produce fake crema regardless of grind. They are a safety net for the first month. After that, switch to a standard non-pressurized basket — you cannot taste real espresso through a pressurized basket, and the experience is what gets you hooked.",
        )
    )
    flow.append(PageBreak())

    # ---------- Page 8 — Accessories ----------
    flow.append(p("Accessories: starter pack", h1))
    flow.append(
        p(
            "Essential accessories are cheap and worth buying day-one. Optional ones are easy to upsell yourself on; skip until you know you need them."
        )
    )
    flow.append(p("Essential (buy with the machine)", h2))
    flow.append(
        b(
            "<b>Tamper ($15–40)</b>: matches the basket diameter (54mm for Breville, 58mm for Gaggia/Lelit). Flat base, comfortable handle. We like the Normcore range."
        )
    )
    flow.append(
        b(
            "<b>Scale with 0.1g resolution and timer ($25–50)</b>: Timemore Black Mirror Basic ($69) or any kitchen scale that fits under the portafilter. Espresso is brewed by weight, not volume."
        )
    )
    flow.append(
        b(
            "<b>Knock box ($20–40)</b>: for spent pucks. Skip a fancy one; a cheap rubber-bar knock box does the job for years."
        )
    )
    flow.append(
        b(
            "<b>Microfiber towel x2 ($10)</b>: one for the steam wand, one for the portafilter. Replace weekly."
        )
    )
    flow.append(p("Worth it after one month", h2))
    flow.append(
        b(
            "<b>WDT tool ($15–30)</b>: a fork of thin needles that breaks up clumps in the basket before tamping. Largest single improvement to extraction consistency at small cost."
        )
    )
    flow.append(
        b(
            "<b>Bottomless / naked portafilter ($30–60, 58mm only)</b>: shows you exactly what your puck is doing. Diagnoses channeling instantly."
        )
    )
    flow.append(
        b(
            "<b>Puck screen ($15–25)</b>: a metal mesh on top of the puck. Cleaner group head, marginal extraction benefit."
        )
    )
    flow.append(p("Skip until you actually need it", h2))
    flow.append(b("Smart scales with Bluetooth ($150+). Use a regular scale with a separate timer."))
    flow.append(
        b(
            "Distribution tools that level the puck (the spinning levellers). A WDT tool does the same job for $15."
        )
    )
    flow.append(b("Branded cleaning powders that cost 5x what Cafiza costs."))
    flow.append(PageBreak())

    # ---------- Page 9 — Common mistakes ----------
    flow.append(p("Common mistakes (and how to avoid them)", h1))
    flow.append(p("1. Buying the machine first, the grinder second.", h2))
    flow.append(
        p(
            "Symptom: \"My $700 machine makes thin, sour espresso.\" Cause: paired with a $40 blade or stepped grinder. Fix: rebudget. Cap the machine at 60% of total spend so the grinder gets a fair share."
        )
    )
    flow.append(p("2. Believing the bar-pressure marketing.", h2))
    flow.append(
        p(
            "Symptom: choosing a $139 Casabrews or Mr. Coffee because it advertises 20 bars. Cause: bar pressure marketing has no relation to extraction quality. Fix: confirm 9-bar extraction with an OPV (over-pressure valve) or PID controller. Sub-$200 machines rarely deliver real 9-bar brewing."
        )
    )
    flow.append(p("3. Trying for latte art on week one.", h2))
    flow.append(
        p(
            "Symptom: frustration at lumpy foam after week three. Cause: latte art needs ~3 months of practice on a real steam wand. Fix: lower expectations; aim for \"cafe-quality flat white\" by month two, art by month four. If that timeline does not appeal, get an auto-frother machine."
        )
    )
    flow.append(p("4. Skipping descaling.", h2))
    flow.append(
        p(
            "Symptom: machine quits in month 18 with mineral scale on the boiler. Cause: hard water + no descaling routine. Fix: descale every 3 months with citric acid solution or manufacturer descaler. Use filtered water if your tap water is hard."
        )
    )
    flow.append(p("5. Using pre-ground espresso “just for now.”", h2))
    flow.append(
        p(
            "Symptom: \"I have a good machine but the coffee tastes flat.\" Cause: pre-ground beans lose 60% of their aromatics in the first 15 minutes. Fix: grind fresh, or stop buying coffee equipment until you can."
        )
    )
    flow.append(PageBreak())

    # ---------- Page 10 — Budget watch-outs ----------
    flow.append(p("Budget watch-outs", h1))
    flow.append(p("Real total cost is higher than the machine sticker", h2))
    flow.append(
        p(
            "A $499 espresso machine is usually a $700–$900 setup once you add a grinder, tamper, scale, and a bag of fresh beans. Plan for it."
        )
    )
    flow.append(p("Sample total-cost breakdowns", h2))
    flow.append(
        p(
            "<b>Budget-tier setup (~$700)</b>: Bambino Plus $499 + Baratza Encore ESP $199 + tamper $20 + scale $30 + first month of beans $25 = $773."
        )
    )
    flow.append(
        p(
            "<b>Mid-tier setup (~$1,200)</b>: Gaggia Classic Pro $499 + DF54 $249 + bottomless portafilter $40 + tamper $30 + scale $70 + first month of beans $40 = $928. Add $100 for a steam pitcher and milk thermometer if you steam often."
        )
    )
    flow.append(
        p(
            "<b>Premium setup (~$2,000)</b>: Lelit Anna $799 + Eureka Specialita $579 + accessories $150 + beans/freight first quarter $150 = $1,678. Realistic with shipping and tax: $2,000."
        )
    )
    flow.append(p("Recurring costs", h2))
    flow.append(b("Beans: $15–40/lb for specialty, drinking 1–3 lb/month for a single-drink household."))
    flow.append(
        b(
            "Descaler/cleaner: ~$25/year (Cafiza for backflushing, citric acid for descaling)."
        )
    )
    flow.append(b("Water filter or bottled water: $5–20/month if you have hard tap water."))
    flow.append(
        b(
            "Replacement gaskets and shower screens: ~$30 every 12–18 months for most prosumer machines."
        )
    )
    flow.append(
        callout(
            "Realistic payback math",
            "If you spend $5 on a cafe latte daily, that is ~$1,825/year. A $700 home setup that lasts 5 years and replaces 80% of those cafe trips pays back in about 5 months — if you actually use it daily. If you make 2–3 drinks a week, the payback math doesn't hold; you are buying the hobby, not the savings. (Our cost-per-cup calculator at baristapath.com/tools/cost-per-cup-calculator runs your real numbers.)",
        )
    )
    flow.append(PageBreak())

    # ---------- Page 11 — Glossary mini ----------
    flow.append(p("Glossary: 10 terms you will see everywhere", h1))
    flow.append(
        p(
            "Espresso jargon is dense. These ten terms cover ~80% of what you will encounter in reviews and forums. The full glossary lives at baristapath.com/glossary (~55 terms)."
        )
    )
    flow.append(
        glossary_table(
            [
                (
                    "9 bar",
                    "The brewing pressure standard for espresso. Numbers above 9 in marketing are inflated or internally relieved.",
                ),
                (
                    "PID",
                    "Proportional–Integral–Derivative controller. Keeps brew temperature steady shot-to-shot.",
                ),
                (
                    "Pre-infusion",
                    "A low-pressure wetting stage (5–10 seconds) before full extraction. Reduces channeling.",
                ),
                (
                    "Channeling",
                    "Water finding the path of least resistance through the puck, producing thin, sour shots. Cause: uneven distribution or tamping.",
                ),
                (
                    "Crema",
                    "The reddish-brown foam on top of espresso. Pretty, but not a quality indicator on its own.",
                ),
                (
                    "WDT",
                    "Weiss Distribution Technique. Stirring grounds in the basket with thin needles before tamping. Improves consistency.",
                ),
                (
                    "Single-dose",
                    "Weighing each dose of beans and grinding them one at a time. Workflow for bean rotation; lower retention.",
                ),
                (
                    "Retention",
                    "Coffee grounds that stick inside the grinder between doses. High retention = stale residue contaminating next shot.",
                ),
                (
                    "Pressurized basket",
                    "A double-walled filter basket that creates artificial crema. Beginner-friendly but masks extraction quality. Replace early.",
                ),
                (
                    "Bottomless portafilter",
                    "A portafilter with no spouts — you see the puck directly. Diagnostic tool for channeling and extraction.",
                ),
            ]
        )
    )
    flow.append(PageBreak())

    # ---------- Page 12 — Next steps ----------
    flow.append(p("Next steps", h1))
    flow.append(p("Now that you have the framework, here is the order we suggest:", h2))
    flow.append(
        p(
            "<b>1. Pin your budget and your daily drink count.</b> The two numbers determine your tier. Be honest — future you will not magically make four lattes a day if current you makes one coffee."
        )
    )
    flow.append(
        p(
            "<b>2. Run the cost-per-cup calculator.</b> If the payback period is longer than 18 months, reconsider your tier or accept that this is a hobby spend, not a savings move."
        )
    )
    flow.append(
        p(
            f"      → <font color='#8a4b1a'>{SITE_URL}/tools/cost-per-cup-calculator/</font>"
        )
    )
    flow.append(
        p(
            "<b>3. Take the 'which espresso machine should I buy' quiz.</b> Seven questions, no email gate, transparent scoring. It will narrow your machine pick to 1–3 options."
        )
    )
    flow.append(p(f"      → <font color='#8a4b1a'>{SITE_URL}/quiz/which-espresso-machine/</font>"))
    flow.append(
        p(
            "<b>4. Read the best-of list for your tier.</b>"
        )
    )
    flow.append(b(f"Best espresso machines under $500: {SITE_URL}/best/best-espresso-machine-under-500/"))
    flow.append(b(f"Best grinders under $200: {SITE_URL}/best/best-grinder-under-200/"))
    flow.append(b(f"Best prosumer under $2,000: {SITE_URL}/best/best-prosumer-espresso-machine-under-2000/"))
    flow.append(
        p(
            "<b>5. Buy. Make 50 shots. Adjust grind, dose, ratio.</b> The first 50 shots will be inconsistent. That is normal — it takes ~50 shots to dial in a new machine + bean combination."
        )
    )
    flow.append(p("Questions?", h2))
    flow.append(
        p(
            "Reply to any email we send you. We are a one-person editorial site; the person answering is the same person who wrote this guide."
        )
    )
    flow.append(Spacer(1, 0.4 * cm))
    flow.append(
        p(
            "Thanks for reading. Good luck with your setup — and remember: the best espresso machine is the one you actually use.",
            caption,
        )
    )

    doc = SimpleDocTemplate(
        str(OUT_PATH),
        pagesize=A4,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        title="How to Choose Your First Home Espresso Setup",
        author="Barista Path (baristapath.com)",
        subject="Free lead magnet — espresso setup guide",
    )
    doc.build(flow, onFirstPage=on_page, onLaterPages=on_page)
    print(f"PDF generado: {OUT_PATH}")
    print(f"Tamaño: {OUT_PATH.stat().st_size} bytes")


if __name__ == "__main__":
    build()
