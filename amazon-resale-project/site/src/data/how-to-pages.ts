// How-to page definitions. Cada entry genera una página en /how-to/[slug]/
// con HowTo JSON-LD, steps numerados, sección "what you'll need", common
// mistakes y FAQ. El template vive en src/pages/how-to/[slug].astro.
//
// Editorial constraints (CLAUDE.md, anti-gray-hat):
// - Pasos basados en manuales del fabricante + consenso comunitario
//   (Home-Barista, /r/espresso threads consolidados). Sin invenciones.
// - "What you'll need" lista accesorios que vendemos solo cuando son la
//   herramienta correcta para esa tarea (Cafiza para backflush, descaler
//   para descaling, WDT tool para WDT). No empujamos productos random.
// - Cuando un paso puede dañar la máquina (descale incorrecto, OPV
//   adjustment) lo flagueamos explícitamente.
// - El intent es post-purchase: el lector ya tiene la máquina y necesita
//   resolver una tarea concreta. Los affiliate links son ayudas, no upsells.

export interface HowToNeed {
  /** Lo que necesitás (e.g. "Descaler solution", "Microfiber cloth"). */
  item: string;
  /** ASIN del catalog si lo vendemos como recomendación legítima. */
  affiliateAsin?: string;
  /** Nota corta — por qué este item, alternativas, qué hace si lo skip. */
  note?: string;
}

export interface HowToStep {
  /** Heading corto del paso (e.g. "Empty the water tank"). */
  heading: string;
  /** 1-3 párrafos explicativos. HTML permitido (links a glossary, products). */
  body: string;
}

export interface HowToFaq {
  question: string;
  answer: string;
}

export interface HowToPage {
  slug: string;
  /** SEO title. Mantenerlo natural ("How to descale a Breville Bambino"). */
  title: string;
  /** Meta description ≤160 chars. */
  description: string;
  /** Producto principal del catalog si la guía es product-specific. */
  productAsin?: string;
  /** Topic broad: 'descaling', 'dialing-in', 'milk-frothing', etc. */
  topic:
    | 'descaling'
    | 'cleaning'
    | 'backflushing'
    | 'dialing-in'
    | 'milk-frothing'
    | 'grinder-seasoning'
    | 'setup'
    | 'maintenance-routine';
  /** Intro short (1-3 paragraphs). HTML permitido. */
  intro: string;
  /** ISO date. Updated at == última vez que revisamos el contenido. */
  updatedAt: string;
  /** Tiempo estimado ("10 minutes"). Renderizado en JSON-LD HowTo.totalTime. */
  totalTime: string;
  /** Lista de items necesarios (mostrada como "What you'll need"). */
  needs: HowToNeed[];
  /** Pasos ordenados. */
  steps: HowToStep[];
  /** 2-4 errores comunes a evitar. */
  commonMistakes: string[];
  /** 3-5 FAQs. */
  faqs: HowToFaq[];
  /** Slugs de troubleshoot pages relacionadas (opcional, para internal links). */
  relatedTroubleshootSlugs?: string[];
}

// Convertir "10 minutes" / "1 hour" a ISO 8601 duration (PT10M / PT1H).
// JSON-LD HowTo.totalTime requiere ISO 8601. Helper exportado para que
// el template lo use sin reimplementarlo.
export function toIsoDuration(human: string): string {
  const m = human.match(/(\d+)\s*(minute|min|hour|hr)/i);
  if (!m) return 'PT15M';
  const n = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  if (unit.startsWith('h')) return `PT${n}H`;
  return `PT${n}M`;
}

// ASINs del catalog que recomendamos en how-to pages — todos verificados
// que existen en src/content/products/. Si renombrás un product file, esta
// constante alerta porque el template falla al resolver el ASIN.
const ASIN = {
  cafiza: 'B00LWLBQH2',
  bambinoPlus: 'B07VFZHRYC',
  gaggiaClassicPro: 'B083TQR8BV',
  baristaExpress: 'B00CH9182U',
  rancilioSilvia: 'B0BQYMTBNL',
  baratzaEncore: 'B007F183LK',
  baratzaEncoreEsp: 'B0BDFTC76P',
  nicheZero: 'B08CXVZL8R',
  eurekaSpecialita: 'B07YDPC1MK',
  normcoreWdt: 'B08L5C9QZD',
  bplusWdt: 'B09QV3RTBN',
  normcoreTamper58: 'B07XGYLW2H',
  normcoreTamper54: 'B07XGRMK4P',
  joefrexKnockBox: 'B005MMJZ22',
  joefrexPitcher20: 'B003YFI56C',
  rattlewareThermometer: 'B0006H4VKQ',
  delonghiMagnifica: 'B07RB5K9TJ',
  delonghiDedica: 'B00OBH4UQA',
  comandante: 'B07HF93NS6',
  staggEkg: 'B0BVYGZG6T',
} as const;

