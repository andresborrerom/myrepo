import { brand } from '../../brand.config';
import WaitlistForm from '@/components/WaitlistForm';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-arena-warm border-b border-regla">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <p className="text-sm uppercase tracking-widest text-arcilla-600 mb-6">
            {brand.heroEyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-tinta-900 mb-6 max-w-3xl">
            {brand.heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-tinta-800 max-w-prose mb-10">
            {brand.heroSubheadline}
          </p>
          <div className="max-w-xl">
            <WaitlistForm source="hero" ctaLabel={brand.heroCta} />
            <p className="text-sm text-tinta-800/70 mt-3">{brand.heroCtaSub}</p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-arena">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-serif text-3xl mb-12">{brand.sections.pillarsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {brand.pillars.map((p) => (
              <div key={p.title}>
                <h3 className="font-serif text-xl mb-3">{p.title}</h3>
                <p className="text-tinta-800">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="bg-arena-warm border-y border-regla">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-serif text-3xl mb-12">{brand.sections.forWhomTitle}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-serif text-xl mb-4 text-botella">{brand.sections.forWhomYes}</h3>
              <ul className="space-y-3">
                {brand.forWhom.isFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-botella font-bold mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-4 text-arcilla-600">{brand.sections.forWhomNo}</h3>
              <ul className="space-y-3">
                {brand.forWhom.isNotFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-arcilla-600 font-bold mt-1">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-arena">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="font-serif text-3xl mb-12">{brand.sections.faqTitle}</h2>
          <div className="space-y-8">
            {brand.faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-serif text-xl mb-2">{item.q}</h3>
                <p className="text-tinta-800">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA repeat */}
      <section className="bg-tinta-900 text-arena">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="font-serif text-3xl text-arena mb-4">
            {brand.sections.finalCtaTitle}
          </h2>
          <p className="text-arena/80 mb-8 max-w-prose mx-auto">
            {brand.sections.finalCtaBody}
          </p>
          <div className="max-w-md mx-auto">
            <WaitlistForm source="footer-cta" ctaLabel={brand.sections.finalCtaButton} variant="dark" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-arena-warm border-t border-regla">
        <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-tinta-800/70">
          <div>
            <span className="font-serif text-base text-tinta-900 mr-3">{brand.name}</span>
            <span>{brand.footer.copyright}</span>
          </div>
          <div className="flex gap-6">
            <a href={`mailto:${brand.footer.email}`} className="hover:text-arcilla-600">
              {brand.footer.email}
            </a>
            {brand.footer.legal.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-arcilla-600">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
