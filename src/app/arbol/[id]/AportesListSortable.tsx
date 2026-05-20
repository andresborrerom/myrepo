'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Aporte } from '@/data/aportes-types';
import { APORTE_KIND_ICON, APORTE_KIND_LABEL } from '@/data/aportes-types';
import { formatRelative } from '@/data/updates';

type Props = {
  initial: Aporte[];
  ramaColor: string;
};

export default function AportesListSortable({ initial, ramaColor }: Props) {
  const [items, setItems] = useState<Aporte[]>(initial);
  const [saving, setSaving] = useState(false);

  // PointerSensor para mouse/trackpad. TouchSensor con long-press
  // para que no choque con el scroll vertical normal en mobile.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 8 }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    setSaving(true);
    try {
      await fetch('/api/aporta/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ordered_ids: newItems.map((i) => i.id) })
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <p className="text-xs text-ink-800/60">
        {saving
          ? 'Guardando orden…'
          : 'Mantén tocado y arrastra para reordenar.'}
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {items.map((a) => (
              <AporteSortable key={a.id} aporte={a} ramaColor={ramaColor} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </>
  );
}

function AporteSortable({ aporte: a, ramaColor }: { aporte: Aporte; ramaColor: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: a.id
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.92 : 1
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`overflow-hidden rounded-2xl bg-cream-100 shadow-warm ${
        isDragging ? 'ring-2 ring-clay-500' : ''
      }`}
    >
      <div aria-hidden className={`h-1 w-full ${ramaColor}`} />
      <div className="flex items-stretch">
        {/* Drag handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Mover este aporte"
          className="flex w-10 cursor-grab touch-none items-center justify-center text-ink-800/40 hover:bg-cream-200 hover:text-ink-800/80 active:cursor-grabbing"
        >
          <span aria-hidden className="text-lg leading-none">⋮⋮</span>
        </button>

        <div className="flex-1 p-3">
          <p className="text-xs text-ink-800/60">
            <span aria-hidden>{APORTE_KIND_ICON[a.kind]}</span>{' '}
            {APORTE_KIND_LABEL[a.kind]}
            {a.year ? ` · año ${a.year}` : ''}
            {' · '}{formatRelative(a.created_at)}
          </p>
          {a.title && (
            <p className="mt-1 font-display text-base font-bold text-ink-900">
              {a.title}
            </p>
          )}
          {a.kind === 'foto' && a.media_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.media_url} alt={a.title || ''} className="mt-2 w-full rounded-xl" />
          )}
          {a.kind === 'foto-perfil' && a.media_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={a.media_url}
              alt={a.title || 'Foto de perfil'}
              className="mt-2 h-24 w-24 rounded-full object-cover"
            />
          )}
          {a.kind === 'audio' && a.media_url && (
            <audio controls preload="none" className="mt-2 w-full">
              <source src={a.media_url} />
            </audio>
          )}
          {a.kind === 'video' && a.media_url && (
            <video controls preload="none" className="mt-2 w-full rounded-xl">
              <source src={a.media_url} />
            </video>
          )}
          {a.kind === 'carta' && a.year && (
            <Link
              href={`/cartas/${a.year}`}
              className="mt-1 inline-block text-sm text-clay-600 underline"
            >
              Leer carta del año {a.year} →
            </Link>
          )}
          {a.body && (
            <p className="mt-2 whitespace-pre-wrap text-sm text-ink-800">{a.body}</p>
          )}
        </div>
      </div>
    </li>
  );
}
