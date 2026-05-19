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
    | 'maintenance-routine'
    | 'brew-technique'
    | 'accessory-use'
    | 'brewer-cleaning'
    | 'kettle-descaling'
    | 'pour-over-technique';
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
  /**
   * Ingredientes (coffee + water) cuando la guía es un brewing recipe.
   * Renderizado como Recipe-like extension en HowTo JSON-LD via
   * `recipeIngredient`. Solo aplica a pages tipo recipe (Hoffmann AeroPress,
   * Kasuya V60, etc.). Vacío para guías de mantenimiento.
   */
  recipeIngredient?: string[];
}

// Convertir "10 minutes" / "1 hour" / "2 minutes 30 seconds" a ISO 8601
// duration (PT10M / PT1H / PT2M30S). JSON-LD HowTo.totalTime requiere
// ISO 8601. Helper exportado para que el template lo use sin reimplementarlo.
// Soporta segundos para brewing recipes donde los segundos importan (V60,
// AeroPress) — sin segundos el output sería PT2M cuando el recipe es 2:30,
// rompiendo precisión SEO en rich snippet.
export function toIsoDuration(human: string): string {
  // Match patterns como "2 minutes 30 seconds", "30 seconds", "10 minutes",
  // "1 hour". Acepta forma singular y plural (minute / minutes).
  // El word boundary `\b` después del unit string corta antes del posible
  // sufijo "s" plural — necesario para que "minutes" matchee como "minute"
  // sin que el resto del regex (?!\w) descarte la match.
  const hourMatch = human.match(/(\d+)\s*(?:hours?|hrs?)\b/i);
  const minuteMatch = human.match(/(\d+)\s*(?:minutes?|mins?)\b/i);
  const secondMatch = human.match(/(\d+)\s*(?:seconds?|secs?)\b/i);

  if (!hourMatch && !minuteMatch && !secondMatch) return 'PT15M';

  let out = 'PT';
  if (hourMatch) out += `${parseInt(hourMatch[1], 10)}H`;
  if (minuteMatch) out += `${parseInt(minuteMatch[1], 10)}M`;
  if (secondMatch) out += `${parseInt(secondMatch[1], 10)}S`;
  return out;
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
  normcorePuckScreen: 'B08T9MZKVR',
  // Brewers + accessories para las recipe pages (AeroPress + V60 + pour-over).
  aeropress: 'B0047BIWSK',
  harioV60: 'B000P4D5HG',
  chemex: 'B0000YWF5E',
  kalitaWave: 'B00OQ80T9Y',
  bodumFrenchPress: 'B00005LM0L',
  timemoreC2: 'B086DM2MS3',
  acaiaPearlS: 'B0BC4FQDD1',
  moccamaster: 'B07S9WT5QR',
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
  // ============================================================
  // BREWER GENERICS — cleaning, kettle descaling, pour-over grind
  // ============================================================
  {
    slug: 'how-to-clean-manual-brewers',
    title: 'How to clean AeroPress, pour over, and French press brewers',
    description:
      'Universal cleaning routine for manual brewers: what immersion (AeroPress, French press) and percolation (V60, Chemex, Kalita) brewers each need, and what daily vs. monthly looks like.',
    topic: 'brewer-cleaning',
    intro:
      '<p>Manual brewers fall into two camps for cleaning purposes. Immersion brewers (AeroPress, French press, Clever Dripper) steep coffee for several minutes, so oils and fines coat the inside of the chamber and the filter housing. Percolation brewers (Hario V60, Chemex, Kalita Wave) only see water for 2-4 minutes and most of the residue stays in the paper filter — but the cone, glass, and any reusable mesh accumulate oil and stain.</p><p>The result: immersion brewers need a more thorough rinse after each use. Percolation brewers can survive a quick rinse most days, then a deeper monthly clean. Neither needs descaling (no boiler), neither needs special detergent for normal use.</p>',
    updatedAt: '2026-05-15',
    totalTime: '10 minutes',
    needs: [
      {
        item: 'Hot water (boiler kettle is fine)',
        note: 'No detergent for daily cleaning — coffee oils rinse off with hot water.',
      },
      {
        item: 'Mild, fragrance-free dish soap (for monthly deep clean only)',
        note: 'Strongly scented soaps leave residue that you will taste in the next brew. Skip dish soap day-to-day and reserve it for monthly cleaning.',
      },
      {
        item: 'Soft-bristle brush or non-scratch sponge',
        note: 'Avoid steel wool on plastic AeroPress chambers — micro-scratches collect oils and become hard to clean later.',
      },
      {
        item: 'Cafiza or oxygen-cleaner powder (monthly, for stained glass / mesh)',
        affiliateAsin: 'B00LWLBQH2',
        note: 'Cafiza is overkill for daily cleaning but works well for a monthly soak on Chemex carafes and reusable mesh filters that have stained.',
      },
    ],
    steps: [
      {
        heading: 'Daily — immersion brewers (AeroPress, French press)',
        body: '<p><strong>AeroPress:</strong> Eject the puck into the trash or compost, rinse the chamber and plunger under hot tap water. Wipe the rubber seal with a damp cloth — coffee oils sit on the seal and turn rancid if left for days. Air-dry inverted.</p><p><strong>French press:</strong> Dump spent grounds (do not pour down the sink — they clog drains). Disassemble the plunger fully (mesh filter, spiral plate, cross plate) and rinse each part separately. The mesh traps the most oil; a soft brush helps. Reassemble only when fully dry.</p>',
      },
      {
        heading: 'Daily — percolation brewers (V60, Chemex, Kalita)',
        body: '<p>Lift the wet filter cone and discard the paper filter with grounds (compost works for unbleached filters). Rinse the dripper and the receiving carafe with hot water. Wipe dry with a microfiber if you store it on display — air-drying water spots on glass Chemex is a cosmetic issue, not a brewing one.</p><p>If you use a reusable metal mesh filter (Able Kone, etc.), give it a quick brush under running water. Fines lodge in the mesh and slow flow rates over time.</p>',
      },
      {
        heading: 'Weekly — full disassembly and soap',
        body: '<p>Once a week, take everything apart and wash with a small drop of mild dish soap and a soft brush. Rinse 3+ times to clear all soap residue. Strong-smelling soap is the most common reason a clean brewer still tastes off — the soap smell transfers to the brew.</p><p>For AeroPress: pay attention to the rubber seal. If it has hardened, cracked, or stained dark, replace it ($5 from AeroPress directly or generic on Amazon). A stiff seal causes pressure leaks and uneven extraction.</p>',
      },
      {
        heading: 'Monthly — deep clean for glass and mesh',
        body: '<p>For stained Chemex carafes or yellowed mesh filters: dissolve 1 tsp Cafiza or oxygen-cleaner powder in 500 ml hot water, pour into the carafe / soak the mesh for 15-20 minutes. The brown stain lifts off without scrubbing. Rinse 3-4 times with clean water until no powder residue remains.</p><p>This is the only step where a dedicated coffee cleaner earns its place on a manual brewer. Day-to-day, plain hot water is enough.</p>',
      },
      {
        heading: 'Storage between uses',
        body: '<p>Store fully dry. Damp brewers — especially the AeroPress chamber pressed against its plunger and the inside of a sealed French press — grow mildew within a few days. Air-dry on a rack or upside down on a clean towel. For French presses, leave the plunger out of the carafe overnight.</p>',
      },
    ],
    commonMistakes: [
      'Putting the AeroPress rubber seal in a dishwasher — high heat and detergent harden the rubber and you will need a replacement seal within a year.',
      'Soaking the Chemex collar (wood + leather tie) — the wood swells and the leather darkens. Detach the collar before any soak.',
      'Using scented or "antibacterial" dish soap on any brewer. The fragrance transfers to the next brew.',
      'Storing a French press fully assembled while still damp. Mildew grows in the spiral filter plate within 3-5 days in a humid kitchen.',
    ],
    faqs: [
      {
        question: 'Can I put my AeroPress / V60 / Chemex in the dishwasher?',
        answer:
          'The plastic AeroPress is rated dishwasher-safe top rack, but the rubber seal degrades faster with dishwasher heat — hand-wash extends its life by 2-3x. Plastic V60s are dishwasher-safe. Glass and ceramic V60s and Chemex carafes (with the collar removed) are dishwasher-safe. Hand wash extends life of all of them.',
      },
      {
        question: 'My French press metal mesh is stained brown. Is that bad?',
        answer:
          'Cosmetic, not functional. The stain is coffee oil oxidation and does not affect taste if the mesh is clean of grounds. If it bothers you, soak the disassembled mesh in Cafiza solution for 20 minutes — it lifts off.',
      },
      {
        question: 'Does an AeroPress need to be cleaned differently from a French press?',
        answer:
          'Yes — the AeroPress has a rubber plunger seal that hardens with heat and detergent, so hand-wash it gently with cool-to-warm water. The French press has a stainless mesh that tolerates hot water and brushes without issue. Both are immersion brewers but the materials differ.',
      },
      {
        question: 'How often should I replace the AeroPress rubber seal?',
        answer:
          'When it stops sealing — usually 1-3 years of daily use, sooner if dishwashed. Symptoms: water leaks past the plunger during press, or the seal feels brittle/cracked. Genuine AeroPress seals are $5; ignore the cheaper aftermarket ones, they harden faster.',
      },
    ],
  },
  {
    slug: 'how-to-descale-kettle-for-pour-over',
    title: 'How to descale a gooseneck kettle or auto-drip brewer',
    description:
      'Descaling routine for gooseneck kettles (Fellow Stagg EKG, Bonavita) and auto-drip brewers (Moccamaster): when to do it, what solution, and how to avoid the residual citric taste.',
    topic: 'kettle-descaling',
    intro:
      '<p>Electric gooseneck kettles and auto-drip brewers (Moccamaster, Bonavita) develop limescale on the heating element in the same way an espresso machine does — except you can usually see it because the inside is accessible. White flakes in your brewed coffee, slower boil times, and a knocking sound during heat-up are the three signals.</p><p>Stovetop kettles need this too but it is simpler: any acidic descaler in the pot, simmer 10 minutes, rinse. Electric and auto-drip have heating elements with sensors that complicate the routine slightly — but only slightly.</p>',
    updatedAt: '2026-05-15',
    totalTime: '20 minutes',
    needs: [
      {
        item: 'Citric acid descaler or food-grade citric acid powder',
        affiliateAsin: 'B00LWLBQH2',
        note: 'Urnex Dezcal is overkill but works; food-grade citric acid (1 tbsp per 500 ml water) does the same chemistry at a fraction of the cost. Skip vinegar — leaves a lingering smell that takes 5+ rinses to clear.',
      },
      {
        item: 'Filtered water for the rinse cycle',
        note: 'Re-introducing hard tap water immediately negates the descale. If you are descaling, you presumably have hard water — descale and then commit to filtered water going forward.',
      },
      {
        item: 'Soft cloth for the kettle interior',
      },
    ],
    steps: [
      {
        heading: 'Cool and empty the kettle / brewer',
        body: '<p>Unplug. If hot, wait until the body is barely warm to the touch. Pour out any leftover water. For auto-drip brewers (Moccamaster), empty the carafe too — the descale solution will run through and fill it.</p>',
      },
      {
        heading: 'Mix the descaler solution',
        body: '<p>For a 1 L kettle: 1 tbsp food-grade citric acid OR 1 sachet Urnex Dezcal in 750 ml of cool filtered water. Stir until dissolved. Pour into the kettle (or into the water tank of an auto-drip).</p><p>Do not exceed the dosage — stronger does not descale faster, it just requires more rinse cycles to remove.</p>',
      },
      {
        heading: 'Heat to a full boil (kettle) or run a brew cycle (auto-drip)',
        body: '<p><strong>Kettle:</strong> Bring the solution to a full boil. Switch off. Let it sit covered for 15 minutes. The contact time is what does most of the descaling work; the boil just speeds up the reaction.</p><p><strong>Auto-drip (Moccamaster):</strong> Run a normal brew cycle with the solution. When it finishes, do not pour it out — turn the warmer plate off, leave the solution in the carafe and the brew basket, and let it sit for 15 minutes. Some Moccamaster owners then pour the solution back into the water tank and run a second cycle for stubborn scale.</p>',
      },
      {
        heading: 'Discard solution and inspect',
        body: '<p>Pour out the descaler. Look at the heating element / inside surface — scale should be visibly reduced. If heavy flakes remain, repeat with a fresh batch of solution. Some kettles need 2 cycles the first time after a year of no descaling.</p><p>Wipe the inside gently with a soft cloth. Do not use anything abrasive on the heating element.</p>',
      },
      {
        heading: 'Rinse — at least 2 cycles with clean filtered water',
        body: '<p>Refill with clean filtered water to the MAX line. <strong>Kettle:</strong> boil and discard. Repeat at least once. Smell the water before pouring out — if it has any citrus / acidic note, run another cycle. <strong>Auto-drip:</strong> run 2 full brew cycles with clean water through the empty basket. Discard.</p><p>This is the step most owners shortcut — and then the next brew tastes weirdly citric. Two rinse cycles minimum; three is safer.</p>',
      },
      {
        heading: 'Set a maintenance interval',
        body: '<p>For hard water (>10 grains/gallon): every 1-2 months. For filtered or soft water: every 6 months. Marking the date on the kettle base or the carafe with a small sticker is easier than remembering — most owners forget until the kettle gets noticeably slow.</p>',
      },
    ],
    commonMistakes: [
      'Using white vinegar — the acetic smell takes 5+ rinse cycles to clear and lingers in the rubber seal of auto-drip carafes. Citric acid is the equivalent chemistry without the smell.',
      'Skipping the rinse cycles. Residual citric acid in your morning brew tastes harsh and acidic — easy to confuse with "bad coffee" when it is actually descaler residue.',
      'Descaling a hot kettle immediately after use. Thermal shock weakens the heating element seal. Wait until the kettle is barely warm.',
      'Forgetting to descale the Moccamaster brew basket and shower head. The whole water path scales up, not just the boiler — soak removable parts in the same solution after the cycle.',
    ],
    faqs: [
      {
        question: 'How do I know when my kettle needs descaling?',
        answer:
          'Three signs: visible white flakes in the boiled water, audible knocking or thunking during heat-up (scale insulates the heating element, causing uneven heat transfer), or boil time increasing by more than 20% versus when the kettle was new. Any one of these = time to descale.',
      },
      {
        question: 'Can I use the same descaler for my kettle and my espresso machine?',
        answer:
          'Yes — citric or lactic acid descalers (Urnex Dezcal, etc.) work for both. The dose may differ; follow the product instructions for the appliance. Vinegar is to be avoided for both.',
      },
      {
        question: 'Does the Moccamaster have an auto-descale cycle?',
        answer:
          'No — unlike many super-automatic espresso machines, the Moccamaster has no electronic descale mode. You run the descaler through manually as a normal brew cycle. Technivorm recommends every 100 brews for hard water.',
      },
      {
        question: 'Will descaling damage my kettle if I do it too often?',
        answer:
          'Over time, very frequent descaling (every week) can erode the protective oxide layer on the heating element. Stick to every 1-6 months depending on water hardness. There is no benefit to descaling on a "preventive" schedule when no scale has built up.',
      },
    ],
  },
  {
    slug: 'how-to-dial-grind-pour-over',
    title: 'How to dial in grind size for pour over (V60, Chemex, Kalita)',
    description:
      'How to find the right grind size for pour over: target brew time, what too coarse and too fine taste like, and the single-variable adjustment process that converges in 3-5 brews.',
    topic: 'pour-over-technique',
    intro:
      '<p>Pour-over coffee is more forgiving than espresso but less forgiving than people assume. The difference between a balanced V60 and a thin, sour or harsh, bitter cup is often one or two grinder clicks. The good news: once you have a starting recipe, you only re-dial when the bean changes — beans are the dominant variable, the brewer is not.</p><p>The dial-in process is identical across V60, Chemex, and Kalita. Target a brew time, observe whether the actual time is over or under, adjust grind in one direction, repeat. The only difference between brewers is that Chemex uses a thicker paper filter which slows flow — so for the same bean you grind coarser on Chemex than on V60.</p>',
    updatedAt: '2026-05-15',
    totalTime: '15 minutes',
    needs: [
      {
        item: 'A grinder with usable medium-coarse settings',
        note: 'Most burr grinders work. Blade grinders cannot produce a consistent particle distribution and pour-over will be muddy.',
      },
      {
        item: '0.1 g scale',
      },
      {
        item: 'Timer',
        note: 'Phone is fine.',
      },
      {
        item: 'Gooseneck kettle (for controlled pour)',
        affiliateAsin: 'B0BVYGZG6T',
        note: 'A normal kettle works too — the gooseneck just makes the pour easier to control. If you already have a kettle, skip this until you are comfortable with the rest of the process.',
      },
      {
        item: 'Fresh beans (5-30 days post-roast)',
        note: 'Beans outside this window will not dial in cleanly. Buy fresh first, then dial.',
      },
    ],
    steps: [
      {
        heading: 'Pick a target brew time for your brewer',
        body: '<p>Standard starting targets, total brew time (first pour to last drip):</p><ul><li><strong>V60 (15 g dose):</strong> 2:30 to 3:00</li><li><strong>V60 (30 g dose):</strong> 3:30 to 4:00</li><li><strong>Chemex (6 cup, 40 g dose):</strong> 4:30 to 5:30</li><li><strong>Kalita Wave 185 (25 g dose):</strong> 3:30 to 4:00</li></ul><p>These are ranges, not laws. Stick with one target for your dial-in session.</p>',
      },
      {
        heading: 'Use a 1:16 starting ratio',
        body: '<p>Coffee-to-water ratio for pour over: 1:15 to 1:17 is the typical range. Start at 1:16 — for 20 g of coffee, that is 320 g of water. Variation by ±1 changes strength but not whether the grind is right.</p>',
      },
      {
        heading: 'Brew with your existing grind setting',
        body: '<p>Whatever grind you have now, use it as the starting point. Set the kettle to 200°F (96°C), wet the filter, dose your coffee, level the bed. Pour in your usual schedule (bloom + 2-3 main pours typical). Start the timer when water first touches the grounds, stop it when the last drip falls.</p>',
      },
      {
        heading: 'Read the result by time and taste',
        body: '<p>Three outcomes:</p><ul><li><strong>Brew finished too fast</strong> (e.g. 2:00 on a V60 target of 2:45): grind is too coarse. The cup will taste thin, sour, watery.</li><li><strong>Brew finished too slow</strong> (e.g. 4:00 on the same target): grind is too fine. The cup will taste muddy, bitter, harsh.</li><li><strong>Brew finished in target</strong>: taste it. Balanced = done. Sour-leaning = grind slightly finer. Bitter-leaning = grind slightly coarser.</li></ul>',
      },
      {
        heading: 'Adjust one click at a time',
        body: '<p>Move the grinder 1 step finer or coarser. Brew again with the same dose, ratio, water temp, and pour schedule. Time and taste. Repeat. Most dial-ins converge in 3-5 brews; novel beans on a familiar grinder converge in 2.</p><p>Resist the temptation to change multiple variables. Same pour schedule, same dose, same water temp — only grind changes.</p>',
      },
      {
        heading: 'Lock the recipe; re-dial only when the bean ages or changes',
        body: '<p>Once a recipe lands, note the grinder setting plus the bean + roast date. As the bag ages past 3 weeks, you may need 1 step coarser as CO₂ off-gasses. New bag of the same bean from a new roast date = re-dial from scratch (faster the second time).</p>',
      },
    ],
    commonMistakes: [
      'Changing dose, water temp, and grind on the same brew. With three variables moving you have no signal — fix two, change one.',
      'Dialing in with stale beans (>6 weeks past roast). The grind window narrows so much that nothing tastes good. Get fresh beans first.',
      'Confusing slow brew time with strong coffee. A slow drip can be over-extracted and bitter, not "strong." Strength = ratio. Time tells you about extraction.',
      'Using boiling water from a kettle just off the heat. 212°F over-extracts most light-roast pour over. Aim for 195-205°F (90-96°C).',
    ],
    faqs: [
      {
        question: 'Do I really need a gooseneck kettle for pour over?',
        answer:
          'No, especially when you are starting. A regular kettle pour with practice works for V60 and Chemex. The gooseneck makes the bloom and concentric pour easier to control, which improves consistency once you have the rest dialed in. Add it after you have nailed grind and ratio.',
      },
      {
        question: 'What grind setting on my Comandante / Encore should I start with?',
        answer:
          'Comandante for V60: 22-26 clicks. Chemex: 28-32. Baratza Encore for V60: setting 18-22. Chemex: 22-26. These are starting points only — your bean and water will shift you ±2 from there.',
      },
      {
        question: 'My pour over tastes muddy. Is that the grind?',
        answer:
          'Often, yes — too fine creates fines that clog the filter, slow the brew, and over-extract. Try 1 step coarser. If muddy persists at a coarse grind, the issue is fines from a low-quality grinder, not the dial-in.',
      },
      {
        question: 'How do I know when to stop dialing in and just enjoy the cup?',
        answer:
          'When two consecutive brews land in the target time window and taste balanced (not sour, not bitter, not flat). Beyond that, micro-adjustments are diminishing returns — you are tasting the bean, not the dial-in.',
      },
    ],
  },
  // ============================================================
  // ACCESSORY GENERICS — knock box, WDT
  // ============================================================
  {
    slug: 'how-to-use-knock-box',
    title: 'How to use a knock box without scratching your portafilter',
    description:
      'Knock box technique: where to position it, how hard to strike, and the common mistakes that bend portafilter ears or chip the rubber knock bar.',
    topic: 'accessory-use',
    intro:
      '<p>A knock box looks simple — a container with a rubber-padded bar across the top where you tap out spent espresso pucks. The mistake most new owners make is treating it as a strength exercise. The puck is held in by friction against the basket walls; a moderate knock against the bar is enough to release it. Hitting harder bends portafilter ears, splits the rubber, or sprays grounds.</p><p>Knock box selection matters less than you would think. The cheapest plastic boxes work; the upgrade to a metal box with rubber feet is about durability and counter stability, not function. Drawer-mounted knock boxes solve a counter-space problem but introduce a hygiene problem (grounds trapped in a closed drawer get musty).</p>',
    updatedAt: '2026-05-15',
    totalTime: '5 minutes',
    needs: [
      {
        item: 'A knock box with a sturdy rubber knock bar',
        affiliateAsin: 'B005MMJZ22',
        note: 'Mini knock boxes (counter-top) work for home setups; full-size only matters if you are pulling 10+ shots a day. Look for a knock bar that is replaceable — the rubber wears in 1-2 years.',
      },
      {
        item: 'A stable counter surface',
        note: 'Knock boxes with non-slip rubber feet are worth the extra $5. Otherwise the box slides on smooth counters and you end up gripping it with your free hand, which slows the workflow.',
      },
    ],
    steps: [
      {
        heading: 'Position the knock box close to the machine',
        body: '<p>Within arm reach of the group head, between you and the sink. The workflow is: pull shot, lift portafilter, walk 2 steps with a heavy steaming basket, knock, rinse, dry, reload. Each extra step is friction in the routine and weekly cleanings get skipped because the workflow is fiddly.</p>',
      },
      {
        heading: 'Hold the portafilter at the right angle',
        body: '<p>The portafilter handle pointing roughly 45 degrees above the knock bar. The spouts (or bottomless face) angled away from you. Grip near the handle base — not at the end. You want leverage but not a windup.</p>',
      },
      {
        heading: 'Knock the basket edge — not the portafilter body',
        body: '<p>Strike the rubber bar with the rim of the basket, not the portafilter body. The basket edge is steel, designed to take impact. The portafilter body is the part with ears that bend if struck repeatedly. A single firm tap usually releases the puck; if it does not, a second tap rather than escalating force.</p><p>Listen for the puck dropping. If it does not, the puck is wet and stuck — use a spoon or finger to push it out, do not hit harder.</p>',
      },
      {
        heading: 'Inspect and wipe the basket',
        body: '<p>After the puck drops, peer into the basket. Residual grounds at the bottom (the "dry layer" some pucks leave) just need a tap on the bar to dislodge. Wipe the basket dry with a microfiber cloth before reloading — water in the basket affects the next shot.</p>',
      },
      {
        heading: 'Empty the knock box before it is overflowing',
        body: '<p>Spent grounds stay wet for 1-2 days. A knock box at the top of its capacity weighs significantly more than empty and the rubber bar can detach if you knock against an overfull box. Empty into compost or trash daily — used coffee grounds make decent compost feedstock.</p>',
      },
    ],
    commonMistakes: [
      'Hitting the portafilter body against the knock bar instead of the basket rim. Bends the ears over time, eventually preventing lock-in. The ears are not easily repairable — you replace the whole portafilter.',
      'Using too much force on a stuck puck. Wet pucks need to be pushed out with a finger or spoon, not knocked harder. Splitting the knock bar is a common DIY repair on cheap knock boxes.',
      'Letting the knock box overflow. Heavy + wet = the box tips or the knock bar pops off mid-knock.',
      'Storing a sealed knock box (drawer-mounted, lid on) with grounds inside for more than a day. Mildew develops within 48 hours in a humid kitchen.',
    ],
    faqs: [
      {
        question: 'Are expensive knock boxes worth it?',
        answer:
          'Slightly. The $40-80 metal-body knock boxes (Joe Frex, Espro, Cafelat) have stiffer rubber bars and non-slip feet that improve workflow marginally. The cheapest $15 plastic boxes work fine; you pay for durability and counter aesthetics, not function.',
      },
      {
        question: 'Can I use a regular trash can instead of a knock box?',
        answer:
          'Technically yes, but you will damage your portafilter against the rigid trash can rim. The knock box bar is a rubberized cushion specifically there to prevent that. If you cannot justify $15 for a knock box, wrap a sturdy rubber band around the rim of a tin can — better than nothing.',
      },
      {
        question: 'My knock bar is splitting. Can I replace just the bar?',
        answer:
          'On Joe Frex, Cafelat, and most $30+ knock boxes — yes, the bar is a $5-10 replacement part. On the cheapest plastic models the bar is glued in place; replace the whole unit at that point.',
      },
      {
        question: 'Where should I put the knock box if my counter is small?',
        answer:
          'A drawer-mounted knock box (slides into a built-in drawer) keeps the counter clear but requires daily emptying for hygiene. Mini counter-top knock boxes (4-5 inches across) take little space. Avoid the under-machine knock-box drawer setups — the rubber bar tends to crack from the constant flexing.',
      },
    ],
  },
  {
    slug: 'how-to-use-wdt-tool',
    title: 'How to use a WDT tool: Weiss Distribution Technique step by step',
    description:
      'How to use a WDT tool correctly: needle depth, stir pattern, when WDT helps vs. when it does not, and the technique mistakes that make WDT pointless.',
    topic: 'accessory-use',
    intro:
      '<p>WDT (Weiss Distribution Technique) is the single highest-ROI accessory for home espresso after a scale. The idea: ground coffee falling from a grinder lands in clumps and uneven piles inside the basket. A few fine needles stirred gently through the grounds break up the clumps and even the density across the basket. Water then flows evenly through the puck during extraction, not through whichever pocket has the least resistance.</p><p>The technique is simple and the tool is $15-25. The mistake most owners make is treating WDT like a strong mix — stirring aggressively, going too deep, or compacting the grounds before tamping. Done right, WDT is light, fast, and consistent.</p>',
    updatedAt: '2026-05-15',
    totalTime: '5 minutes',
    needs: [
      {
        item: 'A WDT tool with fine needles (0.3-0.4 mm diameter)',
        affiliateAsin: 'B09QV3RTBN',
        note: 'B Plus and Normcore both work. Needle diameter matters more than handle material — thicker needles (>0.5 mm) push grounds aside rather than separate them, and the result is incomplete declumping.',
      },
      {
        item: 'A basket the right size for your portafilter',
        note: '54mm for Breville Bambino / Touch line; 58mm for prosumer machines. Stock baskets work; precision baskets (VST, IMS) work better but WDT improves both.',
      },
    ],
    steps: [
      {
        heading: 'Dose into the basket as usual',
        body: '<p>Grind directly into the basket (or use a dosing funnel / cup if your grinder retains poorly). The grounds will land in clumps and uneven mounds — that is exactly what WDT will fix. Do not pre-tamp or shake the basket to settle the grounds before WDT; you want them loose for the stir.</p>',
      },
      {
        heading: 'Lower the needles in, vertical',
        body: '<p>Hold the WDT tool perpendicular to the basket. Lower the needles until the tips just touch the basket bottom, then lift 1-2 mm so they are not dragging on the steel mesh. The needles go through the full depth of the bed.</p>',
      },
      {
        heading: 'Stir in a slow, controlled pattern',
        body: '<p>30-60 seconds of stirring. The exact pattern matters less than coverage: small circles working outward from the center, then a few diagonal sweeps to break up edge clumps. Move the tool, not just the needles — you want every cubic millimeter of the bed touched.</p><p>The stir should be gentle. You are separating clumps, not whisking the grounds. Aggressive stirring throws grounds out of the basket and packs the bed unevenly.</p>',
      },
      {
        heading: 'Lift the tool straight up and tap the basket',
        body: '<p>Lift the WDT tool vertically out of the basket. Any grounds clinging to the needles, tap them back into the basket. Then tap the bottom of the portafilter on the counter or palm 1-2 times — this settles the surface flat without compressing.</p><p>Do not skip the tap. WDT leaves the surface bumpy; the tap evens it for an even tamp.</p>',
      },
      {
        heading: 'Tamp level and lock in',
        body: '<p>Tamp with 15-20 lbs of even downward pressure. The puck should be level and dense. Lock the portafilter into the group head and pull as normal.</p><p>If you pull with a bottomless portafilter, compare to your pre-WDT extractions: the difference is dramatic. Before WDT you see spritzers and uneven streams; after WDT you should see a single steady column from the basket center.</p>',
      },
    ],
    commonMistakes: [
      'Stirring too aggressively — throws grounds out of the basket, creates static, and ironically reintroduces uneven density. Slow and steady wins.',
      'Using needles thicker than 0.5 mm. They push grounds aside rather than separate clumps. Look for 0.3-0.4 mm needles, ideally 6-8 of them.',
      'Pre-tamping or tapping the basket BEFORE WDT. Compresses the clumps so the needles cannot break them up. WDT first, then settle, then tamp.',
      'Treating WDT as a tamping replacement. The WDT distributes; the tamp levels and densifies. You need both — neither replaces the other.',
    ],
    faqs: [
      {
        question: 'Do I actually need WDT or is it overhyped?',
        answer:
          'For home espresso with home grinders (which all clump to some degree), WDT is essentially mandatory if you want consistent shots. The community consensus on r/espresso and home-barista has held for 3+ years. The exception: high-end commercial grinders (Mythos, Mahlkönig EK43) produce so little clumping that pro baristas can skip WDT — but no home grinder is in that category.',
      },
      {
        question: 'Can I use a paperclip or sewing needle as a DIY WDT tool?',
        answer:
          'For a single test, yes. As a daily tool, no — single-needle DIY tools take 3-4x longer to stir the basket evenly, and the inconsistency adds variance to your shots. A real WDT tool with 6-8 needles is $15-25 and pays itself off in saved time within a month.',
      },
      {
        question: 'How deep should the WDT needles go?',
        answer:
          'Full depth of the puck, just shy of touching the basket mesh. The clumps at the bottom of the basket matter as much as the ones at the top — partial-depth WDT only fixes half the problem.',
      },
      {
        question: 'My shots still channel after WDT — what am I doing wrong?',
        answer:
          'Three most likely causes: (1) the WDT needles are too thick (>0.5 mm), so clumps are not actually breaking up; (2) the tamp is uneven (one side lower) — easy to spot by looking at the puck after the shot; (3) the dose is wrong for the basket. Channeling almost always traces back to one of these. See our channeling-fix-espresso troubleshoot for the full diagnostic.',
      },
    ],
    relatedTroubleshootSlugs: ['channeling-fix-espresso'],
  },
  // ============================================================
  // BREWING RECIPES — AeroPress + V60 + cross-method
  // Recipes atribuidas a sus autores originales (Hoffmann, Kasuya).
  // Anti-gray-hat: NO claim como "our exclusive recipe". Times y
  // gramos verificados contra los videos originales / artículos del
  // World AeroPress Championship.
  // ============================================================
  {
    slug: 'james-hoffmann-aeropress-recipe',
    title: "James Hoffmann's AeroPress recipe (the ultimate cup)",
    description:
      "James Hoffmann's AeroPress recipe: 11 g coffee, 200 g water at 100°C, 2-minute brew. Step-by-step times, grind, swirl, and the no-pressure press that defines this method.",
    productAsin: 'B0047BIWSK',
    topic: 'brew-technique',
    intro:
      '<p>James Hoffmann\'s "Ultimate AeroPress recipe" video (YouTube, 2020) is the most-watched AeroPress tutorial online. The recipe itself is deliberately simple: 11 g of coffee, 200 g of water just off the boil, a 2-minute steep, swirl, then a slow press. No inverted method, no plunger acrobatics. Hoffmann\'s position is that the AeroPress rewards consistency over complexity — and this recipe is hard to brew badly.</p><p>Use this as your default AeroPress recipe before exploring inverted method or championship variations. It works across a wide range of grinders and roasts, and it scales cleanly to 14 g / 250 g if you want a slightly larger cup.</p><p>Source: <em>James Hoffmann, "The Ultimate AeroPress Recipe" (YouTube, 2020)</em>. We are not affiliated with Hoffmann; we cite the recipe to attribute it correctly.</p>',
    updatedAt: '2026-05-15',
    totalTime: '3 minutes',
    recipeIngredient: [
      '11 g medium-roast coffee, ground medium-fine (slightly coarser than table salt)',
      '200 g water at 100°C / 212°F',
    ],
    needs: [
      {
        item: 'AeroPress (original or Clear)',
        affiliateAsin: 'B0047BIWSK',
        note: 'Hoffmann brews on the original AeroPress in the video. The Clear and Go variants behave identically for this recipe.',
      },
      {
        item: 'Paper AeroPress filter',
        note: 'A single standard paper filter. Hoffmann does not advocate for premium or metal filters here — generic paper is fine.',
      },
      {
        item: 'Kettle (gooseneck not required)',
        affiliateAsin: 'B0BVYGZG6T',
        note: 'A regular kettle works. The pour does not need precise stream control — gooseneck is a nice-to-have, not a requirement for this recipe.',
      },
      {
        item: '0.1 g coffee scale',
        affiliateAsin: 'B0BC4FQDD1',
        note: 'You only need ±1 g accuracy for this recipe. A $30 scale is fine — the $200 Acaia is overkill for AeroPress beginners.',
      },
      {
        item: 'Burr grinder',
        affiliateAsin: 'B086DM2MS3',
        note: 'Medium-fine grind. A hand grinder like the Timemore C2 or a Baratza Encore handles this perfectly. Pre-ground works in a pinch but loses brightness within hours.',
      },
    ],
    steps: [
      {
        heading: 'Set up the AeroPress in the standard (upright) orientation',
        body: '<p>Insert one paper filter into the cap. Rinse the filter with hot water — this removes the paper taste and pre-heats the cap. Discard the rinse water. Screw the cap onto the chamber and place the assembled AeroPress on top of your mug or server.</p><p>Hoffmann uses the standard orientation, not inverted. The recipe is designed around it.</p>',
      },
      {
        heading: 'Dose 11 g of coffee at a medium-fine grind',
        body: '<p>Grind 11 g of coffee at a medium-fine setting — slightly coarser than table salt, finer than pour-over grind. On a Comandante: roughly 18-22 clicks. On a Baratza Encore: setting 12-15. On a Timemore C2: 16-18 clicks.</p><p>Pour the grounds into the AeroPress chamber.</p>',
      },
      {
        heading: 'Pour 200 g of water at 100°C, starting your timer at first contact',
        body: '<p>Bring water to a full boil. The recipe calls for 100°C / 212°F — fresh off the boil is correct here. Hoffmann notes that lower temperatures dull the cup; 100°C is intentional.</p><p>Start your timer the moment water touches the grounds. Pour 200 g in roughly 10-15 seconds, aiming for an even saturation. The chamber will be nearly full.</p>',
      },
      {
        heading: 'Steep for 2 minutes',
        body: '<p>Set the timer for 2:00 from first water contact. Walk away — no stirring, no agitation. The grounds settle, the bed compacts slightly, and the extraction proceeds quietly.</p><p>This is deliberately a "set it and forget it" steep. The simplicity is the point.</p>',
      },
      {
        heading: 'Swirl at 2:00 to settle the bed',
        body: '<p>At 2:00, pick up the AeroPress and give it a gentle swirl — a circular motion to settle any grounds clinging to the upper chamber walls back into the slurry. One or two rotations, no shaking.</p>',
      },
      {
        heading: 'Press slowly — 30-60 seconds total',
        body: '<p>Insert the plunger and press straight down with very light pressure. Hoffmann\'s emphasis is on a slow, low-pressure press. The whole press should take 30-60 seconds. If you hit resistance, do not force it — back off and let the bed relax for a second.</p><p>Stop pressing when you hear the hissing sound (air pushing through the puck). Pulling further extracts harsh, dry flavours from the spent grounds.</p>',
      },
      {
        heading: 'Serve immediately',
        body: '<p>The cup is 200 ml of strong, balanced coffee. Drink as-is, or dilute with hot water (50-100 g) to taste — Hoffmann notes that a bypass of clean water lengthens the cup without diluting flavour structure.</p>',
      },
    ],
    commonMistakes: [
      'Pressing too hard or too fast — the AeroPress can be pushed in 10 seconds, but you over-extract bitter compounds from the puck. Hoffmann\'s 30-60 second press is intentional.',
      'Using cold or warm water "to avoid over-extraction" — this recipe is calibrated for 100°C. Below 90°C the cup tastes flat and underdeveloped.',
      'Grinding too fine because "AeroPress = espresso-ish". Medium-fine, not espresso-fine. Too fine and the press requires excessive force and the cup turns muddy.',
      'Pulling the plunger past the hiss — you extract dry, papery flavour from a spent puck. Stop when you hear air.',
    ],
    faqs: [
      {
        question: 'Can I scale this recipe up to a bigger cup?',
        answer:
          'Hoffmann\'s scaled version is 14 g coffee + 250 g water, same 2:00 steep and slow press. Beyond that, the AeroPress chamber runs out of headroom — for a larger cup, brew the standard recipe and dilute with hot water rather than over-filling.',
      },
      {
        question: 'Do I need to weigh the water, or can I eyeball 200 ml?',
        answer:
          'A scale gives consistency, but for this recipe ±10 g of water is barely perceptible. If you do not own a scale, fill to roughly 2 cm below the top of the chamber and you are close enough. Coffee weight matters more than water — get a 0.1 g scale for the 11 g if you can.',
      },
      {
        question: 'Why standard orientation and not inverted?',
        answer:
          'Hoffmann argues the inverted method adds risk (spills, burns) without proportional flavour gain at this dose. The recipe is designed to work without inversion. If you prefer inverted, our separate guide on the AeroPress inverted method covers when it actually helps.',
      },
      {
        question: 'What grind works best with this recipe?',
        answer:
          'Medium-fine — coarser than espresso, finer than pour-over. If you taste sour or weak, grind slightly finer. If muddy or harsh, slightly coarser. The recipe tolerates ±2 grinder settings before falling apart.',
      },
      {
        question: 'Does roast level matter?',
        answer:
          'Medium roast is the original recipe. Light roasts benefit from grinding 1-2 settings finer and steeping 30 seconds longer to develop. Dark roasts work as written but you may prefer a slightly coarser grind to avoid heavy bitterness.',
      },
    ],
  },
  {
    slug: 'aeropress-inverted-method',
    title: 'AeroPress inverted method: what it is, why people use it, step-by-step',
    description:
      'The AeroPress inverted method explained: extended steep without dripping, when it actually improves the cup, and the safe flip technique that does not spill.',
    productAsin: 'B0047BIWSK',
    topic: 'brew-technique',
    intro:
      '<p>The inverted (or "upside-down") AeroPress method puts the brewer plunger-down on the counter, with the filter cap attached at the end. Water and grounds steep together in a sealed chamber with no dripping through the filter until you flip the assembly and press. The technique was popularised by competition baristas in the early 2010s — Tetsu Kasuya\'s 2016 World AeroPress Championship recipe uses it.</p><p>Why do it: extended steeps (3-5 minutes) without losing brew water through the filter, and stronger control over total contact time. When it is not worth the trouble: short steeps (under 2 minutes), where the standard orientation is simpler and produces a comparable cup. Hoffmann\'s own ultimate recipe is standard orientation precisely for this reason.</p>',
    updatedAt: '2026-05-15',
    totalTime: '4 minutes',
    needs: [
      {
        item: 'AeroPress',
        affiliateAsin: 'B0047BIWSK',
        note: 'The original and Clear models work identically for inverted brewing. The AeroPress Go has a shorter chamber and slightly less stable inverted footprint — workable but less comfortable.',
      },
      {
        item: 'Paper AeroPress filters',
      },
      {
        item: 'Kettle',
        affiliateAsin: 'B0BVYGZG6T',
        note: 'Any kettle. A gooseneck helps with even saturation but is not required.',
      },
      {
        item: 'Coffee scale',
        affiliateAsin: 'B0BC4FQDD1',
      },
      {
        item: 'Sturdy heat-resistant cup or server for the flip target',
        note: 'The cup needs to be at least as wide as the AeroPress cap (~6 cm) and stable. A wobbly cup is how spills happen during the flip.',
      },
    ],
    steps: [
      {
        heading: 'Push the plunger into the chamber, then invert the assembly',
        body: '<p>Insert the plunger about 1-2 cm into the chamber — far enough to create a seal, not so far that you lose dose capacity. The plunger seal grips the chamber wall and holds the inverted assembly stable on the counter.</p><p>Flip the assembly so the plunger end is down on the counter and the open chamber points up. The plunger acts as the base. Do this with empty AeroPress before adding water or coffee, so you can verify the seal is holding without consequence if it slips.</p>',
      },
      {
        heading: 'Add coffee dose to the chamber',
        body: '<p>Dose your coffee directly into the open chamber. Typical inverted dose is 14-18 g for a stronger cup (Kasuya championship recipe uses 18 g; Hoffmann\'s scaled inverted variant uses 15 g).</p><p>Tap the chamber lightly to level the grounds.</p>',
      },
      {
        heading: 'Pour water and start the timer',
        body: '<p>Pour water at 85-95°C (depending on recipe) into the chamber. The water must not exceed the rim — there is no escape path until you press. Standard pour: 220-250 g over 10-15 seconds.</p><p>Start your timer at first water contact.</p>',
      },
      {
        heading: 'Stir gently and steep',
        body: '<p>Give the slurry 2-3 gentle stirs to ensure all grounds are saturated. Stop stirring — agitation past initial wetting introduces fines and over-extraction.</p><p>Steep for the time your recipe calls for — typically 2:00 to 3:00 in inverted mode. The grounds float to the top after a minute or so, which is normal.</p>',
      },
      {
        heading: 'Wet the filter and attach the cap',
        body: '<p>Pre-rinse a paper filter in hot water (separate from the AeroPress) to remove paper taste. Place it in the filter cap. About 30 seconds before the steep ends, screw the wet cap onto the inverted chamber. Do this with the AeroPress still sitting on the counter — no need to lift it.</p><p>Screw firmly but do not overtighten — overtightening cracks the cap thread over time.</p>',
      },
      {
        heading: 'Flip and press',
        body: '<p>The critical move: place your serving cup or carafe over the filter cap, hold both with one hand on the AeroPress body and one hand on the cup, then flip the whole assembly in one steady motion. The plunger is now up, the filter cap rests on the cup.</p><p>Press slowly — 20-30 seconds. Stop when you hear the hiss of air escaping. The plunger should not bottom out hard.</p>',
      },
      {
        heading: 'Discard the puck and clean',
        body: '<p>Unscrew the cap, push the plunger fully to eject the puck into your compost or trash, rinse the rubber seal and chamber under hot water. The AeroPress cleans in 20 seconds — this is one of its main practical advantages over French press.</p>',
      },
    ],
    commonMistakes: [
      'Flipping the assembly without holding both cup and AeroPress together — the cap can unscrew mid-flip and the whole slurry ends up on the counter. Two hands, firm grip, one motion.',
      'Filling the chamber past the rim — the meniscus needs room to dome. Overfilling spills when you screw on the cap.',
      'Pressing too hard after the hiss — extracts harsh, papery flavours from the spent puck.',
      'Using inverted method for a 1-minute steep where standard orientation works fine. Inverted is for extended steeps; for short ones it is just extra risk.',
    ],
    faqs: [
      {
        question: 'Is inverted method actually better than standard?',
        answer:
          'For most home users, no. Hoffmann\'s standard-orientation recipe produces a cup most people cannot distinguish from a comparable inverted brew. Inverted shines for extended steeps (3-5 minutes) and competition recipes where every variable is controlled. For daily brewing, start with standard.',
      },
      {
        question: 'Can the AeroPress fall over while inverted?',
        answer:
          'Yes, if the plunger seal slips or the counter is uneven. Set it on a flat, dry surface and check the seal is firm before adding coffee or water. The Clear AeroPress has slightly more friction on the seal — marginally more stable than the original.',
      },
      {
        question: 'What is the safest way to flip without burning my hand?',
        answer:
          'Hold the AeroPress body (not the cap), brace the cup on top with your other hand, and flip in one smooth motion. The water inside is hot but contained. Slow, deliberate flips are safer than fast ones.',
      },
      {
        question: 'Should I use a metal or paper filter inverted?',
        answer:
          'Paper is the default and Kasuya\'s championship recipe uses paper. Metal filters change the body and let more fines through — try one or the other, but do not chase the marginal difference. Paper is fine.',
      },
    ],
  },
  {
    slug: 'tetsu-kasuya-aeropress-championship-recipe',
    title: "Tetsu Kasuya's AeroPress championship recipe (World Champion 2016)",
    description:
      "Tetsu Kasuya's 2016 World AeroPress Championship recipe: 22 g coffee, 200 g water with bypass dilution, 3:30 total. The inverted method that won and how to reproduce it at home.",
    productAsin: 'B0047BIWSK',
    topic: 'brew-technique',
    intro:
      '<p>Tetsu Kasuya won the 2016 World AeroPress Championship with a recipe that surprised the room: 22 g of coffee, only 50 g of water steeped in the AeroPress, then 130 g of bypass water added after the press. The technique decouples extraction from final dilution — you brew a strong concentrate, then dilute to taste.</p><p>Kasuya later codified the underlying logic in his "4:6 method" for V60. The principle: water added before extraction defines strength; water added after defines clarity. The AeroPress recipe is the same idea, applied to a different brewer.</p><p>Source: <em>World AeroPress Championship 2016 official recipe, posted at worldaeropresschampionship.com</em>. We cite to attribute, not to claim authorship.</p>',
    updatedAt: '2026-05-15',
    totalTime: '3 minutes 30 seconds',
    recipeIngredient: [
      '22 g coffee, ground medium-fine',
      '50 g water at 80°C for the AeroPress steep',
      '130 g water at 80°C added as bypass after pressing',
    ],
    needs: [
      {
        item: 'AeroPress',
        affiliateAsin: 'B0047BIWSK',
      },
      {
        item: 'Paper AeroPress filter',
        note: 'Pre-rinse with hot water before brewing — competition recipes assume rinsed paper.',
      },
      {
        item: 'Kettle (gooseneck preferred for the small initial pour)',
        affiliateAsin: 'B0BVYGZG6T',
        note: 'The 50 g initial pour is small enough that pour control matters. A gooseneck helps; a regular kettle works with care.',
      },
      {
        item: '0.1 g scale',
        affiliateAsin: 'B0BC4FQDD1',
        note: 'Worth using a precise scale for this recipe — 22 g vs 24 g shifts the cup noticeably.',
      },
      {
        item: 'Burr grinder',
        affiliateAsin: 'B086DM2MS3',
      },
    ],
    steps: [
      {
        heading: 'Set up inverted with a wetted filter ready',
        body: '<p>Set the AeroPress in the inverted position (plunger down, chamber up). Rinse a paper filter in hot water and place it in the filter cap — set the cap aside for now.</p>',
      },
      {
        heading: 'Dose 22 g of coffee, ground medium-fine',
        body: '<p>Grind 22 g of coffee at a medium-fine setting (slightly coarser than the Hoffmann recipe — the longer steep needs a bit more headroom). Pour into the inverted chamber. Tap to level.</p>',
      },
      {
        heading: 'Pour 50 g of water at 80°C',
        body: '<p>Kasuya\'s recipe specifies 80°C water — significantly cooler than Hoffmann\'s 100°C. The cooler temperature reduces bitterness from the longer extraction.</p><p>Pour 50 g over the grounds in a slow, controlled stream. Wet all the coffee evenly. Start your timer at first contact.</p>',
      },
      {
        heading: 'Stir, then steep for 1:30',
        body: '<p>Give the slurry 2-3 gentle stirs. Let it steep undisturbed for 1:30. The dose-to-water ratio at this stage is roughly 1:2.3 — extremely high coffee load, which is the whole point: you are brewing a concentrate.</p>',
      },
      {
        heading: 'Attach the filter cap, flip, and press',
        body: '<p>At 1:30, attach the pre-rinsed filter cap, place your serving vessel over the top, and flip the assembly. Press slowly — Kasuya pressed in 30-45 seconds at the championship. Stop at the hiss.</p><p>You should have a small amount of dark, syrupy concentrate in your cup — maybe 40 ml of liquid from the 50 g pour.</p>',
      },
      {
        heading: 'Bypass: add 130 g of 80°C water directly to the cup',
        body: '<p>Pour 130 g of hot water (same 80°C, fresh from the kettle) directly into the cup with the concentrate. Stir once to combine.</p><p>The final cup is ~170 ml at a balanced strength. Total brew time: 3:30 from first contact.</p>',
      },
    ],
    commonMistakes: [
      'Using boiling water — Kasuya\'s 80°C is intentional. At 100°C the cup turns harsh and bitter because of the long contact time at high coffee dose.',
      'Skipping the bypass and just brewing more water in the AeroPress — defeats the entire point of the recipe. The bypass is what separates Kasuya\'s method from a standard high-dose brew.',
      'Pressing fast and hard — over-extracts the already-concentrated puck. 30-45 seconds, slow and steady.',
      'Trying this recipe with dark roast — Kasuya tested with a light Ethiopian. Dark roasts at this ratio + temperature read flat and ashy. For dark roasts, use Hoffmann\'s standard recipe instead.',
    ],
    faqs: [
      {
        question: 'Why does this recipe use 80°C water instead of boiling?',
        answer:
          'The high coffee dose (1:2.3 ratio in the chamber) extracts very efficiently — boiling water would over-extract. 80°C balances extraction without bitterness over the 1:30 steep. Kasuya tested this temperature extensively for the 2016 championship.',
      },
      {
        question: 'Can I use a different ratio for the bypass?',
        answer:
          'The 50 g / 130 g split is what Kasuya competed with. You can adjust the bypass to taste — more bypass = lighter, more delicate cup; less bypass = stronger, more concentrated. Vary the bypass, not the in-chamber water.',
      },
      {
        question: 'What grinder does Kasuya use?',
        answer:
          'He typically competes on a commercial flat-burr grinder, but the recipe scales down to home hand grinders (Comandante, Timemore, 1Zpresso). Medium-fine grind, not espresso-fine. If you only have a Baratza Encore, this recipe still works — competition gear is not required.',
      },
      {
        question: 'How does this compare to Hoffmann\'s recipe?',
        answer:
          'Hoffmann\'s is simpler and forgiving; Kasuya\'s is more technical and rewards precision. Hoffmann produces a balanced everyday cup; Kasuya produces a clean, concentrated cup with bright top notes (the bypass adds clarity). Try both and pick the daily driver — most users land on Hoffmann for weekday mornings, Kasuya for weekend single-origins.',
      },
      {
        question: 'Is the World AeroPress Championship still using this recipe?',
        answer:
          'Each year\'s champion publishes a new recipe — the WAC archive at worldaeropresschampionship.com lists all of them. Kasuya\'s 2016 recipe remains one of the most-cited and most-reproduced because of how cleanly it generalised into the 4:6 method.',
      },
    ],
  },
  {
    slug: 'aeropress-for-travel-brewing',
    title: 'AeroPress for travel brewing: pack list, simplified workflow, common substitutions',
    description:
      'How to brew coffee with an AeroPress when travelling: minimal pack list, substitutions for kettle/scale/grinder, and a simplified recipe that works in a hotel room.',
    productAsin: 'B0047BIWSK',
    topic: 'brew-technique',
    intro:
      '<p>The AeroPress was designed for travel and it shows. Plastic body, lightweight, fits in a corner of a carry-on, brews one cup in 90 seconds with hot water and nothing else. The trick is knowing what to leave at home and what to bring — over-pack the kit and you cancel the convenience; under-pack and you cannot brew at all.</p><p>This is the simplified workflow we use for hotel rooms, conferences, and short trips. It is not the highest-extraction recipe — it is the recipe that survives the constraints of travel and still produces a good cup. For optimal brewing at home, see our Hoffmann or Kasuya recipes.</p>',
    updatedAt: '2026-05-15',
    totalTime: '4 minutes',
    needs: [
      {
        item: 'AeroPress Go (or AeroPress original wrapped in a sock)',
        affiliateAsin: 'B0047BIWSK',
        note: 'The AeroPress Go has a built-in mug and lid for travel; the original is slightly cheaper and slightly lighter but needs a separate cup. Either works — pick on price and the size of your bag.',
      },
      {
        item: '20-30 paper filters in a small zip-top bag',
        note: 'Filters compress to almost no volume. Pack twice what you think you need.',
      },
      {
        item: 'Pre-ground coffee in a small airtight container (or whole bean if you have a hand grinder)',
        note: 'Pre-ground stays drinkable for 2-3 days post-grinding. For trips longer than that, bring a hand grinder.',
      },
      {
        item: 'Hand grinder (optional, for trips ≥ 3 days)',
        affiliateAsin: 'B086DM2MS3',
        note: 'The Timemore C2 is the budget travel grinder. The 1Zpresso JX-Pro is the upgrade if you are serious. Both fit in a packing cube.',
      },
      {
        item: 'Foldable silicone funnel or measuring cup',
        note: 'Hotel rooms rarely have anything resembling a scale or measuring cup. A silicone fold-flat funnel doubles as both — see workflow below for how.',
      },
    ],
    steps: [
      {
        heading: 'Source hot water — kettle, coffee maker, or hotel front desk',
        body: '<p>In order of preference: in-room electric kettle (most international hotels), in-room coffee maker run with no pod (US/Canada), or hot water from the hotel restaurant / front desk in a thermos. Avoid bathroom tap "hot" water — it sits in a tank and tastes stale.</p><p>You do not need exactly 100°C. Anywhere from 88-100°C works for this simplified recipe. If your water cooled in transit, it is still fine.</p>',
      },
      {
        heading: 'Estimate the coffee dose without a scale',
        body: '<p>For the AeroPress Go: fill the included scoop level (about 12-13 g). For the original: a slightly heaped tablespoon (~14 g) of coffee. Both are within tolerance — you do not need 0.1 g precision on the road.</p><p>If you packed pre-ground coffee at home, you can pre-portion it into small bags (one dose per bag) before you leave. Eliminates the guesswork entirely.</p>',
      },
      {
        heading: 'Use the AeroPress chamber as a water gauge',
        body: '<p>Without a scale, use the chamber markings: number 4 is roughly 200 g of water for an upright AeroPress. Pour to that level after adding coffee, and you are within 10 g of the target.</p>',
      },
      {
        heading: 'Brew using a simplified Hoffmann-style recipe',
        body: '<p>Upright orientation. Rinse the filter with hot water. Add coffee, pour water to the number 4 line, stir twice, steep 2 minutes, swirl, press slowly. Total time: about 3 minutes from first pour to final hiss.</p><p>This is Hoffmann\'s recipe with the precision sanded off. The result is 90% of the home brew with 10% of the gear.</p>',
      },
      {
        heading: 'Clean and dry for the next day',
        body: '<p>Unscrew the cap, push the puck into the bin, rinse the chamber and plunger under hot tap water (cold water is fine if hot is not available). Wipe the rubber seal with a tissue or hand towel. Air-dry on the bathroom counter overnight.</p><p>If you have to pack a still-damp AeroPress for an early flight, separate the plunger from the chamber so they can finish drying in your bag without mildewing.</p>',
      },
    ],
    commonMistakes: [
      'Packing too much gear — bringing a $50 scale and a $200 kettle to a hotel room defeats the AeroPress\'s travel value. The minimal kit fits in a packing cube.',
      'Using terrible coffee because you "saved space" by skipping the bean container. Bad beans at any technique = bad cup. Bring 100 g of decent beans pre-portioned.',
      'Brewing in the room sink — the splash radius of an inverted AeroPress flip is bigger than you think, and sink residue gets into the cup. Brew on a flat counter with a towel underneath.',
      'Forgetting the filters. They weigh nothing. Always bring filters.',
    ],
    faqs: [
      {
        question: 'Should I use the AeroPress Go or the original for travel?',
        answer:
          'Go if you want everything in one self-contained kit (mug, plunger, filter holder all nest together). Original if you already have a travel mug you like and want the cheaper, slightly larger-capacity brewer. The Go is the better default for most travellers.',
      },
      {
        question: 'Can I take the AeroPress on a plane?',
        answer:
          'Yes — it is plastic, has no liquid, and looks unambiguously like a coffee brewer. Pack it in checked or carry-on without issue. The metal hand grinder is the only piece that occasionally triggers extra screening at TSA — pack it where they can find it easily if checked.',
      },
      {
        question: 'What about water quality in hotels?',
        answer:
          'Tap water in most developed countries is fine for AeroPress brewing — the high coffee dose masks moderate water differences. In countries where you would not drink tap water unfiltered, use bottled (low-mineral, not "spring") water heated in the kettle.',
      },
      {
        question: 'Is pre-ground coffee really OK for travel?',
        answer:
          'For trips up to 3-4 days, yes. Pre-ground coffee loses brightness within hours and most aroma within 2 days, but the cup is still good. For longer trips, bring a hand grinder — the difference between day-2 pre-ground and freshly ground on day 6 is large.',
      },
    ],
  },
  {
    slug: 'james-hoffmann-v60-technique',
    title: "James Hoffmann's V60 technique (the best one-cup method)",
    description:
      "James Hoffmann's V60 recipe: 15 g coffee, 250 g water, four pulse pours, ~3:30 total time. Step-by-step with exact times and the agitation method that won millions of views.",
    productAsin: 'B000P4D5HG',
    topic: 'pour-over-technique',
    intro:
      '<p>James Hoffmann\'s "Best one-cup V60 technique" video (YouTube, 2019) is the canonical pour-over recipe for English-speaking specialty coffee. 15 g of coffee, 250 g of water, four pulse pours with controlled agitation at specific times, ~3:00-3:30 finish. The recipe is opinionated but reproducible: follow the times and the cup lands consistently.</p><p>What makes it work: the pulse pours regulate extraction without requiring perfect pour control, and the brief swirl after the bloom and after the first pour disperses fines that would otherwise clog the filter. It is the most-recommended V60 starting recipe for home brewers.</p><p>Source: <em>James Hoffmann, "The best one-cup V60 technique" (YouTube, 2019)</em>. Attribution to the original; we do not claim this recipe.</p>',
    updatedAt: '2026-05-15',
    totalTime: '3 minutes 30 seconds',
    recipeIngredient: [
      '15 g medium-light roast coffee, ground medium-fine for pour-over',
      '250 g water at 96°C / 205°F',
    ],
    needs: [
      {
        item: 'Hario V60 dripper (size 02, ceramic recommended)',
        affiliateAsin: 'B000P4D5HG',
        note: 'Ceramic holds heat better than plastic across a 3-minute brew. Plastic is fine if you preheat with a generous filter rinse.',
      },
      {
        item: 'Hario V60 paper filter (02 size, bleached or natural)',
        note: 'Bleached filters have less paper taste after rinsing. Natural filters need a more thorough rinse but are functionally equivalent.',
      },
      {
        item: 'Gooseneck kettle with temperature control',
        affiliateAsin: 'B0BVYGZG6T',
        note: 'The pulse pours require steady, controlled streams. The Fellow Stagg EKG is the most-recommended kettle; the Bonavita is the budget equivalent. A regular kettle works in a pinch but pours are less consistent.',
      },
      {
        item: '0.1 g scale with timer',
        affiliateAsin: 'B0BC4FQDD1',
        note: 'The pour times matter (within a few seconds). Any scale with a built-in timer works — an Acaia Pearl is great but a $25 brewing scale is also fine for home use.',
      },
      {
        item: 'Burr grinder capable of medium-fine pour-over grind',
        affiliateAsin: 'B086DM2MS3',
      },
    ],
    steps: [
      {
        heading: 'Rinse the filter, preheat the dripper and server',
        body: '<p>Place the paper filter in the V60. Pour hot water (just-boiled is fine) generously through the filter — both to remove paper taste and to preheat the dripper and the server underneath. Discard the rinse water.</p><p>Skip this and your first pour drops the brew temperature by 5-8°C, which Hoffmann notes flattens the cup.</p>',
      },
      {
        heading: 'Add 15 g of coffee, ground medium-fine',
        body: '<p>Grind 15 g of coffee at a medium-fine setting. On a Comandante: 22-26 clicks. Baratza Encore: setting 18-22. 1Zpresso JX-Pro: 90-100 µm equivalent. Place the V60 + filter on the server (scale underneath), tare to zero, add grounds, gently shake to level the bed.</p>',
      },
      {
        heading: 'Bloom: pour 50 g of 96°C water, swirl gently, wait until 0:45',
        body: '<p>Start the timer. Pour 50 g of water at 96°C in a circular motion, saturating all the grounds. The bloom should take about 5-10 seconds to pour. Pick up the V60 and give a gentle swirl (not a stir) to ensure full saturation — Hoffmann specifies a swirl rather than a stir to avoid agitating the bed too aggressively.</p><p>Wait until 0:45 on the timer. The grounds will dome upward as CO₂ degasses.</p>',
      },
      {
        heading: 'First main pour: 50 g → 100 g total, by 1:15',
        body: '<p>At 0:45, pour the next 50 g of water in a steady spiral from the centre outward. Aim to finish this pour by 1:00 — slow and controlled, not a fast dump. Total water in the brewer should now be 100 g.</p><p>Let the bed draw down slightly. By 1:15, the water level should be visibly receding.</p>',
      },
      {
        heading: 'Second main pour: 100 g → 200 g, by 1:45',
        body: '<p>At 1:15, pour the next 100 g of water — again in a controlled spiral, finishing by about 1:45. The slurry is now at 200 g total water.</p>',
      },
      {
        heading: 'Final pour: 200 g → 250 g, by 2:10',
        body: '<p>At 1:45, pour the final 50 g of water, finishing by 2:10. Total water in the brewer is now 250 g.</p>',
      },
      {
        heading: 'Swirl to settle the bed, let it drain',
        body: '<p>After the final pour, give the V60 a gentle swirl on the server to settle the slurry and dislodge any grounds clinging to the filter walls. This contributes to a flat, even bed at the end of the drawdown.</p>',
      },
      {
        heading: 'Drawdown completes around 3:00-3:30',
        body: '<p>The last drips fall by roughly 3:00 to 3:30 from the start of the timer. If you finish significantly earlier (under 2:45), grind one click finer next time. If you finish over 3:45, grind one click coarser.</p><p>Lift the V60 off the server. The spent bed should be flat — no deep central crater, no dry edges. Drink the brew while it is fresh.</p>',
      },
    ],
    commonMistakes: [
      'Pouring all the water in one go — destroys the pulse structure that regulates extraction. The four-pour scheduling is the point of this recipe.',
      'Stirring the bloom instead of swirling — stirring drives fines down and clogs the filter, slowing the brew past target. Swirl gently by tilting the dripper.',
      'Skipping the filter rinse and the preheat — drops the brew temp by 5-8°C and you taste it. 5 seconds of rinse, every time.',
      'Adjusting both grind and pour time on the same brew — change one variable, taste the result, then adjust if needed. Two variables = no signal.',
    ],
    faqs: [
      {
        question: 'My V60 finishes way too fast — under 2:30. What is wrong?',
        answer:
          'Almost always grind size. Go 1-2 clicks finer on the grinder and brew again. The pulse schedule should still land around 2:10 for the last pour; only the drawdown should slow. If finer grind doesn\'t fix it, check your filter — some natural filters drain faster than bleached.',
      },
      {
        question: 'Can I scale this recipe to 30 g of coffee?',
        answer:
          'Hoffmann\'s scaled version is 30 g coffee, 500 g water, six pulse pours, total time around 4:30-5:00. The pour structure stays the same — bloom + multiple main pours with controlled timing — but you need a larger V60 (size 03) or accept a tight chamber on the 02.',
      },
      {
        question: 'Do I have to use a gooseneck kettle?',
        answer:
          'For this recipe, yes — the pour control is part of the method. A regular kettle\'s pour is too aggressive for the spiral pattern. If you do not have a gooseneck, see our V60 ratio guide instead; the simplified single-pour method tolerates a regular kettle.',
      },
      {
        question: 'What roast level does this recipe work best with?',
        answer:
          'Medium-light to light roast — the recipe was developed for specialty single-origin coffees in that range. Dark roasts at 96°C with this schedule taste over-extracted; reduce water temp to 88-92°C for darker beans, keep everything else the same.',
      },
      {
        question: 'Why is my V60 cup tasting harsh / bitter despite hitting the target time?',
        answer:
          'Three common causes: (1) water too hot — try 92-94°C; (2) grind too fine — fines are still over-extracting even at target time; (3) too much agitation during pours. The pours should be steady spirals, not aggressive jets.',
      },
    ],
  },
  {
    slug: 'tetsu-kasuya-4-6-v60-method',
    title: "Tetsu Kasuya's 4:6 V60 method (adjustable for strength and brightness)",
    description:
      "Tetsu Kasuya's 4:6 V60 method: split 60% water into bloom + first pour to control acidity, 40% into later pours to control strength. The adjustment framework that won 2016 WBrC.",
    productAsin: 'B000P4D5HG',
    topic: 'pour-over-technique',
    intro:
      '<p>Tetsu Kasuya\'s 4:6 method is the most-cited V60 recipe in specialty coffee after Hoffmann\'s. The idea: split your total water into a 40% portion (the first two pours, including bloom) that controls acidity/sweetness balance, and a 60% portion (the later 3 pours) that controls strength. You can adjust each half independently to dial in the cup you want.</p><p>Kasuya won the 2016 World Brewers Cup with the underlying principle and has documented the method in articles and YouTube videos. The recipe below is the standard 1:15 ratio at 20 g coffee — adjustable per the framework rules in the FAQ.</p><p>Source: <em>Tetsu Kasuya, multiple articles and YouTube videos (2016-present)</em>. We summarise; the method is his.</p>',
    updatedAt: '2026-05-15',
    totalTime: '3 minutes 30 seconds',
    recipeIngredient: [
      '20 g coffee, ground medium-coarse',
      '300 g water at 92°C / 198°F',
    ],
    needs: [
      {
        item: 'Hario V60 (size 02)',
        affiliateAsin: 'B000P4D5HG',
      },
      {
        item: 'V60 paper filter',
      },
      {
        item: 'Gooseneck kettle',
        affiliateAsin: 'B0BVYGZG6T',
        note: 'The 5-pour structure requires controlled pours. Gooseneck is functionally required for this method.',
      },
      {
        item: 'Scale with timer',
        affiliateAsin: 'B0BC4FQDD1',
      },
      {
        item: 'Burr grinder',
        affiliateAsin: 'B086DM2MS3',
      },
    ],
    steps: [
      {
        heading: 'Rinse filter, preheat the dripper, dose 20 g',
        body: '<p>Standard V60 setup: paper filter in dripper, rinse with hot water, discard. Preheat the server. Add 20 g of coffee ground medium-coarse — Kasuya\'s grind is slightly coarser than Hoffmann\'s, to accommodate the longer total contact time of 5 pours.</p><p>Place on scale, tare to zero.</p>',
      },
      {
        heading: 'Pour 1 (bloom): 60 g water at 92°C, start timer',
        body: '<p>Start the timer. Pour 60 g of water at 92°C in a circular motion to fully saturate the grounds. Kasuya uses 92°C — slightly cooler than Hoffmann\'s 96°C, which softens acidity slightly.</p><p>Wait. No swirl, no stir.</p>',
      },
      {
        heading: 'Pour 2: bring total to 120 g, at 0:45',
        body: '<p>At 0:45, pour another 60 g of water — slow, controlled, in a spiral. Total in the brewer: 120 g. This completes the "4" portion (40% of total water = 120 g of 300 g).</p><p>The first two pours control acidity. If your cup is too acidic, increase the second pour. If too flat / lacking brightness, decrease it.</p>',
      },
      {
        heading: 'Pour 3: bring total to 180 g, at 1:30',
        body: '<p>At 1:30, pour 60 g more (total 180 g). The "6" portion has begun — these three pours control strength. More water across the three later pours = stronger; less = weaker (and shorter brew time).</p>',
      },
      {
        heading: 'Pour 4: bring total to 240 g, at 2:15',
        body: '<p>At 2:15, pour 60 g more (total 240 g).</p>',
      },
      {
        heading: 'Pour 5: bring total to 300 g, at 3:00 — drawdown completes around 3:30',
        body: '<p>At 3:00, pour the final 60 g (total 300 g). Let the V60 finish draining — drawdown completes around 3:30.</p><p>If your finish time is significantly off (<3:00 or >4:00), adjust grind one step in the right direction next brew. Keep the pour schedule consistent.</p>',
      },
    ],
    commonMistakes: [
      'Skipping the 45-second intervals and pouring continuously — the pause is what lets each pour\'s extraction stage complete before the next. Continuous pouring negates the 4:6 framework.',
      'Adjusting both the 4 and the 6 sections at once when the cup is off — the method is designed for independent adjustment. Change one at a time, taste, then change the other if needed.',
      'Grinding too fine "to compensate for the longer brew" — Kasuya\'s recipe is medium-coarse on purpose. Finer grind clogs the bed and the timing falls apart.',
      'Using 96°C+ water and then wondering why the cup tastes harsh. Kasuya\'s 92°C is intentional; don\'t copy Hoffmann\'s temperature here.',
    ],
    faqs: [
      {
        question: 'How do I adjust this recipe for a brighter / more acidic cup?',
        answer:
          'Within the 4 (first 120 g) section: reduce the second pour (e.g. bloom 60 g + 50 g instead of 60 g + 60 g). Less water in the early phase emphasises bright top notes. For a sweeter / less acidic cup, increase the second pour (e.g. bloom 50 g + 70 g).',
      },
      {
        question: 'How do I adjust for a stronger cup?',
        answer:
          'Within the 6 (later 180 g) section: split the same total across fewer pours (e.g. three 60 g pours becomes two 90 g pours) — fewer pours = less time in contact, more concentrated. Or reduce total water (e.g. 280 g instead of 300 g) at the same dose.',
      },
      {
        question: 'Is this better than Hoffmann\'s recipe?',
        answer:
          'Different goals. Hoffmann\'s is "the best one-cup": one recipe that works well for most beans without thinking. Kasuya\'s is a framework you adjust per bean. For a single daily cup, Hoffmann. For weekly bean rotation where you want to tune each one, Kasuya. We use both.',
      },
      {
        question: 'Can I use the 4:6 method with Chemex or Kalita?',
        answer:
          'Conceptually yes — the framework (40% controls acidity, 60% controls strength) generalises. Practically, the longer drawdown of Chemex and the flat bed of Kalita change the timing. You\'d need to recalibrate the intervals. Easiest is to use Kasuya\'s structure on V60 and let other brewers have their own recipes.',
      },
      {
        question: 'What grinder do I need for this recipe?',
        answer:
          'A burr grinder capable of consistent medium-coarse particle size. Comandante, 1Zpresso JX/JX-Pro, Timemore Chestnut, or Baratza Encore all work well. Blade grinders or low-quality burr grinders produce too many fines and the 5-pour structure clogs.',
      },
    ],
  },
  {
    slug: 'v60-ratio-for-roast-levels',
    title: 'V60 ratio guide: adjusting for medium vs light roast (and dark)',
    description:
      'V60 ratio and temperature adjustments by roast level. How to dial in light, medium, and dark roast on the same V60 without changing recipes — just the variables that matter.',
    productAsin: 'B000P4D5HG',
    topic: 'pour-over-technique',
    intro:
      '<p>Most published V60 recipes assume a medium-light single-origin specialty coffee. Real coffee shelves contain everything from blonde Ethiopian filter roasts to French roast Brazilian blends, and a single recipe does not flatter all of them. This guide is the adjustment framework we use to keep one V60 across very different beans.</p><p>The three variables that matter most are ratio (coffee:water), water temperature, and grind size. Pour technique matters less than people think — once you have a competent pour, the ratio + temp + grind do 80% of the work. This is a tuning guide, not a single recipe.</p>',
    updatedAt: '2026-05-15',
    totalTime: '15 minutes',
    needs: [
      {
        item: 'Hario V60',
        affiliateAsin: 'B000P4D5HG',
      },
      {
        item: 'Gooseneck kettle with temperature control',
        affiliateAsin: 'B0BVYGZG6T',
        note: 'A variable-temperature kettle (Fellow Stagg EKG, Bonavita) earns its keep here — you adjust temp between roasts and need it to land within a couple degrees.',
      },
      {
        item: 'Scale with timer',
        affiliateAsin: 'B0BC4FQDD1',
      },
      {
        item: 'Burr grinder with stepless or fine-step adjustment',
        affiliateAsin: 'B086DM2MS3',
        note: 'The grind adjustments across roast levels are small (1-3 clicks). A grinder with usable granularity makes the dial-in possible.',
      },
    ],
    steps: [
      {
        heading: 'Start with the universal baseline',
        body: '<p>15 g coffee, 250 g water, 96°C, medium-fine grind, 3:00-3:30 total brew time. This is roughly Hoffmann\'s recipe and it lands on medium-light roasts. Use it as the reference point and adjust from there for darker or lighter beans.</p>',
      },
      {
        heading: 'Light roast: hotter, finer, longer',
        body: '<p>Light roasts are denser and harder to extract — they need more energy and more time.</p><ul><li><strong>Ratio:</strong> 1:16 to 1:16.5 (e.g. 15 g coffee + 240-250 g water). Some brewers go to 1:15 for very light Ethiopians.</li><li><strong>Temperature:</strong> 96-99°C. Just off the boil is right.</li><li><strong>Grind:</strong> 1-2 clicks finer than baseline.</li><li><strong>Target time:</strong> 3:30-4:00 total brew. The longer time is intentional — light roasts need it.</li></ul>',
      },
      {
        heading: 'Medium roast: the baseline holds',
        body: '<p>Most published recipes target this band. 1:16 ratio, 94-96°C, medium-fine grind, 3:00-3:30 brew. If you only brew one type of bean, this is the recipe to memorise.</p>',
      },
      {
        heading: 'Dark roast: cooler, coarser, shorter',
        body: '<p>Dark roasts are porous and over-extract easily — back off on energy and time.</p><ul><li><strong>Ratio:</strong> 1:17 to 1:18 (e.g. 15 g coffee + 255-270 g water). Slightly more water dilutes the heavy body.</li><li><strong>Temperature:</strong> 88-92°C. Above 92°C dark roasts turn ashy and bitter.</li><li><strong>Grind:</strong> 1-2 clicks coarser than baseline.</li><li><strong>Target time:</strong> 2:30-3:00 total. Faster than light roast — the bed needs less contact.</li></ul>',
      },
      {
        heading: 'Taste and adjust one variable at a time',
        body: '<p>If the cup is sour or weak: reduce ratio (more coffee, less water), raise temp 2°C, or grind 1 click finer. If bitter or astringent: increase ratio (less coffee, more water), lower temp 2°C, or grind 1 click coarser.</p><p>Change one variable per brew. Two changes = no signal on which one helped.</p>',
      },
      {
        heading: 'Note the recipe with the bean',
        body: '<p>Write the working recipe on the bean bag (or a phone note tagged with the roast date). "Counter Culture Big Trouble: 15 g / 250 g / 94°C / Encore 18". Next bag of the same bean, you start from that point and only adjust if the bean has drifted.</p>',
      },
    ],
    commonMistakes: [
      'Trying to brew dark roast at 96°C "because that is what the recipe says". Recipes assume medium-light; you adjust for darker.',
      'Changing ratio AND grind AND temperature at the same time when a cup is off. You have no way to learn what fixed it.',
      'Chasing precision on the wrong variable. The difference between 95°C and 96°C is barely perceptible; the difference between 90°C and 96°C is enormous. Big moves first, fine-tune second.',
      'Using the same grind for every roast. Light roasts need finer; dark roasts need coarser. Same grind = under-extracted light or over-extracted dark.',
    ],
    faqs: [
      {
        question: 'Why does light roast need a finer grind than dark?',
        answer:
          'Light roasts are denser — the cell structure has not been broken down by long roasting. Water extracts more slowly from dense beans, so you compensate with finer grind (more surface area). Dark roasts are brittle and porous, extracting fast — too fine and they over-extract immediately.',
      },
      {
        question: 'Is 1:15 too strong for a daily cup?',
        answer:
          'For most palates, yes — 1:15 reads intense, especially on lighter roasts that taste bright. 1:16 to 1:17 is the comfortable everyday range. 1:15 is for when you want a concentrated cup or a specific bean rewards it.',
      },
      {
        question: 'How precise does the water temperature need to be?',
        answer:
          'Within 2°C of target is fine. A variable-temperature kettle gets you there easily. A regular kettle just off the boil sits around 95-96°C and works for medium-light roast without adjustment. For dark roast cooler temps, you genuinely need temperature control.',
      },
      {
        question: 'Can I use these ratios on Chemex or Kalita?',
        answer:
          'Roughly, yes — the ratios are forgiving. Chemex tends to taste slightly cleaner at 1:15-1:16; Kalita Wave is comparable to V60 at the same ratios. The bigger Chemex adjustment is grind (coarser than V60 because the thicker filter slows flow already).',
      },
      {
        question: 'What if I do not know the roast level of my coffee?',
        answer:
          'Look at the bean colour and surface oil. Light roast: tan to medium brown, dry surface. Medium roast: medium-dark brown, dry or just-barely-shiny. Dark roast: very dark brown, visibly oily surface. The taste in the cup also tells you — pronounced acidity points to lighter; flat, smoky, bittersweet notes point to darker.',
      },
    ],
  },
  {
    slug: 'pour-over-vs-aeropress-daily-brewing',
    title: 'Pour over vs AeroPress for daily home brewing (which to choose)',
    description:
      'Pour over (V60, Chemex) vs AeroPress for daily home brewing: workflow time, gear cost, what each does better, and the realistic question of which suits your kitchen.',
    topic: 'brew-technique',
    intro:
      '<p>The pour over vs AeroPress decision is one of the most-asked questions in home coffee, and most answers online are blanket recommendations rather than a comparison of trade-offs. The honest answer: both produce excellent coffee, they suit different routines, and the right pick depends on how many cups you brew, how much workflow time you have, and how much gear you want on the counter.</p><p>This guide compares the two on the dimensions that actually matter day-to-day. It is not a "best brewer" verdict — both are excellent. It is a decision aid for someone choosing one over the other for their kitchen.</p>',
    updatedAt: '2026-05-15',
    totalTime: '10 minutes',
    needs: [
      {
        item: 'AeroPress (if leaning that way)',
        affiliateAsin: 'B0047BIWSK',
        note: 'About $40 with filters. Single-cup; very low gear footprint.',
      },
      {
        item: 'Hario V60 + gooseneck kettle + scale (if leaning pour over)',
        affiliateAsin: 'B000P4D5HG',
        note: 'V60 itself is $25; with a Fellow Stagg EKG kettle and a scale, the full kit is $200-250. Pour over has a higher gear floor.',
      },
      {
        item: 'A grinder either way',
        affiliateAsin: 'B086DM2MS3',
        note: 'Both methods benefit from a burr grinder. Budget: Timemore C2 ($75) hand grinder or Baratza Encore ($170) electric. Both methods work with the same grinder.',
      },
    ],
    steps: [
      {
        heading: 'Compare workflow time and cleanup',
        body: '<p><strong>AeroPress:</strong> 90 seconds of active brewing + 20 seconds of cleanup (push puck into bin, rinse chamber). Total kitchen time: 2-3 minutes. The puck pop and rinse are the simplest cleanup of any brewer.</p><p><strong>V60:</strong> 3-4 minutes of active brewing (need to be present for pulse pours) + 30 seconds cleanup (lift filter + grounds into bin, rinse dripper). Total kitchen time: 4-5 minutes, all of it engaged.</p><p>For a morning where you want coffee while doing something else, AeroPress wins. For a weekend pour-over ritual, V60.</p>',
      },
      {
        heading: 'Compare what each does best in the cup',
        body: '<p><strong>AeroPress:</strong> Body sits between French press and pour over. Forgiving — works well across a range of beans and grind sizes. The pressure + immersion combo produces a rounder, more saturated cup. Less ability to highlight delicate, bright single-origin notes than V60.</p><p><strong>V60:</strong> Clean, articulate cup with the highest clarity of body of any common brewer. Light single-origin coffees (Ethiopian, Kenyan, washed Colombian) shine. Less forgiving — narrow grind window, technique-dependent. Dark roasts can taste hollow if not adjusted.</p>',
      },
      {
        heading: 'Compare gear cost and counter space',
        body: '<p><strong>AeroPress minimum kit:</strong> brewer + filters + any kettle + any scale. $50-100 total. Fits in a drawer.</p><p><strong>V60 minimum kit:</strong> dripper + filters + gooseneck kettle + scale. $150-300 depending on kettle choice. The gooseneck kettle is the largest investment and the most counter-space-hungry piece. The V60 itself is tiny.</p><p>Both share a grinder requirement — that does not differentiate them.</p>',
      },
      {
        heading: 'Compare scaling (single cup vs multi-cup)',
        body: '<p><strong>AeroPress:</strong> One cup at a time. The AeroPress XL doubles capacity, but for households brewing 2+ cups morning, AeroPress is awkward.</p><p><strong>V60:</strong> Size 02 handles 1-4 cups in a single brew. Chemex 6-cup handles up to 6. Pour over scales to multiple cups in a single brew much better than AeroPress.</p>',
      },
      {
        heading: 'Match to your situation',
        body: '<p>Pick AeroPress if: single-cup household, limited counter space, you want forgiving brewing, you travel often, or you are starting out and want to invest under $100. Pick V60 (or pour over generally) if: 2+ cup mornings, you enjoy the brewing ritual, you brew lots of light single-origin specialty coffee, or you already have a good kettle.</p><p>The "right" answer for most home coffee drinkers under 30 daily minutes of kitchen time is AeroPress. For deliberate weekend brewing or multi-cup mornings, pour over.</p>',
      },
    ],
    commonMistakes: [
      'Buying both and using neither well. Pick one, commit for 3 months, then add the other if the first one is not enough. Two brewers in rotation usually means neither gets dialled in.',
      'Assuming V60 = "better coffee". Both are excellent; the V60 reveals more bean character but at the cost of being more demanding. "Better" depends on what you value.',
      'Skipping the gooseneck kettle for V60 to save money. The pour control is part of the V60 method — without it, you should brew AeroPress instead.',
      'Skipping the scale for either method. A scale is the cheapest tool and the largest accuracy gain. $25-30 brewing scale, then upgrade later if you want.',
    ],
    faqs: [
      {
        question: 'Which is easier to dial in for a beginner?',
        answer:
          'AeroPress. The grind window is wider (medium-fine works across most recipes), the brew time is shorter so feedback is faster, and small errors are less catastrophic. V60 has a narrower grind window and the brew time depends on grind + pour technique — more variables to learn.',
      },
      {
        question: 'Can the same beans work in both?',
        answer:
          'Yes. Most home users keep a single bean bag and brew it either way through the week. Adjust grind slightly: V60 wants medium-fine; AeroPress wants medium-fine to fine. Same coffee, slightly different grinds, two different cups.',
      },
      {
        question: 'What about Chemex vs AeroPress?',
        answer:
          'Chemex is pour over with a thicker filter — even cleaner cup than V60, slightly less body. Most of the AeroPress vs V60 comparison applies. Chemex scales to 6 cups better than V60 does to 4. Pick Chemex over V60 if you brew for 2-4 people regularly.',
      },
      {
        question: 'Will I taste the difference between V60 and AeroPress?',
        answer:
          'For most beans, yes — clearly. The V60 produces a cleaner cup with more articulated acidity; the AeroPress produces a rounder, fuller-bodied cup. They are not subtle differences. Side-by-side blind tasting from the same bean reveals the contrast easily.',
      },
      {
        question: 'If I can only own one brewer, which?',
        answer:
          'AeroPress, for most home situations. Lower price floor, lower workflow time, more forgiving, scales reasonably well for one or two cups, and travels. V60 is a better second brewer once you know what you want from coffee. Owning both gives you weekday + weekend coverage.',
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
  'brew-technique': 'Brew technique',
  'accessory-use': 'Accessory use',
  'brewer-cleaning': 'Brewer cleaning',
  'kettle-descaling': 'Kettle descaling',
  'pour-over-technique': 'Pour-over technique',
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
  'brew-technique': ['brewer'],
  'accessory-use': ['accessory'],
  'brewer-cleaning': ['brewer'],
  'kettle-descaling': ['brewer', 'accessory'],
  'pour-over-technique': ['brewer'],
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