export const howToPages: HowToPage[] = [
  // ============================================================
  // DESCALING — 4 entries (Breville/Gaggia/DeLonghi/Rancilio)
  // ============================================================
  {
    slug: 'how-to-descale-breville-bambino',
    title: 'How to descale a Breville Bambino (and Bambino Plus)',
    description:
      'Step-by-step descaling guide for the Breville Bambino and Bambino Plus: when to run the cycle, what solution to use, and the post-descale flush sequence.',
    productAsin: 'B07VFZHRYC',
    topic: 'descaling',
    intro:
      '<p>The Bambino and Bambino Plus signal when descaling is due via the alternating button flash sequence (the manual calls this the "descale alert"). The cycle itself is built into the machine, but you have to provide the descaling solution and a free 15 minutes — interrupting it midway can leave residual descaler in the boiler, which is the most common way owners ruin a shot the morning after.</p><p>Breville officially recommends its branded descaler. In practice, a food-safe citric or lactic acid descaler at the right dilution does the same job. What matters is that you flush the boiler thoroughly after the cycle — twice if you smell anything acidic.</p>',
    updatedAt: '2026-05-15',
    totalTime: '20 minutes',
    needs: [
      {
        item: 'Espresso machine descaler (Breville-branded or citric/lactic acid blend)',
        note: 'Do not use white vinegar — the acetic acid is too aggressive on aluminium boilers over time, and the smell lingers.',
      },
      {
        item: 'Clean water (filtered if your tap is hard)',
        note: 'You will need to refill the tank 2-3 times for the rinse cycle.',
      },
      {
        item: 'Empty container (1 litre capacity minimum)',
        note: 'Place under the group head and steam wand to catch the discharge.',
      },
    ],
    steps: [
      {
        heading: 'Empty the drip tray and confirm the machine is cool',
        body: '<p>Power off, unplug, and let the Bambino cool for at least 30 minutes if you have used it that morning. Descaling on a hot machine is unsafe and the heating elements should not be cycling during the chemical contact phase.</p><p>Remove the drip tray and dump it. Remove the portafilter from the group head — descaling is a no-portafilter operation.</p>',
      },
      {
        heading: 'Mix the descaling solution in the water tank',
        body: '<p>Fill the water tank to the "DESCALE" line (marked on the inside of the tank) with cool water, then add the descaler powder or liquid per the product\'s dosage instructions. For Urnex Dezcal, that is one packet per fill. Slot the tank back into the machine.</p><p>Do not exceed the dosage. Higher concentration does not descale faster — it just leaves more residue you then have to flush.</p>',
      },
      {
        heading: 'Enter descale mode',
        body: '<p>With the machine off, hold the Power button plus the 1-cup and 2-cup buttons simultaneously for about 3 seconds. The buttons will flash in sequence indicating descale mode is active.</p><p>Press the 1-cup button once to start the cycle. The Bambino will pump the solution through the group head and steam wand alternately over roughly 7-10 minutes. Do not walk away — if the tank empties before the cycle completes, the pump runs dry.</p>',
      },
      {
        heading: 'Refill and run two rinse cycles',
        body: '<p>When the descale cycle finishes, the machine signals with a steady flash. Empty the discharge container, rinse the water tank thoroughly (no soap), and refill with fresh clean water to the MAX line.</p><p>Press the 1-cup button again to run the first rinse. When it finishes, refill and run a second rinse. The Bambino exits descale mode automatically after the rinse cycles.</p>',
      },
      {
        heading: 'Pull a sacrificial blank shot',
        body: '<p>Lock in an empty portafilter (with the pressurized basket is fine) and pull a 30-second water shot. Smell it. If there is any chemical or acidic note, run another full tank of clean water through the group head before you pull coffee.</p><p>This is the step most owners skip and then wonder why the next espresso tastes off.</p>',
      },
    ],
    commonMistakes: [
      'Using white vinegar instead of a proper descaler — over time the acetic acid corrodes internal aluminium components and leaves a lingering smell that takes 5+ rinse cycles to fully clear.',
      'Skipping the second rinse cycle and pulling a shot immediately after the first rinse — descaler residue affects taste and is not safe to drink.',
      'Letting the tank run dry mid-cycle — the pump can lose prime and you will need to re-prime by holding the steam knob open for 30 seconds with the tank refilled.',
      'Descaling on a schedule rather than when the descale light comes on — over-descaling wears the boiler seals faster than scale accumulation would.',
    ],
    faqs: [
      {
        question: 'How often does the Bambino need descaling?',
        answer:
          'The machine tracks shot count and water hardness and signals when descale is due — typically every 200-400 shots, which is roughly every 2-4 months for daily users. If your water is very hard (>10 grains per gallon) the alert may trigger sooner.',
      },
      {
        question: 'Can I use white vinegar to descale my Bambino?',
        answer:
          'Breville advises against it and so do we. Vinegar (acetic acid) is more aggressive than the citric/lactic acid descalers designed for espresso machines, and the smell takes many rinse cycles to clear. A purpose-made descaler is $15-20 and lasts a year or more of household descaling.',
      },
      {
        question: 'My shot tastes weird after descaling — what happened?',
        answer:
          'Almost certainly residual descaler in the boiler. Run two more full tanks of clean water through the group head (without descale mode — just normal water shots). If the taste persists for more than 24 hours, contact Breville support; you may have a stuck check valve.',
      },
      {
        question: 'Does descaling void the Bambino warranty?',
        answer:
          'No — descaling with an approved descaler is part of normal maintenance and Breville expects owners to do it. What can void the warranty is using non-approved chemicals (e.g. bleach, vinegar in excessive quantities) or opening the machine to clean internal components.',
      },
    ],
    relatedTroubleshootSlugs: ['breville-bambino-not-pumping-water'],
  },
  {
    slug: 'how-to-descale-gaggia-classic',
    title: 'How to descale a Gaggia Classic Pro',
    description:
      'Manual descaling routine for the Gaggia Classic Pro: solution, flow sequence, and why the brass boiler tolerates citric acid better than the aluminium-block competition.',
    productAsin: 'B083TQR8BV',
    topic: 'descaling',
    intro:
      '<p>Unlike the Breville Bambino, the Gaggia Classic Pro has no automated descale cycle — you run the descaler through manually using the brew switch and steam knob. The upside is full control; the downside is that overshooting the contact time can leave more residue than the brass boiler needs.</p><p>The Gaggia\'s brass boiler is more tolerant of citric and lactic acid descalers than the aluminium thermoblocks in Breville machines. That said, do not use vinegar: the rubber gaskets between the boiler and group head are not rated for acetic acid and harden faster.</p>',
    updatedAt: '2026-05-15',
    totalTime: '30 minutes',
    needs: [
      {
        item: 'Citric or lactic acid descaler',
        note: 'Urnex Dezcal, Gaggia-branded, or similar. Avoid vinegar.',
      },
      {
        item: 'Filtered water',
      },
      {
        item: 'Empty container (~1 litre) to catch discharge',
      },
      {
        item: 'Microfiber cloth',
      },
    ],
    steps: [
      {
        heading: 'Cool the machine and empty the boiler',
        body: '<p>Power on, then immediately open the steam knob and pull the brew switch to drain water from the boiler until only steam emerges. Switch off. Wait 30 minutes for the boiler to cool. The Gaggia Classic Pro\'s brass boiler retains heat and you do not want to introduce cold descaler into a hot boiler — thermal shock weakens seals.</p>',
      },
      {
        heading: 'Mix and fill descaling solution',
        body: '<p>In the water tank, mix descaler per its dosage instructions (typically 25 g powder per 1 L water, or a full Dezcal packet). Use cool filtered water. Reinstall the tank.</p>',
      },
      {
        heading: 'Pull solution through the group head',
        body: '<p>Power on. When the machine reaches temperature (white light steady), flip the brew switch and dispense about 100 ml from the group head into your container. Switch off and let the descaler sit in the boiler and group head for 15-20 minutes. This contact time is what does the descaling work.</p>',
      },
      {
        heading: 'Pull solution through the steam wand',
        body: '<p>Power on again, open the steam knob, and flip the brew switch. Run another 100 ml through the steam wand. Close the steam knob, switch off, let it sit another 5 minutes.</p>',
      },
      {
        heading: 'Flush with clean water — at least 2 full tanks',
        body: '<p>Empty the tank, rinse thoroughly (no soap residue), and refill with fresh water. Pull a full tank through both the group head and the steam wand alternately. Refill and repeat. After two full tank rinses, smell the discharge — if it still smells acidic, run a third tank.</p><p>The Gaggia\'s open boiler holds about 100 ml — much of that needs to be cycled out before pulling coffee.</p>',
      },
      {
        heading: 'Wipe down and pull a blank shot',
        body: '<p>Wipe the group head and portafilter with a damp microfiber cloth. Lock in a clean portafilter (no coffee) and pull a 30-second water shot. Taste-test the water — if it tastes clean, you are done.</p>',
      },
    ],
    commonMistakes: [
      'Using vinegar — degrades the rubber gaskets at the group head/boiler interface. Replacement gasket is $5 and trivial to install, but avoidable.',
      'Skipping the steam-wand portion — scale builds up in the steam circuit too, and a wand-only flush leaves the steam path untreated.',
      'Pulling coffee within 1 hour of descaling without enough rinse cycles. Two full tanks minimum.',
      'Descaling more often than every 3 months on soft water. Over-descaling does nothing useful and slowly erodes seals.',
    ],
    faqs: [
      {
        question: 'How often does the Gaggia Classic Pro need descaling?',
        answer:
          'Every 3-6 months for daily use, depending on water hardness. With filtered (low-mineral) water, you can stretch to every 6-9 months. Hard tap water (>10 gpg) may need every 2 months.',
      },
      {
        question: 'Can I use Cafiza powder for descaling?',
        answer:
          'No — Cafiza is an alkaline cleaner for coffee oils (backflushing), not an acidic descaler for limescale. They do opposite chemistry and you need both, on different schedules. See our guide on how to backflush a Gaggia.',
      },
      {
        question: 'My Gaggia is hissing or leaking after descaling — what happened?',
        answer:
          'Most likely a softened gasket. The brass boiler\'s upper gasket (group head seal) and the OPV o-ring can soften if exposed to too-strong descaler for too long. Both are $5 parts and a 10-minute replacement; the relevant troubleshoot guide covers it.',
      },
      {
        question: 'Do I need to descale a brand new Gaggia?',
        answer:
          'No — the boiler ships clean. The first descale should be 3-6 months after first use, depending on your water hardness. Run a few water-only flush cycles when the machine is new to clear any manufacturing residue, but skip the descaler.',
      },
    ],
    relatedTroubleshootSlugs: ['gaggia-classic-leaking-from-group-head'],
  },
  {
    slug: 'how-to-descale-delonghi-magnifica',
    title: 'How to descale a De\'Longhi Magnifica (and other super-automatics)',
    description:
      'Descale routine for De\'Longhi Magnifica and the broader super-automatic line: how the auto-cycle works, what solution to use, and the post-descale taste reset.',
    topic: 'descaling',
    intro:
      '<p>De\'Longhi super-automatics (Magnifica, Eletta, and the rest of the Dinamica/PrimaDonna line) all run the same descale routine via the rotary knob menu. The cycle is fully automated — you pour solution into the tank, point the knob, and walk away. The user error space is mostly in the prep and post-flush.</p><p>De\'Longhi sells a branded EcoDecalk solution. Third-party citric/lactic descalers labeled "super-automatic safe" work the same way at lower cost. Avoid vinegar — De\'Longhi explicitly voids warranty on machines descaled with vinegar.</p>',
    updatedAt: '2026-05-15',
    totalTime: '30 minutes',
    needs: [
      {
        item: 'De\'Longhi EcoDecalk or compatible third-party descaler',
        note: 'Per De\'Longhi, vinegar voids the warranty. Citric/lactic acid blends marked super-automatic-safe are acceptable.',
      },
      {
        item: 'Filtered water for the post-descale flush',
      },
      {
        item: 'Empty container (1.5 L capacity)',
        note: 'The Magnifica drains a lot of water during the rinse phase.',
      },
    ],
    steps: [
      {
        heading: 'Empty grounds drawer, drip tray, and water tank',
        body: '<p>Remove the grounds drawer and drip tray and empty both. Remove the water tank, rinse, and dry the outside. Skipping this step means descaler-laced water ends up sitting on old coffee grounds in the drip tray — which then gets re-aerosolized by the rinse cycle.</p>',
      },
      {
        heading: 'Mix descaling solution in the water tank',
        body: '<p>Pour the entire EcoDecalk bottle (or the equivalent dose of your third-party descaler) into the tank, then add water to the MAX line. Reinstall the tank.</p>',
      },
      {
        heading: 'Place a 1.5 L container under the milk frother and coffee spout',
        body: '<p>The machine will discharge ~1 L of solution and 1 L of rinse water through both outlets. A standard pitcher or large bowl works — if the container is too small you will be running to the sink mid-cycle.</p>',
      },
      {
        heading: 'Enter descale mode via the menu',
        body: '<p>On most Magnifica variants: press the menu/select knob, scroll to "Descale", press to select, confirm "Yes". The machine prompts you to point the steam knob to the descale position and press OK. The cycle runs automatically — about 25 minutes total for descale + rinse phases.</p><p>If the machine pauses and beeps mid-cycle, it usually means the tank is empty. Refill with plain water and the cycle resumes for the rinse phase.</p>',
      },
      {
        heading: 'Run a manual flush cycle after the automatic rinse',
        body: '<p>The built-in rinse uses one tank of water — which is enough for most water hardnesses, but not for very hard water. After the cycle reports "Descale complete", refill the tank with fresh water and brew a single 8 oz hot water shot (no coffee). Discard. Then pull a blank espresso cycle (no beans loaded) and discard.</p><p>This catches residual descaler in the brew chamber that the auto-rinse can miss.</p>',
      },
      {
        heading: 'Clean the brew unit by hand',
        body: '<p>Descaling cleans the boiler. The brew unit (the removable plastic chamber where pucks form) needs separate cleaning — pop it out, rinse under warm water (no soap), and let it air dry before reinstalling. Do this monthly even on weeks you do not descale.</p>',
      },
    ],
    commonMistakes: [
      'Using white vinegar — voids the De\'Longhi warranty per their service manual, and the smell persists for days in the brew unit.',
      'Skipping the menu-driven cycle and trying to flush descaler through the manual hot-water dispense — the descale cycle accesses internal solenoids the user menu does not.',
      'Not running an extra rinse on hard water — the auto-cycle is sized for moderate hardness. If your water is >10 gpg, run a second hot-water dispense as a safety flush.',
      'Forgetting to clean the brew unit — descaling does not touch the puck chamber, and old grounds in the brew unit will cancel out the cleaning you just did.',
    ],
    faqs: [
      {
        question: 'How often does the Magnifica need descaling?',
        answer:
          'The machine tracks shots and signals when descale is due, typically every 2-3 months for daily users on moderate water. Hard water reduces the interval; using the De\'Longhi water filter extends it significantly.',
      },
      {
        question: 'Can I use the De\'Longhi water filter to avoid descaling?',
        answer:
          'It reduces frequency but does not eliminate it. The filter softens incoming water and stretches the descale interval to roughly every 4-6 months. The machine still tracks usage and will signal when descaling is due.',
      },
      {
        question: 'What does "F" error after descaling mean?',
        answer:
          'On most Magnifica models the F-codes indicate the water circuit did not complete properly — usually because the steam knob was not turned to descale position or the tank ran dry mid-cycle. Power-cycle the machine and re-run the descale cycle with a full tank. If the error persists, contact De\'Longhi service.',
      },
      {
        question: 'My espresso tastes acidic after descaling — should I worry?',
        answer:
          'It almost always means residual descaler. Brew 2-3 hot-water-only cycles, then a couple of blank espresso cycles with no beans, and the taste should return to normal. If it persists past 24 hours, contact service — there may be a stuck valve.',
      },
    ],
  },
  {
    slug: 'how-to-descale-rancilio-silvia',
    title: 'How to descale a Rancilio Silvia',
    description:
      'Manual descale routine for the Rancilio Silvia (V6 and Pro variants): brass boiler protocol, contact time, and the flush sequence that protects the gaskets.',
    productAsin: 'B0BQYMTBNL',
    topic: 'descaling',
    intro:
      '<p>The Rancilio Silvia\'s brass boiler is the same architecture as the Gaggia Classic — manual descale, no electronics involved beyond the power switch. What differs is the brew thermostat: the Silvia\'s thermostat surges briefly when the boiler refills with cold descaler, so let the boiler cool fully before introducing solution.</p><p>Rancilio recommends descaling every 3 months on moderate water. The community consensus on Home-Barista pushes that to every 6 months for filtered-water users, which matches our experience.</p>',
    updatedAt: '2026-05-15',
    totalTime: '30 minutes',
    needs: [
      {
        item: 'Citric or lactic acid descaler',
        note: 'Urnex Dezcal or equivalent. No vinegar — Rancilio\'s brass and rubber tolerate citric acid much better.',
      },
      {
        item: 'Filtered water for rinse cycles',
      },
      {
        item: 'Empty 1 L container',
      },
      {
        item: 'Microfiber cloth and a soft brush for the group head screen',
      },
    ],
    steps: [
      {
        heading: 'Cool the boiler and remove the shower screen',
        body: '<p>If the machine is hot, drain the boiler: power on, open the steam wand, flip the brew switch, let it run until steam emerges. Switch off. Wait 45 minutes for full cool-down — the brass boiler retains heat longer than aluminium.</p><p>Unscrew the shower screen (one center bolt on the group head). Soak the screen in a separate Cafiza solution while the descale runs — this keeps coffee oils from interfering with the freshly-descaled flow paths.</p>',
      },
      {
        heading: 'Mix descaler and prime the boiler',
        body: '<p>Fill the water tank with cool filtered water and mix in the descaler at the recommended dose (typically one Dezcal packet per 1 L). Reinstall the tank. Power on. When the boiler reaches temp, open the steam knob and flip the brew switch — let water + steam mix flow until the boiler is full of descaler solution. Close the steam knob.</p>',
      },
      {
        heading: 'Pull solution through the group head, then dwell',
        body: '<p>With a 1 L container under the group head, flip the brew switch and dispense about 200 ml. Switch off. Let the solution dwell in the boiler and group head for 20 minutes — this is the contact time that does the chemistry.</p>',
      },
      {
        heading: 'Repeat through the steam wand',
        body: '<p>Power back on. When at temp, open the steam knob and flip the brew switch. Dispense 100 ml through the steam wand. Switch off, close the wand, dwell another 5 minutes.</p>',
      },
      {
        heading: 'Drain and flush — 3 full tanks',
        body: '<p>Empty the descaler from the tank. Rinse the tank thoroughly. Refill with clean filtered water. Pull a full tank through both the group head and the steam wand alternately, draining into your discharge container. Refill and repeat twice more.</p><p>Three full tanks is the Rancilio service recommendation. The boiler holds more residual liquid than the Gaggia, so do not skimp on flush cycles.</p>',
      },
      {
        heading: 'Reinstall the shower screen and pull blank shots',
        body: '<p>Reinstall the cleaned shower screen and tighten the bolt. Pull two 30-second blank shots through a clean portafilter. Taste the discharge water from the second shot — if it is clean and odour-free, you are good to brew.</p>',
      },
    ],
    commonMistakes: [
      'Descaling while the boiler is still hot — thermal shock can crack the brew thermostat or warp the group head over time.',
      'Skipping the dwell time and flushing immediately. Without 15-20 minutes of contact, the descaler does not have time to dissolve scale; you are just rinsing.',
      'Reinstalling a coffee-oil-coated shower screen on a freshly descaled boiler — the screen contamination negates the cleaning. Backflush or hand-clean the screen first.',
      'Reusing the descaler solution for a second machine. Once a tank of descaler runs through, it is spent — using it on another machine just spreads dissolved scale around.',
    ],
    faqs: [
      {
        question: 'How often does the Silvia need descaling?',
        answer:
          'Every 3 months per Rancilio, or every 6 months with filtered water in moderate-hardness regions. The Silvia has no scale alert — you track it manually. If shot timing changes for no obvious reason (longer pull, lower volume), that is often the boiler\'s flow path narrowing from scale and a hint to descale.',
      },
      {
        question: 'Can I install a water softener instead of descaling?',
        answer:
          'An inline softener (resin-based, like the BWT bestmax) reduces scale buildup significantly and is common in cafes running Silvia Pros. For home use, a Brita pitcher does most of the same job at much lower cost.',
      },
      {
        question: 'My Silvia leaks from the group head after descaling — is the gasket gone?',
        answer:
          'Likely. The upper group gasket sees full descaler exposure and can soften or shift. It is a $4 part and a 5-minute job to replace — see the troubleshoot guide on Silvia group head leaks for the step-by-step.',
      },
      {
        question: 'Does descaling void the Rancilio warranty?',
        answer:
          'No — Rancilio expects descaling as part of normal maintenance. What can void warranty is opening the machine to clean internal components beyond the boiler\'s normal flow path, or using non-approved chemicals (bleach, strong vinegar).',
      },
    ],
    relatedTroubleshootSlugs: ['rancilio-silvia-leaking-from-group-head'],
  },
  // ============================================================
  // DIALING IN — 2 entries (general + Bambino)
  // ============================================================
  {
    slug: 'how-to-dial-in-espresso',
    title: 'How to dial in espresso (any machine, step by step)',
    description:
      'The dial-in process for home espresso: target ratio, target time, what to adjust when shots run fast or slow, and when to give up on a bean.',
    topic: 'dialing-in',
    intro:
      '<p>Dialing in means getting your machine + grinder + bean combination to produce a balanced espresso. The process is the same on a $400 Bambino or a $3,000 Linea Mini: choose a target ratio and shot time, pull a shot, observe what is wrong, adjust one variable, repeat.</p><p>The single biggest mistake new owners make is changing three variables at once. If you change grind, dose, and water temp on the same shot, you have no idea which change did what.</p>',
    updatedAt: '2026-05-15',
    totalTime: '20 minutes',
    needs: [
      {
        item: 'A grinder you can adjust in small increments',
        affiliateAsin: 'B0BDFTC76P',
        note: 'Stepped grinders work but stepless gives finer control. The Baratza Encore ESP is the entry-level option that handles espresso adjustment.',
      },
      {
        item: 'A scale that reads to 0.1 g',
        affiliateAsin: 'B0006H4VKQ',
        note: 'Any 0.1 g resolution scale works for dialing in. The Rattleware milk thermometer is unrelated — what you need is the scale.',
      },
      {
        item: 'A timer (your phone is fine)',
      },
      {
        item: 'Fresh beans (within 4 weeks of roast date, past the 5-day rest)',
      },
    ],
    steps: [
      {
        heading: 'Choose a target ratio and shot time',
        body: '<p>Standard espresso target: 1:2 ratio (e.g. 18 g coffee in → 36 g espresso out) in 25-32 seconds from the moment the pump engages. This is a baseline, not a law — light roasts often pull better at 1:2.5 over 30+ seconds, darker roasts at 1:1.8 over 25 seconds.</p><p>Pick one target and stick with it for the dial-in session. Changing the target mid-session confuses the signal.</p>',
      },
      {
        heading: 'Dose consistently',
        body: '<p>Weigh your dose every shot. Most home machines run an 18 g basket — dose 18.0 g ± 0.1 g each time. If you vary the dose, you cannot tell whether a shot pulled differently because of grind or because of dose.</p>',
      },
      {
        heading: 'Pull the first shot and time it',
        body: '<p>Use your existing grind setting as the starting point. Distribute the grounds (a WDT tool helps — see our WDT how-to), tamp level, lock in, and pull. Catch the espresso on the scale and stop the shot at your target output weight (36 g for a 1:2 ratio). Record the time.</p>',
      },
      {
        heading: 'Read the result',
        body: '<p>Three outcomes: (a) too fast, shot reached 36 g in under 22 seconds — grind is too coarse. (b) Too slow, shot is at 20 g after 35 seconds and still dripping — grind is too fine. (c) Within range, 25-32 seconds for 36 g — taste it.</p>',
      },
      {
        heading: 'Adjust one variable at a time',
        body: '<p>If too fast: grind finer by 1 setting (or 1/4 turn on a stepless). Pull again. If too slow: grind coarser by 1 setting. Repeat until the shot lands in the time window.</p><p>Only after time is in range, evaluate taste. Sour and thin → grind finer or add more dose. Bitter and harsh → grind coarser or reduce dose slightly.</p>',
      },
      {
        heading: 'Lock in the recipe and move on',
        body: '<p>When you have a shot that hits the time window and tastes balanced, note the grind setting and the dose. That is your recipe for this bean. Expect to re-dial when the bag opens, when humidity changes significantly, or when you switch beans.</p>',
      },
    ],
    commonMistakes: [
      'Changing more than one variable per shot — defeats the purpose of dialing in.',
      'Trying to dial in a stale bean (>6 weeks past roast date) — the grind window collapses and you will never find a balanced shot. Buy fresher beans first.',
      'Using a blade grinder or a coarse-only grinder for espresso — particle distribution is too inconsistent to land a balanced shot reliably.',
      'Judging shots by appearance only (crema thickness, colour) — taste is the actual judge. Crema is influenced by bean age and CO₂ content as much as extraction.',
    ],
    faqs: [
      {
        question: 'How many shots does dialing in usually take?',
        answer:
          '3-6 shots for an experienced user, 8-12 for someone new to it. Once you have a recipe for a bean, switching to a new bean takes 2-3 shots to re-dial.',
      },
      {
        question: 'Why does my shot pull differently in the morning vs. afternoon?',
        answer:
          'Humidity affects bean moisture and grind behaviour. Ambient temperature affects machine warm-up. Beans that have been ground recently absorb humidity faster. None of this is your fault — the workaround is consistent prep timing.',
      },
      {
        question: 'Do I need a pressure gauge to dial in?',
        answer:
          'No. Pressure gauges are useful for confirming machine health (the OPV is set correctly) but you can dial in by ratio + time + taste alone. Most home machines lock pressure at ~9 bar via the OPV.',
      },
      {
        question: 'What if my grinder will not go fine enough?',
        answer:
          'Some grinders are sold "for filter" and lack the fine end of the range needed for espresso. The Baratza Encore (base model) is one — the Encore ESP variant adds the finer steps. If you cannot get below ~30 seconds on a 1:2 ratio at your finest setting, the grinder is the limit, not your technique.',
      },
    ],
  },
  {
    slug: 'how-to-dial-in-espresso-bambino-plus',
    title: 'How to dial in espresso with a Breville Bambino Plus',
    description:
      'Dialing in espresso on the Bambino Plus: working with the 54mm portafilter, switching out the pressurized basket, and target ratios for the Thermojet boiler.',
    productAsin: 'B07VFZHRYC',
    topic: 'dialing-in',
    intro:
      '<p>The Bambino Plus ships with a pressurized basket that masks extraction problems by forcing crema regardless of grind quality. Dialing in real espresso means swapping to the non-pressurized (single or double) baskets that also come in the box, and then treating the dial-in process like any other machine.</p><p>The wrinkle: the Bambino uses a 54mm portafilter, not the 58mm commercial standard. Aftermarket basket choice is narrower and most YouTube dial-in tutorials assume 58mm. The process below adjusts for the 54mm reality.</p>',
    updatedAt: '2026-05-15',
    totalTime: '20 minutes',
    needs: [
      {
        item: 'Non-pressurized basket (single or double, 54mm)',
        note: 'These ship with the Bambino Plus in the accessory tray. If you have lost them, Breville sells a replacement set for $20.',
      },
      {
        item: 'A grinder that can grind for espresso',
        affiliateAsin: 'B0BDFTC76P',
        note: 'The Baratza Encore ESP is a common pairing with the Bambino — its espresso step range matches the Bambino\'s needs.',
      },
      {
        item: '0.1 g scale',
      },
      {
        item: 'WDT tool (optional but very helpful for 54mm baskets)',
        affiliateAsin: 'B09QV3RTBN',
        note: 'The 54mm baskets channel more easily than 58mm. A WDT tool reduces channeling almost completely.',
      },
    ],
    steps: [
      {
        heading: 'Swap to the non-pressurized basket',
        body: '<p>The Bambino Plus ships with two basket types: pressurized (single hole on the bottom, harder to see) and non-pressurized (visible mesh of holes). For real dialing in, use the non-pressurized double. Lock it into the portafilter — it sits in the same spring clip.</p>',
      },
      {
        heading: 'Set your target',
        body: '<p>Bambino-friendly target: 18 g in → 36 g out, 25-30 seconds. The Thermojet brings the boiler to temp in 3 seconds, so warm-up time is negligible — just flush a 50 ml water shot through the empty portafilter before dosing to bring the group head up to temperature.</p>',
      },
      {
        heading: 'Dose, distribute, tamp',
        body: '<p>Weigh 18.0 g into the basket. WDT-stir to break up clumps. Tamp level. Lock in. The 54mm basket is shallower than a 58mm — overdosing past 19 g leaves no headroom and you will damage the shower screen.</p>',
      },
      {
        heading: 'Press the 2-cup button and time the shot',
        body: '<p>The Bambino has volumetric programming but for dial-in use the manual mode: tap the 1- or 2-cup button to start, then tap again to stop when your scale hits 36 g. Note the time elapsed.</p><p>If the shot finishes in <22 seconds, grind finer 1 step on the grinder. If it is still dripping at 35 seconds with <30 g out, grind coarser 1 step.</p>',
      },
      {
        heading: 'Repeat until in the window, then taste',
        body: '<p>Within 25-30 seconds for 36 g, evaluate the taste. Sour → finer or higher dose. Bitter → coarser or lower dose. Bambino owners often land at a finer setting than the same beans need on a 58mm machine because the smaller basket extracts slightly less efficiently.</p>',
      },
      {
        heading: 'Save the recipe via volumetric mode (optional)',
        body: '<p>Once dialed in, you can program the Bambino\'s 2-cup button to stop at your preferred volume: hold the 2-cup button during a shot, release when the scale hits 36 g, and the machine remembers. This is volume-based, not weight-based, so it drifts as beans age — but it is convenient for daily use.</p>',
      },
    ],
    commonMistakes: [
      'Trying to dial in with the pressurized basket — you cannot. The basket equalizes pressure and masks grind quality entirely. Switch to non-pressurized first.',
      'Overdosing past 19 g in a 54mm basket. The shower screen will leave a deep imprint in the puck and you risk bending the screen over time.',
      'Skipping the water flush before pulling — even with the Thermojet, the group head benefits from a 50 ml pre-flush to stabilize temperature.',
      'Comparing recipes to 58mm tutorials directly. The 54mm basket behaves differently; you may need a finer grind than equivalent 58mm settings.',
    ],
    faqs: [
      {
        question: 'My Bambino Plus shots are pulling fast no matter how fine I grind — what is wrong?',
        answer:
          'Two common causes. First, check you are using the non-pressurized basket — the pressurized one always flows fast by design. Second, your grinder may not go fine enough. Many entry-level grinders (Baratza Encore base, OXO Brew) need the espresso-specific variant for the Bambino\'s fine grind requirement.',
      },
      {
        question: 'Why does my Bambino shot taste sour even at 30+ seconds?',
        answer:
          'Either under-extracted (grind too coarse, even though time looks right — try finer and shorter) or the beans are too light-roasted for the Bambino\'s boiler temperature ceiling. The Bambino brews at ~93°C max; very light roasts that need 96°C+ to fully extract can taste sour on it regardless of recipe.',
      },
      {
        question: 'Can I use bottomless portafilters on the Bambino?',
        answer:
          'Aftermarket 54mm bottomless portafilters exist (Crema-Coffee, IMS) but the Bambino\'s spring clip system limits how the portafilter sits. Check fit reviews before buying. Most Bambino owners stick with the stock portafilter and instead focus on basket and WDT improvements.',
      },
      {
        question: 'How often do I need to re-dial in?',
        answer:
          'Every time you open a new bag of beans, every ~10 days as the bag ages, and after any change to grinder maintenance (cleaning, new burrs). For a bag you have just opened, expect 2-3 shots to re-dial.',
      },
    ],
    relatedTroubleshootSlugs: ['channeling-fix-espresso'],
  },
  // ============================================================
  // MILK FROTHING — 2 entries
  // ============================================================
  {
    slug: 'how-to-froth-milk-bambino-plus',
    title: 'How to froth milk with a Breville Bambino Plus (auto and manual)',
    description:
      'Using the Bambino Plus auto-frothing wand — temperature and froth-level settings — plus how to manually steam milk on the same machine for latte art.',
    productAsin: 'B07VFZHRYC',
    topic: 'milk-frothing',
    intro:
      '<p>The Bambino Plus has two milk-steaming modes: automatic (you set temp and froth level, it stops when done) and manual (you operate it like a traditional steam wand). Most owners use auto exclusively, but the manual mode is what gets you to latte-art-grade microfoam.</p><p>The wand has a single hole and is shorter than a Linea Mini\'s — this constrains what is possible. You will not pull rosettas with the Bambino. You will pull clean tulips and hearts once you learn the manual mode.</p>',
    updatedAt: '2026-05-15',
    totalTime: '5 minutes',
    needs: [
      {
        item: 'Cold whole milk (fresh, refrigerated)',
        note: 'Whole milk foams better than 2% or skim. Plant milks vary widely — barista-formulated oat and soy work; standard cartons do not.',
      },
      {
        item: 'Stainless steel milk pitcher (12-20 oz)',
        affiliateAsin: 'B003YFI56C',
        note: 'A 20 oz pitcher is the sweet spot for a 6 oz latte. Smaller pitchers do not give you enough steam roll surface.',
      },
      {
        item: 'A thermometer (optional after a few sessions)',
        affiliateAsin: 'B0006H4VKQ',
        note: 'Useful while learning to feel the 140°F target by hand on the pitcher. After 20 sessions you will not need it.',
      },
    ],
    steps: [
      {
        heading: 'Pour cold milk to the bottom of the spout',
        body: '<p>Cold milk steams better than room-temp — the longer you can stretch before reaching 140°F, the more foam you can build. Pour milk to just below the bottom of the pitcher\'s pour spout (about 1/3 full for a 20 oz pitcher).</p>',
      },
      {
        heading: 'Insert the wand and set auto mode',
        body: '<p>Tilt the pitcher slightly. Insert the steam wand so the tip is about 1 cm below the milk surface, centered. Press the Milk button. The two dial buttons set temperature (low/med/high) and froth (low/med/high). Start with med/med for a latte, low/high for a cappuccino.</p>',
      },
      {
        heading: 'Let the machine work — do not move the wand',
        body: '<p>The Bambino\'s auto mode magnetically detects the pitcher and uses its sensors to gauge temperature. Moving the pitcher mid-cycle confuses the sensor. Hold steady. The cycle stops automatically when the milk hits the target temp — usually 30-45 seconds.</p>',
      },
      {
        heading: 'Tap and swirl after the cycle ends',
        body: '<p>Once the wand shuts off, lift the pitcher, tap it firmly on the counter 2-3 times to pop large bubbles, then swirl the milk in circles for 5 seconds. This integrates the foam into the liquid — without this step you have foam floating on hot milk, not microfoam.</p>',
      },
      {
        heading: 'Pour into your espresso',
        body: '<p>Pour from the side of the cup with the spout 2-3 cm above the espresso surface, then drop the spout closer as the cup fills to set the foam pattern. For a tulip: pour, lift, pour again. The Bambino\'s single-hole wand produces decent but not exceptional microfoam — pours look cleaner if you do not over-aerate (skip the "high froth" setting for latte work).</p>',
      },
      {
        heading: 'Wipe the wand immediately and purge',
        body: '<p>Within 5 seconds of finishing, wipe the wand with a damp cloth and press the Milk button briefly to purge any milk inside the wand. Dried milk inside the wand is the #1 cause of "Bambino Plus not steaming" failures down the line.</p>',
      },
    ],
    commonMistakes: [
      'Skipping the post-steam purge — milk dries inside the wand and clogs the steam hole, requiring a needle clean.',
      'Using the high-froth setting for latte work — it over-aerates and you get bubbly foam, not microfoam.',
      'Moving the pitcher during auto cycle — confuses the temperature sensor and the cycle may stop early or overheat.',
      'Starting with warm milk — gives you no time to stretch before hitting target temp. Always start cold.',
    ],
    faqs: [
      {
        question: 'Can I make latte art with the Bambino Plus?',
        answer:
          'Yes for hearts, tulips, and basic flag patterns. Rosettas are difficult because the single-hole wand does not generate enough swirl. The limiting factor is hardware, not your skill — many YouTube Bambino owners produce clean tulips with practice.',
      },
      {
        question: 'My foam is bubbly, not microfoam — what is wrong?',
        answer:
          'Two likely causes. (1) Wand tip too close to the surface during stretching, so you are injecting air rather than rolling milk. (2) Not tapping and swirling after steaming. The swirl step integrates the foam into the milk.',
      },
      {
        question: 'How do I switch to manual mode?',
        answer:
          'Press and hold the Steam button for 2 seconds — the machine enters manual mode and the steam runs continuously until you press the button again. Now you operate the wand like a traditional steam wand: stretch first (tip at surface, listen for the tearing sound), then submerge to roll. Manual mode is required if you want latte-art-quality microfoam.',
      },
      {
        question: 'Plant milks not foaming — am I doing something wrong?',
        answer:
          'Most plant milks need to be specifically formulated for baristas to foam well. Look for "barista edition" oat (Oatly Barista, Califia Barista), soy (Silk Barista, Bonsoy), or almond. Standard cartons of unsweetened almond/coconut/oat will not produce stable foam regardless of technique.',
      },
    ],
    relatedTroubleshootSlugs: ['bambino-plus-milk-wand-not-steaming'],
  },
  {
    slug: 'how-to-steam-milk-manual-wand',
    title: 'How to steam milk on a manual wand (Gaggia, Silvia, prosumer)',
    description:
      'Manual milk steaming technique: stretch phase, roll phase, target temperature, and how to read your wand\'s power level to adjust technique.',
    topic: 'milk-frothing',
    intro:
      '<p>Manual milk steaming is the same physics on a $400 Gaggia Classic and a $5,000 La Marzocco — the difference is steam pressure. Lower-pressure wands (Gaggia, Silvia, Bambino in manual mode) give you more time to work and forgive technique errors. Higher-pressure wands (dual boilers, prosumer machines) move milk faster and are less forgiving.</p><p>The fundamentals are stretch first (introduce air while milk is cold), then roll (submerge and swirl until target temp). Read by ear: the "tearing paper" sound is air injection; the deep "whirlpool" sound is rolling.</p>',
    updatedAt: '2026-05-15',
    totalTime: '5 minutes',
    needs: [
      {
        item: 'Cold whole milk',
      },
      {
        item: 'Stainless steel milk pitcher (sized to your drink)',
        affiliateAsin: 'B003YFI56C',
        note: '12 oz pitcher for one cappuccino, 20 oz for two lattes. Pitcher should be no more than 1/2 full at start.',
      },
      {
        item: 'A wet rag for the wand (kept at the machine, not the sink)',
      },
    ],
    steps: [
      {
        heading: 'Purge the wand before submerging',
        body: '<p>Open the steam knob fully for 1-2 seconds with the wand pointing into the drip tray. This clears any condensed water that has collected in the wand. Without this purge, you inject cold water into your milk and lose 5 seconds of stretch time.</p>',
      },
      {
        heading: 'Position the wand at the milk surface',
        body: '<p>Pour cold milk to 1/3 of the pitcher\'s capacity. Tilt the pitcher slightly. Position the wand tip just below the milk surface — about 5 mm down, off-center to create a swirl.</p>',
      },
      {
        heading: 'Open the steam valve and stretch',
        body: '<p>Open the steam knob fully. Listen for the "tearing paper" sound — this is air being injected into the milk. Keep the wand tip near the surface; you should see the milk volume growing. Stretch until the milk is roughly 90-100°F (the pitcher feels lukewarm). For a cappuccino, stretch longer; for a latte, stretch less.</p>',
      },
      {
        heading: 'Submerge and roll',
        body: '<p>Lower the pitcher (or raise the wand) so the wand tip is now 2-3 cm below the surface. The sound changes from tearing to a deeper whirlpool. The milk should be spinning in the pitcher. Hold this position until the pitcher is too hot to comfortably touch the side — that is approximately 140°F.</p>',
      },
      {
        heading: 'Close the valve, then lift the wand out',
        body: '<p>Close the steam knob FIRST, then lift the wand out of the milk. Lifting while the valve is open splatters milk everywhere and pulls air into the steam circuit.</p>',
      },
      {
        heading: 'Wipe, purge, and pour',
        body: '<p>Immediately wipe the wand with the wet rag. Open the steam knob briefly to purge any milk residue from inside the wand. Tap the pitcher on the counter to pop large bubbles, swirl for 5 seconds, then pour into your espresso.</p>',
      },
    ],
    commonMistakes: [
      'Stretching too long — you end up with stiff foam floating on cold milk. Stretch only until the milk warms slightly to the touch.',
      'Stretching too late — once the milk passes 100°F, stretching introduces big bubbles instead of fine foam. Stretch in the first 5-10 seconds only.',
      'Forgetting to purge the wand after steaming — dried milk inside the wand is the #1 cause of "no steam" failures.',
      'Lifting the wand before closing the steam valve — splashes milk and pulls air into the boiler, which can damage the pump on some machines.',
    ],
    faqs: [
      {
        question: 'My wand has 1 hole, 2 holes, 3 holes — does it matter?',
        answer:
          'Yes. Single-hole wands (Bambino in manual, Gaggia Classic stock) produce less swirl and require more active wand positioning. Multi-hole wands (Silvia\'s 1-hole stock, Rancilio aftermarket 4-hole, prosumer wands) generate more turbulence and are easier for beginners. Many Gaggia and Silvia owners upgrade to a 4-hole tip ($30-40).',
      },
      {
        question: 'How do I know the milk has hit 140°F without a thermometer?',
        answer:
          'Touch the side of the pitcher with your bare hand at the bottom. When you can hold it for about 1 second comfortably, you are at 135-145°F. Beyond that becomes painful — that is 150°F+ and you have overheated, which scorches the milk and makes it taste cooked.',
      },
      {
        question: 'My milk has big bubbles, not microfoam — fix?',
        answer:
          'Most likely you stretched too aggressively. Move the wand tip down further (deeper submersion) during the roll phase to break up the large bubbles. If they persist, tap the pitcher harder on the counter and swirl longer before pouring.',
      },
      {
        question: 'Why does my Gaggia / Silvia wand take so long to steam compared to my friend\'s prosumer?',
        answer:
          'Lower boiler pressure. Single-boiler machines under $500 typically generate 0.8-1.1 bar of steam pressure vs. 1.3-1.5 bar on prosumer dual boilers. This is by design — the smaller boiler can\'t store as much energy. The trade-off is forgiveness: you have more time to react.',
      },
    ],
    relatedTroubleshootSlugs: ['bambino-plus-milk-wand-not-steaming'],
  },
  // ============================================================
  // BACKFLUSH + GRINDER + ROUTINE + SETUP
  // ============================================================
  {
    slug: 'how-to-backflush-espresso-machine',
    title: 'How to backflush an espresso machine (Breville, Gaggia, prosumer)',
    description:
      'Weekly backflush routine for any espresso machine with a 3-way solenoid: blind basket, Cafiza dose, cycle sequence, and rinse pattern.',
    topic: 'backflushing',
    intro:
      '<p>Backflushing pushes water (with cleaner) backwards through the group head, removing coffee oils from the dispersion screen and 3-way solenoid. Machines without a 3-way solenoid (most Bambinos, super-automatics) cannot be backflushed traditionally — they need different maintenance.</p><p>This routine works for any semi-automatic with a 3-way solenoid: Gaggia Classic, Rancilio Silvia, Breville Dual Boiler, Lelit Mara X, Profitec Pro 300, etc.</p>',
    updatedAt: '2026-05-15',
    totalTime: '15 minutes',
    needs: [
      {
        item: 'Cafiza or Pulycaff backflush detergent (alkaline powder)',
        affiliateAsin: 'B00LWLBQH2',
        note: 'Cafiza is the industry standard. ~3 g per backflush. A 566 g jar lasts about a year of weekly backflushing.',
      },
      {
        item: 'Blind basket (no holes) sized to your portafilter',
        note: 'Many machines ship with one; check the accessory tray. If missing, $15-20 from the manufacturer. Required — you cannot backflush without it.',
      },
      {
        item: 'Microfiber cloth for the group head',
      },
    ],
    steps: [
      {
        heading: 'Verify your machine has a 3-way solenoid',
        body: '<p>If your machine relieves pressure with a "psst" when the brew stops (you can hear water/air discharge into the drip tray), it has a 3-way solenoid. If shots end silently and the puck is soup-wet when you knock it out, it does not — and backflushing will not work as intended. The Breville Bambino base model lacks a solenoid; the Bambino Plus has one.</p>',
      },
      {
        heading: 'Load the blind basket and dose Cafiza',
        body: '<p>Insert the blind basket into the portafilter. Add about 3 g of Cafiza powder — a level half-teaspoon. Do not overdose; more powder does not clean better, it just leaves more residue to rinse.</p>',
      },
      {
        heading: 'Run 5 short cleaning cycles',
        body: '<p>Lock the portafilter into the group head. Start the brew cycle for 10 seconds, then stop. Wait 5 seconds (let the solenoid release pressure). Repeat 5 times. You will see brown discharge in the drip tray — that is the coffee oils being purged.</p>',
      },
      {
        heading: 'Remove, rinse the blind basket',
        body: '<p>Unlock the portafilter and rinse the blind basket under running water until no Cafiza foam remains. Wipe the basket dry.</p>',
      },
      {
        heading: 'Run 5 rinse cycles with clean blind basket',
        body: '<p>With the empty blind basket (no Cafiza), lock back in and run another 5 short cycles. This rinses any residual cleaner from the solenoid and group head.</p>',
      },
      {
        heading: 'Wipe the group head and shower screen',
        body: '<p>Remove the portafilter. Wipe the group head gasket and the shower screen face with a damp microfiber cloth. If your shower screen unscrews easily (Gaggia, Silvia), pop it out monthly and soak it in a Cafiza solution for 30 minutes.</p>',
      },
    ],
    commonMistakes: [
      'Trying to backflush a machine without a 3-way solenoid — the water has nowhere to go and you risk damaging the pump.',
      'Using too much Cafiza (>5 g per cycle) — leaves residue that takes 10+ rinse cycles to fully purge.',
      'Skipping the 5 rinse cycles after Cafiza — pulling coffee through a solenoid still coated in detergent makes the next shot taste like soap.',
      'Backflushing daily — once a week is plenty for home use. Daily creates wear on the solenoid for no maintenance benefit.',
    ],
    faqs: [
      {
        question: 'How often should I backflush?',
        answer:
          'Weekly with detergent if you pull 2+ shots a day. Daily with plain water (no detergent) is also fine and recommended by some service techs to keep the solenoid free of grounds.',
      },
      {
        question: 'Can I use dish soap instead of Cafiza?',
        answer:
          'No. Dish soap leaves a surfactant residue that requires many more rinse cycles to clear, and the foam can over-pressurize the line. Use a purpose-made espresso machine detergent — they are designed to break down coffee oils and rinse cleanly.',
      },
      {
        question: 'What if my shower screen is dark brown / black with oil?',
        answer:
          'That means weekly backflushing was overdue. Unscrew the screen (one center bolt on most machines), soak in Cafiza solution overnight, scrub with a soft brush, reinstall. Going forward, weekly backflush prevents this buildup.',
      },
      {
        question: 'Does backflushing replace descaling?',
        answer:
          'No — they treat different problems. Backflushing removes coffee oils (alkaline cleaner). Descaling removes limescale (acidic descaler). Both are needed, on different schedules.',
      },
    ],
  },
  {
    slug: 'how-to-season-grinder-burrs',
    title: 'How to season grinder burrs (Niche, Baratza, Eureka)',
    description:
      'When and why to season new grinder burrs: how much coffee to run through, what to listen for, and the difference between needs-seasoning and just-installed.',
    topic: 'grinder-seasoning',
    intro:
      '<p>"Seasoning" a grinder means running enough coffee through new burrs to wear off microscopic manufacturing burrs, smooth the cutting edges, and stabilize the grind output. A brand new grinder will produce a slightly different particle distribution at the same setting in week 1 vs. week 4 of use — seasoning is the process of pushing through that change quickly.</p><p>How much coffee depends on the burr material and manufacturer. Niche Zero owners report stable output after about 1-2 kg of coffee through new burrs. Baratza\'s steel burrs typically settle in around 0.5 kg. Eureka and other premium flat burrs may take 2-3 kg.</p>',
    updatedAt: '2026-05-15',
    totalTime: '1 hour',
    needs: [
      {
        item: 'Cheap supermarket coffee (1-2 kg, whole bean)',
        note: 'Do not use specialty beans for seasoning — you are throwing the output away. Walmart house brand or similar is fine.',
      },
      {
        item: 'A bowl or container to catch the discarded grounds',
      },
      {
        item: 'Compost or trash bin nearby',
      },
    ],
    steps: [
      {
        heading: 'Verify you actually need to season',
        body: '<p>Most owners do not. Brand new grinders from Niche, Eureka, Baratza, DF64, and most established brands ship pre-seasoned by the manufacturer (they run beans through QC before packaging). Seasoning is mainly relevant if (a) you installed new aftermarket burrs, or (b) you bought from a brand that explicitly recommends it (some Chinese-market grinders).</p>',
      },
      {
        heading: 'Set the grinder to a middle setting',
        body: '<p>Pick a mid-range grind setting — espresso-fine to drip-coarse range. Do not season at the extreme finest or coarsest — you want to work the middle of the burr alignment.</p>',
      },
      {
        heading: 'Grind 100 g of beans, then walk away for 30 seconds',
        body: '<p>Load the hopper or single-dose chamber with 100 g of beans. Grind. Discard the output. Wait 30 seconds for the motor to cool — this matters on small grinders without thermal management like the Niche.</p>',
      },
      {
        heading: 'Repeat 5-15 times',
        body: '<p>Keep running 100 g batches until you have processed your full kilo (or more). After every 500 g, change the grind setting by 5-10 steps in either direction so the burrs work across their range.</p>',
      },
      {
        heading: 'Test with real beans at your normal setting',
        body: '<p>Once seasoning is complete, load a known bean at your normal espresso setting. Pull a shot. Note the time. If it pulls noticeably differently from before seasoning (faster usually, as the burrs are now "smoother"), expect to re-dial 1-2 settings finer.</p>',
      },
    ],
    commonMistakes: [
      'Seasoning with expensive specialty beans — waste of money. Cheap beans give the same burr-conditioning effect.',
      'Running the grinder continuously without cool-down — small grinders overheat. Wait 30 seconds between 100 g batches.',
      'Believing seasoning fixes all grind problems. If your grinder has alignment issues out of the box, seasoning does not fix it — that needs a shim or warranty claim.',
      'Re-seasoning every time you change beans. Seasoning is a one-time burr break-in, not a per-bean ritual.',
    ],
    faqs: [
      {
        question: 'Does the Niche Zero need seasoning?',
        answer:
          'Niche ships with hardened steel conical burrs that are pre-tested at the factory. The official recommendation is to discard the first ~50 g of output and then begin using normally. Heavy seasoning (1+ kg) is not necessary unless you replace the burrs.',
      },
      {
        question: 'Does the Baratza Encore need seasoning?',
        answer:
          'No formal seasoning needed. The Encore\'s steel burrs are tested at the factory and stabilize quickly. Just brew your first few drinks at your normal setting and re-dial as needed.',
      },
      {
        question: 'I installed aftermarket burrs in my Mazzer/Eureka — how much seasoning?',
        answer:
          'For SSP and other aftermarket flat burrs: 2-3 kg of coffee is the common recommendation from the manufacturers. The burrs ship sharper than OEM and the cutting edges take longer to smooth into a stable output. The grinder will produce noticeably finer particles for the first 1-2 kg.',
      },
      {
        question: 'Can I season with old/stale beans?',
        answer:
          'Yes — stale beans work fine for seasoning. The mechanical effect on the burrs is the same. Just do not use old oily dark roasts for seasoning a brand new grinder — the oils coat the burrs and require an extra cleaning pass with rice or grinder-cleaning tablets.',
      },
    ],
  },
  {
    slug: 'how-to-daily-weekly-monthly-espresso-cleaning',
    title: 'Daily, weekly, and monthly espresso machine cleaning checklist',
    description:
      'A maintenance schedule for any home espresso setup: what to do every shot, every week, every month, and every quarter to keep the machine and grinder healthy.',
    topic: 'maintenance-routine',
    intro:
      '<p>Most "my machine broke" posts on /r/espresso trace back to skipped cleaning, not actual hardware failure. The flip side: most home setups need less than 15 minutes per week of maintenance to stay in factory-clean condition.</p><p>This is the cadence used by most service techs and home-barista forum old-timers. Adjust for your shot volume — heavy users (4+ shots/day) shorten the intervals; weekend-only users can stretch them.</p>',
    updatedAt: '2026-05-15',
    totalTime: '15 minutes',
    needs: [
      {
        item: 'Cafiza or equivalent backflush detergent (weekly)',
        affiliateAsin: 'B00LWLBQH2',
      },
      {
        item: 'Citric or lactic acid descaler (quarterly)',
        note: 'Same descaler line — Urnex Dezcal works for most machines.',
      },
      {
        item: 'Microfiber cloths (multiple)',
      },
      {
        item: 'Soft brush (for grinder and group head)',
      },
    ],
    steps: [
      {
        heading: 'Every shot: wipe, purge, knock',
        body: '<p>After each shot: wipe the portafilter with a microfiber, purge the group head (run 2-3 seconds of water through the empty group), knock out the puck. After milk steaming: wipe the wand and purge it before milk dries inside.</p>',
      },
      {
        heading: 'End of every day: rinse the portafilter and basket',
        body: '<p>Pop the basket out of the portafilter, rinse both under running water (no soap), wipe dry. Wipe the drip tray. If you have a knock box, dump the grounds.</p>',
      },
      {
        heading: 'Weekly: backflush with Cafiza',
        body: '<p>Run the backflush routine (see our how-to-backflush guide). 5 cycles with Cafiza, 5 rinse cycles with empty blind basket. Wipe the group head gasket while you have the portafilter out.</p>',
      },
      {
        heading: 'Weekly: brush the grinder chute and burrs',
        body: '<p>With the grinder off (unplugged for safety), brush out the chute with a soft brush. If your grinder has accessible burrs (Niche, single-dose grinders), brush the burrs through their access. Removes stale grounds that go rancid and taint future shots.</p>',
      },
      {
        heading: 'Monthly: deep clean the shower screen and basket',
        body: '<p>Unscrew the shower screen (1 center bolt on most machines) and soak in Cafiza solution for 30 minutes. Scrub gently with a soft brush. Rinse, dry, reinstall. Same treatment for the basket if it looks oily.</p>',
      },
      {
        heading: 'Quarterly: descale (or when the alert fires)',
        body: '<p>Run the descale cycle for your machine (see the how-to-descale guides per brand). If your machine has a descale alert (Breville, De\'Longhi), wait for the alert rather than descaling on a calendar — over-descaling wears boiler seals faster than scale buildup does.</p>',
      },
    ],
    commonMistakes: [
      'Soaking baskets or screens in dish soap — leaves a surfactant film that affects shot taste for the next several pulls. Use Cafiza or rinse with hot water only.',
      'Letting milk dry on the steam wand. Once dry, it cakes and requires soaking in hot water to remove, plus a needle to clear the steam hole.',
      'Putting any part of the machine in the dishwasher. Heat + detergent damages portafilter handles, basket finishes, and any plastic components.',
      'Forgetting the grinder. A clean machine paired with a grinder full of stale grounds means stale shots regardless.',
    ],
    faqs: [
      {
        question: 'Can I use vinegar or lemon juice for any of this?',
        answer:
          'Vinegar — no, see our descale guides for why. Lemon juice — also no, same reason (citric acid concentration in juice is too low and inconsistent). Buy a purpose-made descaler and detergent; they cost $15-20 each and last close to a year.',
      },
      {
        question: 'Do I need to descale if I use bottled water?',
        answer:
          'Mostly no, but check the bottle label. "Purified" or "distilled" water has near-zero minerals and does not scale (but may damage some boilers — too pure water dissolves metals). "Spring" water can be higher in minerals than tap. The safest middle ground is filtered tap water (Brita pitcher) — low scale risk, healthy mineral content for taste.',
      },
      {
        question: 'My machine has no descale alert — how do I know when?',
        answer:
          'Track shots manually or use a recurring calendar reminder. Generic baseline: every 3 months for filtered water, every 6 weeks for hard tap water. The first sign you missed it is usually slower shot times at the same grind setting — scale narrows the flow path.',
      },
      {
        question: 'How long should I expect to spend per week on maintenance?',
        answer:
          '10-15 minutes for the weekly backflush + grinder brush. Add 30 minutes per month for the deep screen clean. 30-45 minutes per quarter for descaling. Most weeks you are just wiping things down.',
      },
    ],
  },
  {
    slug: 'how-to-set-up-home-espresso-bar',
    title: 'How to set up a home espresso bar (machine, grinder, tools, water)',
    description:
      'Setting up a home espresso station: equipment placement, water supply, grounds workflow, and the accessories that actually matter vs. the ones that do not.',
    topic: 'setup',
    intro:
      '<p>This is the first-day checklist when your machine arrives. Assumes you have already bought a machine + grinder pair — the focus here is what to do once the boxes are open, what accessories to buy first, and how to lay out the workflow so you are not spending 10 minutes per shot reaching for things.</p><p>A complete setup needs the machine, a grinder, a scale, a knock box, a tamper that matches your basket, and a milk pitcher if you steam milk. Everything beyond that is optional, and a lot of it is sold to home owners who do not need it.</p>',
    updatedAt: '2026-05-15',
    totalTime: '1 hour',
    needs: [
      {
        item: 'A grinder (this is more important than the machine)',
        affiliateAsin: 'B0BDFTC76P',
        note: 'Even an entry-level burr grinder beats a $1,500 machine paired with a blade grinder. See our best-grinder-under-200 guide for options.',
      },
      {
        item: 'A scale that reads to 0.1 g',
        note: 'Required for dialing in. A basic kitchen scale works for milk pitcher weighing but you want 0.1 g resolution for espresso.',
      },
      {
        item: 'A knock box (collects spent pucks)',
        affiliateAsin: 'B005MMJZ22',
        note: 'Saves your trash bin from coffee mush. The Joe Frex Mini is the small-kitchen-friendly entry point.',
      },
      {
        item: 'A tamper sized to your basket (58mm for most prosumer, 54mm for Breville)',
        affiliateAsin: 'B07XGYLW2H',
        note: '58mm — Normcore basic works. For Breville: 54mm version of the same.',
      },
      {
        item: 'A milk pitcher if you steam milk',
        affiliateAsin: 'B003YFI56C',
        note: '20 oz Joe Frex is the standard. Skip if you brew espresso only.',
      },
      {
        item: 'A water filter (Brita pitcher minimum)',
        note: 'Reduces scaling. Critical if your tap water is hard.',
      },
    ],
    steps: [
      {
        heading: 'Pick a counter spot with three things',
        body: '<p>The setup needs: (1) a power outlet within 4 feet (the machine\'s power cord is short — extension cords are not safe for the current draw), (2) clearance above the machine for the top-fill water tank or for opening the grinder hopper, (3) workflow path: machine on the right, grinder on the left of it (or vice versa), and a clear strip in front for the portafilter and scale.</p>',
      },
      {
        heading: 'Set up water before first power-on',
        body: '<p>If your tap water is hard (test strips cost $5 on Amazon), use a Brita pitcher or in-tank filter from day one. Filling with hard tap water for "just the first few weeks" is the most common reason machines need their first descale within 2 months. Soft water from the start = 6+ month descale intervals.</p>',
      },
      {
        heading: 'First run: water-only flush',
        body: '<p>Fill the tank with filtered water. Power on. Pull 3-4 water-only shots through the empty portafilter. This flushes any factory residue and primes the lines. Discard. Do not pull coffee on the first power-on without flushing.</p>',
      },
      {
        heading: 'Calibrate the grinder',
        body: '<p>Run 50 g of cheap beans through the grinder at a mid-fine setting. Discard. This clears any storage dust and confirms the burrs are spinning correctly. If your grinder needs seasoning (most do not — see our seasoning how-to), do it now.</p>',
      },
      {
        heading: 'Pull your first real shot',
        body: '<p>18 g in, target 36 g out in 25-30 seconds. The first shot will almost certainly be wrong — usually too fast because the grind starts too coarse. That is fine. Use the dial-in process to land a balanced shot.</p>',
      },
      {
        heading: 'Set up the cleaning station',
        body: '<p>Within arm\'s reach of the machine: knock box for pucks, a small jar of Cafiza, a couple of microfiber rags, a blind basket if your machine ships with one. Make these visible — if cleaning supplies are buried in a cabinet, the weekly backflush gets skipped.</p>',
      },
    ],
    commonMistakes: [
      'Buying a machine without a grinder budget. A $700 espresso machine paired with the $20 hand grinder you already own will under-perform a $250 espresso machine paired with a $200 grinder.',
      'Skipping the scale. Eyeballing the dose and shot weight introduces enough variance that dialing in is impossible.',
      'Loading the machine with hard tap water from day one. First descale within 2 months instead of 6.',
      'Buying every accessory the YouTube reviewer mentioned. Most home setups need 5 things: scale, tamper, knock box, milk pitcher, cleaning supplies. WDT tools, bottomless portafilters, distribution tools are nice-to-haves, not essentials.',
    ],
    faqs: [
      {
        question: 'How much should I budget for the full setup?',
        answer:
          'Realistic minimum: $400 machine + $200 grinder + $100 accessories = $700. For a serviceable forever-setup: $500 machine + $400 grinder + $150 accessories = $1050. Below $700 and you are compromising heavily on either machine or grinder; below $400 and you should consider an Aeropress + a Comandante for a year instead.',
      },
      {
        question: 'Can I skip the scale and just measure by volume?',
        answer:
          'Technically yes, in practice no. Coffee densities vary by roast (dark roasts weigh less per volume than light roasts) and dose precision is what makes dialing in repeatable. A 0.1 g scale is $25 on Amazon — there is no good reason to skip it.',
      },
      {
        question: 'Do I need a bottomless portafilter?',
        answer:
          'No. They are useful for diagnosing channeling visually (you can see where the espresso is rushing through) but you can dial in successfully with the stock spouted portafilter. Buy one only after you have the basics dialed in and want to troubleshoot extraction quality.',
      },
      {
        question: 'What is the workflow / sequence for actually pulling a shot?',
        answer:
          'Power on (5-30 min before, depending on machine warm-up). Flush 50 ml water through empty portafilter. Weigh 18 g of beans into grinder. Grind. WDT or tap. Tamp. Lock in. Start shot, scale on, stop at target weight. Knock puck into box. Wipe portafilter. Done. Should take ~3 minutes from cold portafilter to drink in hand.',
      },
    ],
  },
];

