import Avatar from '@/components/Avatar';
import { formatRelative, getAuthor, getUpdatesOrdenados } from '@/data/updates';

export const metadata = { title: 'Buzón' };

export default function BuzonPage() {
  const updates = getUpdatesOrdenados();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">El Buzón</h1>
        <p className="text-base text-ink-800/80">
          Novedades que la familia te va dejando: fotos, audios, notas, dibujos.
        </p>
      </header>

      {updates.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-cream-200 bg-cream-50 p-6 text-center text-ink-800/70">
          Aún está vacío. La familia lo irá llenando.
        </div>
      ) : (
        <ul className="space-y-3">
          {updates.map((u) => {
            const author = getAuthor(u);
            return (
              <li
                key={u.id}
                className="rounded-2xl bg-cream-100 p-4 shadow-warm"
              >
                <header className="flex items-center gap-3">
                  {author && <Avatar person={author} size="sm" />}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base font-bold text-ink-900">
                      {author?.shortName || author?.name || 'Familia'}
                    </p>
                    <p className="text-xs text-ink-800/60">{formatRelative(u.createdAt)}</p>
                  </div>
                </header>

                {u.title && (
                  <h2 className="mt-3 font-display text-lg text-ink-900">{u.title}</h2>
                )}

                {u.kind === 'foto' && u.mediaUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={u.mediaUrl}
                    alt={u.title || ''}
                    className="mt-3 w-full rounded-xl"
                  />
                )}

                {u.kind === 'audio' && u.mediaUrl && (
                  <audio controls preload="none" className="mt-3 w-full">
                    <source src={u.mediaUrl} />
                  </audio>
                )}

                {u.kind === 'video' && u.mediaUrl && (
                  <video controls preload="none" className="mt-3 w-full rounded-xl">
                    <source src={u.mediaUrl} />
                  </video>
                )}

                {u.text && (
                  <p className="mt-3 text-base leading-relaxed text-ink-900">{u.text}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