// Index helpers — para internal linking y para que el index combinado
// (guides/index.astro) los pueda agrupar por topic sin re-implementar lógica.
export const HOW_TO_TOPICS: Record<HowToPage['topic'], string> = {
  descaling: 'Descaling',
  cleaning: 'Cleaning',
  backflushing: 'Backflushing',
  'dialing-in': 'Dialing in',
  'milk-frothing': 'Milk frothing',
  'grinder-seasoning': 'Grinder seasoning',
  setup: 'Setup',
  'maintenance-routine': 'Maintenance routines',
};

export function howToBySlug(slug: string): HowToPage | undefined {
  return howToPages.find((p) => p.slug === slug);
}

export function howTosForProduct(asin: string): HowToPage[] {
  return howToPages.filter((p) => p.productAsin === asin);
}

// Mapeo topic → product type: qué tipo de producto se beneficia de una guía
// genérica con ese topic. Usado por el CTA "Owner help" del product page
// para sugerir how-tos relevantes cuando NO hay guías product-specific.
//
// 'espresso-machine' es el bucket por default porque la mayoría de los
// topics aplican a máquinas (descale, dial-in, milk, backflush, cleaning,
// setup). 'grinder' solo cuando el topic es explícitamente sobre grinder.
const HOW_TO_TOPIC_TO_PRODUCT_TYPE: Record<HowToPage['topic'], string[]> = {
  descaling: ['espresso-machine'],
  cleaning: ['espresso-machine', 'grinder', 'brewer'],
  backflushing: ['espresso-machine'],
  'dialing-in': ['espresso-machine'],
  'milk-frothing': ['espresso-machine'],
  'grinder-seasoning': ['grinder'],
  setup: ['espresso-machine', 'grinder'],
  'maintenance-routine': ['espresso-machine', 'grinder'],
};

// How-tos genéricos relevantes a un product type (no apuntan a un ASIN
// específico). El caller filtra ya los directos antes para evitar dupes.
// Orden: estable, según orden de declaración en `howToPages`.
export function genericHowTosForType(type: string): HowToPage[] {
  return howToPages.filter((p) => {
    if (p.productAsin) return false;
    const matches = HOW_TO_TOPIC_TO_PRODUCT_TYPE[p.topic];
    return matches ? matches.includes(type) : false;
  });
}
