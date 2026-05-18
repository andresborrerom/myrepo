// Troubleshoot page definitions. Cada entry genera una página en
// /troubleshoot/[slug]/ con FAQPage + WebPage JSON-LD, diagnostic checklist,
// cause analysis y replacement parts opcionales.
//
// Editorial constraints (CLAUDE.md, anti-gray-hat):
// - NO inventamos causas. Las "causes" listadas son las que aparecen
//   recurrentemente en threads consolidados de Home-Barista, /r/espresso,
//   foros del fabricante. Ordenadas por probabilidad estimada según
//   frecuencia de mención, no según conveniencia comercial.
// - "whenToEscalate" es honesto: si la máquina está en garantía, decirle al
//   user que NO abra el chasis aunque el fix sea trivial. Warranty trumps DIY.
// - Replacement parts solo se recomiendan cuando son genuinamente la solución.
//   Una milk wand clogged se limpia, no se reemplaza la valve.
// - OPV mods y similares: tratados como "modification" no "fix", con warning
//   explícito sobre warranty void.

export interface TroubleshootCause {
  /** Nombre corto de la causa (e.g. "Limescale in the boiler"). */
  cause: string;
  /** 1-2 párrafos explicando WHY pasa. Sin invenciones — basado en docs/comunidad. */
  explanation: string;
  /** Pasos concretos para fix. HTML permitido (links a how-to, glossary). */
  fix: string;
}

export interface TroubleshootReplacementPart {
  /** Nombre del item ("Group head gasket", "Steam wand tip"). */
  item: string;
  /** ASIN si lo vendemos. Opcional — algunas partes solo se venden por OEM. */
  affiliateAsin?: string;
  /** Nota: cuándo aplica, instrucciones de install. */
  note?: string;
}

export interface TroubleshootFaq {
  question: string;
  answer: string;
}

export interface TroubleshootPage {
  slug: string;
  /** SEO title — phrasing natural como search query. */
  title: string;
  /** Meta description ≤160 chars. */
  description: string;
  /** Producto principal del catalog si es product-specific. */
  productAsin?: string;
  /** Categoría del problema para internal grouping. */
  category:
    | 'no-water'
    | 'no-steam'
    | 'leaking'
    | 'no-heat'
    | 'modification'
    | 'technique'
    | 'grinder'
    | 'electrical';
  /** Frase tipo search query, e.g. "Bambino not pumping water". */
  problem: string;
  /** 1-2 sentence TL;DR de la causa más común. */
  tldrFix: string;
  /** Diagnostic checklist ordenado: "first X, then Y, then Z". */
  diagnostics: string[];
  /** Causas posibles ordenadas por probabilidad. 2-4 entries. */
  causes: TroubleshootCause[];
  /** Anti-gray-hat: cuándo dejar de intentar DIY y llamar al servicio. */
  whenToEscalate: string;
  /** Partes de repuesto opcionales. */
  replacementParts?: TroubleshootReplacementPart[];
  /** 3-5 FAQs. */
  faqs: TroubleshootFaq[];
  /** ISO date — última revisión del contenido. */
  updatedAt: string;
  /** Slugs de how-to pages relacionadas para internal linking. */
  relatedHowToSlugs?: string[];
}

export const troubleshootPages: TroubleshootPage[] = [
  // ============================================================
  // BREVILLE — Bambino issues
  // ============================================================
  {
    slug: 'breville-bambino-not-pumping-water',
    title: 'Breville Bambino not pumping water — causes and fixes',
    description:
      'When a Breville Bambino or Bambino Plus stops pumping water: the diagnostic checklist (descale, prime, solenoid) and which fixes you can DIY vs. warranty.',
    productAsin: 'B07VFZHRYC',
    category: 'no-water',
    problem: 'Bambino runs the pump but no water comes through the group head — or it pumps slowly with a wheezing sound.',
    tldrFix:
      'In 80% of cases this is a primed-loop failure caused by an empty tank. Refill, then hold the steam button for 30 seconds to re-prime. If the wheeze persists, you are due for a descale.',
    diagnostics: [
      'Is the water tank full and seated correctly? Lift it out, refill, push it down hard until you hear the click.',
      'Can you hear the pump engaging? (Loud buzzing when you press 1-cup.) If yes, water flow is the issue. If no, electrical.',
      'When was the last descale? Check the alternating button flash sequence — if it is flashing, scale is the most likely cause.',
      'Has the machine sat unused for >2 weeks? The internal lines may be air-locked and need re-priming.',
      'Is the portafilter clogged or basket loaded incorrectly? Try a water-only shot with no portafilter to isolate.',
    ],
    causes: [
      {
        cause: 'Pump has lost prime (most common)',
        explanation:
          'The Bambino\'s vibratory pump depends on a continuous water column from tank to boiler. When the tank runs dry — or when the machine sits idle for weeks and air enters the line — the pump runs but cannot draw water. This is by far the most reported cause on Breville support forums.',
        fix:
          '<p>Refill the tank to MAX. Hold the steam button (right side) for 30 seconds without pressing any brew button. Water should pour from the steam wand once prime is restored. If no water emerges after 30 seconds, switch off, wait 1 minute, and try again — sometimes it takes two cycles.</p>',
      },
      {
        cause: 'Limescale blocking the boiler outlet',
        explanation:
          'The Bambino\'s Thermojet boiler has narrow internal passages. Heavy scale can restrict the outlet to the point where the pump cannot push water through at design pressure. The machine usually signals descale need via the button flash sequence, but owners who ignore the alert reach this state.',
        fix:
          '<p>Run a full descale cycle (see our how-to-descale-breville-bambino guide). If the machine has not pumped water for several days, you may need to descend manually: fill the tank with descaler solution, hold the steam button for 30 seconds to draw solution through the lines, then let dwell for 20 minutes before running the official descale cycle.</p>',
      },
      {
        cause: 'Stuck solenoid valve (less common, warranty-eligible)',
        explanation:
          'The Bambino Plus has a 3-way solenoid that can stick open or closed if exposed to enough scale or grit. Symptom: pump engages, you hear water flowing, but it discharges into the drip tray rather than through the group head. This is the failure that usually requires service if it does not resolve after a thorough descale.',
        fix:
          '<p>Run a descale cycle followed by 2 full water-rinse cycles. If the symptom persists, contact Breville support — the solenoid is replaceable but not user-accessible without opening the chassis (warranty implications). Most reports of this issue resolve via the warranty repair channel for machines under 2 years old.</p>',
      },
    ],
    whenToEscalate:
      'If your Bambino is under the 2-year Breville warranty and a descale + re-prime does not restore water flow, do not open the chassis. Contact Breville support — they will either repair under warranty or replace the unit. Opening the machine voids the remaining warranty and the replacement cost is usually higher than a warranty repair.',
    replacementParts: [
      {
        item: 'Urnex Dezcal or equivalent descaler',
        affiliateAsin: 'B00LWLBQH2',
        note:
          'Note: Urnex Cafiza (our catalog entry) is the cleaner — for descaling specifically use Dezcal, also from Urnex. Sold at most coffee specialty retailers and Amazon.',
      },
    ],
    faqs: [
      {
        question: 'How long should re-priming take?',
        answer:
          '15-30 seconds of holding the steam button. If water has not emerged from the steam wand by 60 seconds, switch off, wait 1 minute, and try again. Two cycles handle most prime losses; three suggests scale or a solenoid issue.',
      },
      {
        question: 'My Bambino pumps water into the drip tray but not through the portafilter — what is wrong?',
        answer:
          'Symptom of a stuck 3-way solenoid (Bambino Plus only). Try a thorough descale first. If it persists, contact Breville — this is usually a warranty repair, not a DIY fix without opening the chassis.',
      },
      {
        question: 'Can I use distilled water in the Bambino to avoid this?',
        answer:
          'Breville advises against distilled water — it can damage the boiler over time because it is "hungry" for minerals and draws them from the boiler walls. Use filtered tap water (Brita pitcher level) for the right balance: low scale risk, healthy mineral content.',
      },
      {
        question: 'I dropped the machine and now it does not pump — could that have done it?',
        answer:
          'Possibly. The vibratory pump is rigid-mounted and a drop can crack the housing or shear an internal connection. Visible water leaks or buzzing-without-water after a drop suggest physical damage, which Breville warranty does not cover but a service tech can confirm.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-descale-breville-bambino'],
  },
  {
    slug: 'bambino-plus-milk-wand-not-steaming',
    title: 'Bambino Plus milk wand not steaming — clog and valve fixes',
    description:
      'When the Bambino Plus auto steam wand stops producing steam or makes a wheezing sound: clearing the tip, descaling the steam circuit, and when to escalate to Breville.',
    productAsin: 'B07VFZHRYC',
    category: 'no-steam',
    problem: 'Bambino Plus steam wand produces no steam, weak steam, or air-only output even with the milk button pressed.',
    tldrFix:
      'Dried milk inside the wand tip is the cause in roughly 90% of cases. Soak the wand tip in hot water for 5 minutes and clear the hole with a needle. If steam pressure is weak after cleaning, run a descale.',
    diagnostics: [
      'Does the machine display the steam light? If yes, the heating side works — the issue is in the wand. If no, electrical/thermostat issue.',
      'Can you see milk crust around the wand tip? Even small amounts block the steam hole.',
      'Detach the wand tip (twist counter-clockwise on the Bambino Plus). Inspect for milk residue inside.',
      'Run a water-only steam cycle (steam button with no milk pitcher). Does any vapor emerge?',
      'When was the last descale? Scale in the steam boiler reduces output before it fully blocks.',
    ],
    causes: [
      {
        cause: 'Milk dried inside the wand tip (most common)',
        explanation:
          'The Bambino Plus auto wand has a single steam hole at the tip. Milk that has not been purged after steaming dries inside the wand and cakes on the hole walls. This is the dominant cause — owners who forget to purge after each milk session encounter it within weeks.',
        fix:
          '<p>Twist off the steam wand tip (the silver piece at the bottom — counter-clockwise on the Bambino Plus). Soak it in a cup of just-boiled water for 5 minutes. Use a thin sewing needle or paper clip to clear the steam hole and the milk intake hole on the side. Rinse, dry, reinstall. Run a water-only steam cycle to confirm pressure.</p>',
      },
      {
        cause: 'Scale in the steam circuit',
        explanation:
          'The Bambino Plus uses a single Thermojet boiler for both brew and steam. Scale that affects brew water flow also affects steam pressure. If you can pull a normal espresso shot but steam is weak, scale is plausible but less likely than wand clogging.',
        fix:
          '<p>Run the full descale cycle (see how-to-descale-breville-bambino). The descale cycle cleans both the brew circuit and the steam circuit. If steam returns to full pressure after descaling, that confirmed the cause.</p>',
      },
      {
        cause: 'Failed auto-steam sensor (warranty-eligible)',
        explanation:
          'The Bambino Plus uses a magnetic sensor to detect the milk pitcher and a temperature probe in the wand to gauge milk temp. If the sensor fails, the auto cycle may report success but never actually engage the steam valve. This is uncommon but reported in some Breville support threads.',
        fix:
          '<p>Try manual steam mode: press and hold the Steam button for 2 seconds — the machine enters manual mode and steam runs continuously while you hold. If manual works but auto does not, the issue is the sensor or its logic. Contact Breville support — this is warranty-eligible on machines under 2 years old.</p>',
      },
    ],
    whenToEscalate:
      'If the wand tip cleans fully (you can see through the steam hole when held to light), descaling is recent, and manual steam mode also produces no steam — escalate to Breville. The internal steam solenoid is not user-accessible. For machines outside the 2-year warranty, the repair cost from Breville is typically $150-200; weigh that against the Bambino Plus replacement cost.',
    replacementParts: [
      {
        item: 'Urnex descaler for the steam-circuit clean',
        affiliateAsin: 'B00LWLBQH2',
        note:
          'For the periodic descale that prevents this issue. Note: descaling is preventative; for an actively-clogged wand, clearing the tip is the fix.',
      },
    ],
    faqs: [
      {
        question: 'I cleaned the tip and still no steam — what next?',
        answer:
          'Try the manual steam mode (hold Steam button 2 seconds). If manual produces steam but auto does not, you have a sensor issue (warranty). If neither produces steam, run a descale — scale is the next most likely cause.',
      },
      {
        question: 'Can I take the entire wand assembly apart?',
        answer:
          'The user-removable tip detaches for cleaning. Going further (removing the wand from the chassis, opening the steam valve) requires disassembling the machine and voids warranty. The tip clean handles 90% of clog cases.',
      },
      {
        question: 'How do I prevent this happening again?',
        answer:
          'Wipe the wand with a damp cloth and purge it (1-2 seconds of steam) within 5 seconds of finishing each milk session. Plant milks (especially oat) dry faster than dairy and need especially prompt cleaning.',
      },
      {
        question: 'My wand is steaming but milk is not foaming — same problem?',
        answer:
          'Different problem. Weak steam = clog/scale. Plenty of steam but no foam = technique (wand position, milk type, pitcher size). See our how-to-froth-milk-bambino-plus guide.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-froth-milk-bambino-plus', 'how-to-descale-breville-bambino'],
  },
  // ============================================================
  // GAGGIA — Classic Pro common issues
  // ============================================================
  {
    slug: 'gaggia-classic-leaking-from-group-head',
    title: 'Gaggia Classic Pro leaking from the group head — gasket and OPV fixes',
    description:
      'When a Gaggia Classic Pro drips or leaks from the group head: diagnosing whether it is the group gasket, the OPV o-ring, or the steam-side leak path.',
    productAsin: 'B083TQR8BV',
    category: 'leaking',
    problem: 'Gaggia Classic Pro leaks water from around the portafilter when locked in, or drips from the group head after a shot ends.',
    tldrFix:
      'A drip-after-shot from the group head is normal — that is the 3-way solenoid relieving pressure into the drip tray. A leak around the locked-in portafilter is almost always the group head gasket (a $5 part, 5-minute replacement).',
    diagnostics: [
      'Is the leak during the shot (water comes from the portafilter edge while brewing) or after the shot (drips from the group after the brew switch is off)?',
      'How does the portafilter feel locked in? If it goes past the 6-o\'clock position to 7 or 8, the gasket is worn and compressed.',
      'When was the gasket last replaced? Stock gaskets typically last 12-18 months of daily use.',
      'After descaling, did the leak start? Descaler can soften gaskets that were already near end-of-life.',
      'Does the leak persist with a fresh empty basket (no coffee)? If yes, it is the gasket. If only during brewing with coffee, may also be channeling.',
    ],
    causes: [
      {
        cause: 'Worn group head gasket (most common)',
        explanation:
          'The rubber gasket between the brass boiler and the portafilter compresses over time. When new, the portafilter handle locks in at roughly the 6 o\'clock position. When the gasket has worn, the handle goes to 7 or 8 o\'clock to achieve the same seal — and eventually the seal fails entirely, allowing water to escape around the basket rim.',
        fix:
          '<p>Replacement gasket is $5-8, takes 5 minutes. Unscrew the shower screen (single center bolt, 4mm hex). The old gasket sits in a groove above the screen — pry it out with a flat screwdriver tip. Press the new gasket in by hand (no tools), reinstall the shower screen, lock in the portafilter. The handle should return to the 6 o\'clock position.</p>',
      },
      {
        cause: 'Failed OPV o-ring',
        explanation:
          'The Over-Pressure Valve (OPV) on top of the boiler has an o-ring that seals the spring chamber. If this fails, water leaks from the top of the boiler and pools inside the chassis — eventually emerging at the base of the machine or from the group head area. Less common than gasket wear, but a known failure mode after descaling.',
        fix:
          '<p>Requires opening the chassis (top cover, 2 screws on the back). The OPV is the brass cylinder on top of the boiler. Replace the o-ring inside — Gaggia OPV o-ring kits are $4-6 and contain the right durometer. This is borderline DIY-friendly but voids warranty if the machine is under 1 year.</p>',
      },
      {
        cause: 'Normal post-shot drip (not a problem)',
        explanation:
          'The 3-way solenoid relieves the pressure built up during a shot by venting it into the drip tray. A small "drip-drip-drip" from the group head for 5-10 seconds after the brew switch is turned off is normal and expected — that is what keeps the puck from "soup" and what lets you knock out a dry puck.',
        fix:
          '<p>No action needed. If the drip continues for more than 30 seconds after the shot, or if it pools in the drip tray faster than the shot itself, then it is no longer the solenoid — likely a stuck solenoid valve or a gasket issue.</p>',
      },
    ],
    whenToEscalate:
      'If you have replaced the group gasket and the leak persists, and you are uncomfortable opening the chassis to inspect the OPV — bring the machine to an espresso machine service tech (most cities have one, search "espresso machine repair near me"). A bench diagnosis is $50-80; from there you can decide if the repair is worth it relative to the machine\'s value. Do not attempt OPV work if the machine is under warranty.',
    replacementParts: [
      {
        item: 'Group head gasket (Gaggia Classic, 8mm thick)',
        note:
          'OEM gasket from Gaggia or generic from EspressoParts. ~$5-8. Verify thickness — Gaggia Classic gaskets are 8mm; thinner gaskets fit but seal poorly.',
      },
      {
        item: 'Shower screen and screen-holding bolt',
        note:
          'Replace if the screen is warped from over-tightening. ~$10. Most owners just clean and reuse.',
      },
      {
        item: 'OPV o-ring kit',
        note:
          'For the boiler-mounted OPV. ~$4-6 from Gaggia parts retailers. Only if you have diagnosed an OPV leak specifically.',
      },
    ],
    faqs: [
      {
        question: 'How do I know if the gasket needs replacing?',
        answer:
          'Lock in the portafilter. If the handle ends up past the 6 o\'clock position (7, 8, or further), the gasket has compressed. If you see water beading around the basket edge during a shot, the seal is failing. Both are signs to replace.',
      },
      {
        question: 'Can I just tighten the portafilter harder to stop the leak?',
        answer:
          'Short term, sometimes. Long term, no — and you risk stripping the portafilter lugs or distorting the basket seat. A $5 gasket is the correct fix.',
      },
      {
        question: 'I replaced the gasket and it still leaks — what now?',
        answer:
          'Three things to check: (1) Did you reinstall the shower screen? Forgetting the screen leaves no even surface for the gasket to seal against. (2) Is the new gasket the right thickness (8mm for Classic Pro)? (3) Is the leak actually from the OPV side and not the group? Run a shot with the portafilter completely removed — if water still emerges from inside the chassis, it is the OPV or the boiler.',
      },
      {
        question: 'Does the Evo Pro (newer model) have the same issue?',
        answer:
          'Same group head architecture, same gasket, same wear pattern. The Evo Pro has a different OPV (the "Pro" OPV is set to 9 bar instead of the older 12 bar) but the o-ring failure mode is the same.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-descale-gaggia-classic'],
  },
  {
    slug: 'gaggia-classic-opv-mod',
    title: 'Gaggia Classic OPV mod — what it does, when to do it, warranty caveat',
    description:
      'The OPV mod for the Gaggia Classic and Classic Pro: why it lowers pressure from 12 bar to 9 bar, whether it actually improves shots, and what it voids.',
    productAsin: 'B083TQR8BV',
    category: 'modification',
    problem: 'You have heard the Gaggia OPV mod improves shot quality but you are not sure if it applies to your machine, what it actually does, or whether it is worth voiding the warranty.',
    tldrFix:
      'The OPV (Over-Pressure Valve) mod lowers the Gaggia\'s stock 12-bar brew pressure to the ~9 bar that espresso actually wants. It is a modification (warranty void), not a fix — and the newer Evo Pro already ships with a 9-bar OPV, so the mod is irrelevant on that model.',
    diagnostics: [
      'Which Gaggia do you have? Classic Pro (2019-2024) ships with 12 bar OPV. Evo Pro (2024+) ships with 9 bar OPV — no mod needed.',
      'Is your machine under the 1-year Gaggia warranty? If yes, the mod voids it.',
      'Do you have a pressure gauge (or naked portafilter and observation skills)? Without one, you cannot verify the mod worked.',
      'Are you currently getting balanced shots? If yes, the mod will change pressure but not necessarily improve perceived quality.',
    ],
    causes: [
      {
        cause: 'Why the stock OPV is set to 12 bar',
        explanation:
          'Gaggia ships the Classic Pro with the OPV set to ~12 bar because the machine was originally designed around pressurized baskets (where higher pressure compensates for the basket\'s flow restriction to produce visible crema). Most home users running non-pressurized baskets get over-extracted, harsh shots at 12 bar — espresso\'s sweet spot is 8-10 bar at the puck.',
        fix:
          '<p>This is context, not a fix. Move to "modification procedure" below.</p>',
      },
      {
        cause: 'What the OPV mod does',
        explanation:
          'The mod consists of opening the machine, accessing the OPV (the brass cylinder on top of the boiler), turning the adjustment screw inside it counter-clockwise to soften the spring tension, and reassembling. The spring controls the pressure at which the OPV starts venting back to the tank — softer spring = lower pressure ceiling = around 9 bar instead of 12.',
        fix:
          '<p><strong>Warning: this voids the Gaggia warranty.</strong> Proceed only if your machine is past warranty and you accept the risk.</p><p>The procedure: unplug machine. Cool fully. Remove top cover (2 screws on the back). Identify the OPV — brass cylinder on top of the brass boiler, with a screw on top. Loosen the locking nut on the OPV screw. Turn the central screw 1/2 to 1 full turn counter-clockwise. Tighten the lock nut. Reassemble. Pull a shot with a pressure gauge (or naked portafilter — the "tiger striping" pattern at lower pressure is visibly different from the chaotic 12-bar pattern).</p><p>Iterate: 1/2 turn at a time until you land at the desired pressure. Tools needed: socket set for the cover, a flat screwdriver, ideally a pressure-gauge portafilter to verify (PressureScout, Espazzola, ~$60).</p>',
      },
    ],
    whenToEscalate:
      'If you are under warranty: do not do the mod. Either wait until warranty expires or buy the Evo Pro (which ships with 9-bar OPV out of the box). If you are past warranty but uncomfortable opening the machine: any local espresso service shop will do the OPV mod for $30-50. Beyond that, this is a one-time mod — once done, it stays done; no maintenance.',
    replacementParts: [
      {
        item: 'Pressure-gauge portafilter (verification only)',
        note:
          'Not required for the mod itself but strongly recommended for verifying the new pressure setting. Brands: PressureScout, Espazzola, IMS. ~$60-90. After verification you can pass it to another Gaggia owner or sell it.',
      },
    ],
    faqs: [
      {
        question: 'Does the OPV mod actually improve shot taste?',
        answer:
          'For some users on light/medium roasts using non-pressurized baskets, yes — the lower pressure reduces over-extraction. For users on dark roasts or with pressurized baskets, the difference is smaller. Many community threads on Home-Barista report a 1-2 point taste improvement on the World Coffee Brewing scale for skilled users; others report no perceived difference.',
      },
      {
        question: 'Does the Gaggia Classic Evo Pro need the OPV mod?',
        answer:
          'No. Gaggia released the Evo Pro in 2024 specifically with a 9-bar OPV from the factory, plus a redesigned steam wand. If you have the Evo Pro, the mod is irrelevant — your machine already ships at the target pressure.',
      },
      {
        question: 'Is this dangerous? Could the machine explode?',
        answer:
          'No. The OPV is a safety relief valve and turning it down LOWERS its trigger pressure (vents earlier). The boiler\'s pressure tolerance is far above either 9 or 12 bar. The mod cannot make the machine less safe; it can only make the pump push less hard against the puck.',
      },
      {
        question: 'How do I verify the mod worked without a pressure gauge?',
        answer:
          'Use a bottomless portafilter and pull a shot at your normal recipe. At 12 bar, the bottom of the puck "rages" with multiple chaotic streams. At 9 bar, you typically see a single steady column with "tiger striping" (alternating light/dark stripes from the basket holes). The visual difference is obvious — but a pressure gauge is the only quantitative confirmation.',
      },
      {
        question: 'Can I undo the mod if I do not like the result?',
        answer:
          'Yes. Just turn the OPV screw back clockwise the same number of turns you turned it out. The OPV is a mechanical spring — there is nothing irreversible. But warranty is not "undone" by reversing the mod.',
      },
    ],
    updatedAt: '2026-05-15',
  },
  // ============================================================
  // RANCILIO — Silvia common issues
  // ============================================================
  {
    slug: 'rancilio-silvia-leaking-from-group-head',
    title: 'Rancilio Silvia leaking from the group head — gasket replacement',
    description:
      'When a Rancilio Silvia leaks during or after brewing: diagnosing group gasket wear vs. boiler-side leaks, and the gasket-replacement procedure.',
    productAsin: 'B0BQYMTBNL',
    category: 'leaking',
    problem: 'Rancilio Silvia (V6 or Pro X) leaks water from around the portafilter during a shot, or water emerges from the underside of the machine.',
    tldrFix:
      'A leak around the portafilter rim is almost always the group head gasket — a $4 part with a 5-minute replacement. A leak from the underside is usually an OPV o-ring or boiler gasket and is more involved.',
    diagnostics: [
      'Is the leak during the shot (water from the basket rim) or only at the start (a brief spurt then sealing)?',
      'How does the portafilter feel locked in? Stock Silvia gasket = handle at 6 o\'clock when new. If past 7 o\'clock, gasket is worn.',
      'Is water pooling on the counter under the machine? That is a different leak — likely boiler side, not group head.',
      'When was the gasket last replaced? Stock gasket life is 12-18 months of daily use.',
      'Does the machine make a hissing sound while idle? That is a steam-side leak (different from brew-side).',
    ],
    causes: [
      {
        cause: 'Group head gasket worn or hardened (most common)',
        explanation:
          'The Silvia\'s upper group gasket sits between the brass boiler base and the portafilter rim. It compresses over months of use and lock-in cycles. Symptoms: handle locks past 6 o\'clock, water beads visibly at the basket edge during the shot, espresso "edge" tasting flat (small amounts of water bypassing the puck).',
        fix:
          '<p>$4 part, 5 minute replacement. Unscrew the shower screen retaining bolt (4mm Allen, 1 center bolt). Remove the screen and the dispersion block. The gasket sits in a circular groove — pry it out with a flat-blade screwdriver tip (do not gouge the brass groove). Press the new gasket in by hand. Reassemble. Lock in the portafilter — handle should return to 6 o\'clock.</p>',
      },
      {
        cause: 'OPV o-ring leaking (less common)',
        explanation:
          'The Silvia\'s OPV is internal to the boiler housing. An aged o-ring on the OPV can leak water into the chassis cavity, which then drips out the bottom of the machine. This is less common than gasket wear but is a known failure pattern on Silvias over 5 years old.',
        fix:
          '<p>Requires opening the chassis (4 screws on the top cover). The OPV is on the boiler — replace the o-ring. ~$5 part. Borderline DIY — comfortable with a screwdriver and basic mechanical work. Voids warranty if the machine is under 1 year.</p>',
      },
      {
        cause: 'Boiler gasket failure (rare, expensive)',
        explanation:
          'The flange gasket where the boiler bolts to the group head can fail after a decade-plus of heat cycling. Symptoms: water leaks from underneath when brewing, sometimes accompanied by reduced brewing pressure. Less common but reported on Silvias 8+ years old.',
        fix:
          '<p>This is a real repair — the boiler must be unbolted from the group head, the gasket replaced, and the boiler re-torqued. Most home owners take the machine to a service tech for this. Cost: ~$80 service + $15 parts. Comparable to the cost difference between maintaining the existing Silvia and buying a Silvia Pro X.</p>',
      },
    ],
    whenToEscalate:
      'If you have replaced the group gasket and the leak persists from the boiler side (underneath the machine), and you are not comfortable with bolting/torquing brass to brass: bring it to an espresso service tech. The Silvia is one of the most-serviced machines in the US and most cities have a tech who has done this repair dozens of times. $100-150 typical bench cost; less than 1/3 the cost of a new Silvia.',
    replacementParts: [
      {
        item: 'Group head gasket (Silvia, 8.5mm)',
        note:
          'Stock Silvia gasket is 8.5mm — verify thickness before ordering. OEM Rancilio or generic from EspressoParts. ~$4. Most cost-effective replacement on the machine.',
      },
      {
        item: 'OPV o-ring (silicone, high-temp)',
        note:
          'If you have diagnosed an OPV leak. ~$3-5 from Rancilio parts retailers. Replace the spring at the same time if it is the original (after ~10 years).',
      },
      {
        item: 'Shower screen replacement',
        note:
          'Replace if the screen is warped from over-tightening. ~$8. Most owners clean and reuse the OEM screen indefinitely.',
      },
    ],
    faqs: [
      {
        question: 'How often should I replace the Silvia group gasket?',
        answer:
          'Every 12-18 months for daily use. The signal is the portafilter handle position — if it goes past 6 o\'clock when locked in, the gasket has compressed. Some Silvia owners replace annually on a schedule; others wait until they see leak symptoms.',
      },
      {
        question: 'Is the Silvia Pro X gasket the same as the V6?',
        answer:
          'Yes — same group head architecture, same 8.5mm gasket spec. The Pro X has a different boiler (PID-controlled, larger) but the brew group is unchanged.',
      },
      {
        question: 'My Silvia leaks only when I do not lock the portafilter firmly — is that a gasket issue?',
        answer:
          'Borderline. The portafilter should be firm but not muscular to lock in — a fresh gasket needs only moderate force. If you find yourself muscling the handle, the gasket is on its way out.',
      },
      {
        question: 'Should I use silicone or rubber for the replacement gasket?',
        answer:
          'Silicone gaskets last roughly 2x as long as the stock rubber and tolerate higher heat. They are about $2-3 more. Most Silvia owners on Home-Barista recommend silicone for the second replacement onwards.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-descale-rancilio-silvia'],
  },
  // ============================================================
  // DELONGHI — super-automatic issues
  // ============================================================
  {
    slug: 'delonghi-magnifica-grinder-not-working',
    title: 'De\'Longhi Magnifica grinder not working — unjam and reset',
    description:
      'When the Magnifica grinder spins but no coffee dispenses, or it makes a grinding noise and stops: clearing the burr, the grind-bypass mode, and when to call service.',
    productAsin: 'B07RB5K9TJ',
    category: 'grinder',
    problem: 'De\'Longhi Magnifica grinder either spins but does not deliver coffee, jams during operation, or makes a loud grinding noise and stops.',
    tldrFix:
      'In 80% of cases an oily/dark roast bean has glued the burr and the machine just needs the bean chute brushed clean and the burrs run dry. Use the grind-bypass mode to feed pre-ground while you diagnose.',
    diagnostics: [
      'Is the grinder making any noise when you start a brew? Silent = motor or electrical. Spinning = mechanical jam.',
      'Can you see beans falling from the hopper to the burr chamber? If beans are stuck in the hopper, the issue is upstream.',
      'What beans are you using? Oily dark roasts (Starbucks, French roast, espresso roast labeled as "dark") jam super-automatic burrs more than medium roasts.',
      'When was the brew unit last removed and cleaned? Buildup in the brew unit can backpressure into the grinder.',
      'Does the pre-ground bypass work? Use the bypass funnel to brew from pre-ground coffee — isolates whether the issue is grinder-side or downstream.',
    ],
    causes: [
      {
        cause: 'Oily beans gluing the burr (most common)',
        explanation:
          'Dark/oily beans deposit a thin film of oil on the burr surface and the bean chute walls. Over weeks, this builds into a sticky paste that holds beans on the chute, blocks fresh beans from reaching the burrs, and ultimately jams the mechanism. Super-automatics with conical burrs are particularly affected because the steep angle relies on gravity feed.',
        fix:
          '<p>Power off and unplug. Empty the hopper completely. Use a soft brush (a 1/2-inch paintbrush works) to brush out the chute and any visible burr surface. For deeper cleaning: run 1-2 doses of grinder-cleaning tablets (Urnex Grindz or Cafiza-G) — these are food-safe pellets that absorb oils as they grind. Discard the resulting grounds. Refill with fresh, less oily beans (medium roasts work better in super-automatics than dark roasts).</p>',
      },
      {
        cause: 'Foreign object in the burrs',
        explanation:
          'Small stones, packaging debris, or wood splinters in beans can lodge between the burr cones. The motor stalls (often with a loud noise) and the machine usually displays an error like "grinder error" or simply stops brewing.',
        fix:
          '<p>Power off and unplug. Remove the hopper (turn the locking ring counter-clockwise, lift out). Open the burr access cover (varies by Magnifica variant — consult the manual). Use long tweezers to remove any visible foreign object. Run the grinder empty briefly to confirm no obstructions. If the object is wedged deep, the burrs may need to be lifted out for access — at that point most owners take the machine to service.</p>',
      },
      {
        cause: 'Worn or dull burrs (after 5+ years of heavy use)',
        explanation:
          'Super-automatic burrs are steel and typically last 5-10 years of daily use before the cutting edges dull. Symptoms: grinder runs much longer per dose, output is increasingly inconsistent, shots get progressively faster (coarser grind output even at finest setting).',
        fix:
          '<p>Burr replacement on the Magnifica is a service-tech job — the burr chamber is buried and removing it requires disassembling the brew unit. Replacement burrs are $30-60 from De\'Longhi parts retailers; service labor is $80-120. If your Magnifica is older than 7 years and showing all the symptoms, weigh the repair cost vs. replacement.</p>',
      },
    ],
    whenToEscalate:
      'If the grinder still does not deliver coffee after brushing the chute, running cleaning tablets, and switching to a non-oily bean — that suggests a mechanical issue beyond user-accessible cleaning (worn burrs, internal jam, motor failure). At that point, contact De\'Longhi service or an authorized repair tech. Do not disassemble the brew unit beyond what the manual shows — the calibration is service-only.',
    replacementParts: [
      {
        item: 'Grinder-cleaning tablets (Urnex Grindz or equivalent)',
        note:
          'Food-safe cellulose pellets that absorb burr oils. Use 1-2 doses every 3 months on super-automatics that brew dark roasts. ~$15 for a year\'s supply.',
      },
    ],
    faqs: [
      {
        question: 'Why does the Magnifica struggle so much with dark roasts?',
        answer:
          'Super-automatic burrs are tuned for medium-roast bean density. Dark roasts are less dense, more oily, and break up unpredictably under the burr. De\'Longhi\'s own guidance recommends medium roast for the Magnifica line. If you want darker espresso, consider switching to a semi-automatic with a separate grinder.',
      },
      {
        question: 'My Magnifica grinder works but the coffee tastes weak — is it the grinder?',
        answer:
          'Possibly. Worn or oily burrs grind coarser than they should, even at the finest setting, which under-extracts. Try grinder-cleaning tablets first. If output stays weak, the burrs may need replacement.',
      },
      {
        question: 'Can I use pre-ground coffee while I troubleshoot?',
        answer:
          'Yes — the Magnifica has a pre-ground bypass (a small chute next to the hopper). Use espresso-grind pre-ground coffee. This isolates whether your shot quality issue is grinder-side (gone with pre-ground) or downstream (persists with pre-ground).',
      },
      {
        question: 'Will running cleaning tablets damage the burrs?',
        answer:
          'No — Urnex Grindz and equivalents are designed for grinder use specifically. The pellets are softer than coffee beans and dissolve as they grind. Run 1-2 cycles then run a small amount of beans through to flush any pellet residue before brewing coffee.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-descale-delonghi-magnifica'],
  },
  // ============================================================
  // GENERIC — diagnostic flowcharts that apply across machines
  // ============================================================
  {
    slug: 'espresso-machine-not-heating',
    title: 'Espresso machine not heating up — diagnostic flowchart',
    description:
      'When a home espresso machine powers on but does not reach brew temperature: the diagnostic sequence from thermostat to heating element, and what to test before opening the chassis.',
    category: 'no-heat',
    problem: 'Espresso machine powers on (lights or display work) but does not reach brewing temperature, or stays warm but never gets fully hot.',
    tldrFix:
      'A blown thermal fuse is the most common cause on Gaggia/Silvia/Lelit-class single boilers, and is a $5 part. On Bambino/Breville, a tripped thermal cutoff usually needs a Breville service call. Verify the symptom first with a thermometer to rule out a temperature-display issue rather than an actual heat issue.',
    diagnostics: [
      'Confirm the symptom: does water emerge cold or lukewarm from the group head after a 10-second water shot? If it is warm, the machine is partially heating.',
      'Wait the full warm-up time per the manual — Bambino is ready in 3 seconds, Gaggia in 8 minutes, Silvia in 15-20 minutes. Many "not heating" reports are impatience.',
      'Listen: do you hear the heating element clicking on/off? A faint click cycle when the machine is on indicates the thermostat is working.',
      'Check the display: any error code? Look up the specific code in your manual — heat-related codes are usually unambiguous.',
      'Has the machine been moved recently? Vibration during transport can dislodge thermostat connections (especially on Gaggia/Silvia internals).',
    ],
    causes: [
      {
        cause: 'Blown thermal fuse (most common on Gaggia, Silvia, lower-end prosumer)',
        explanation:
          'Single-boiler machines have a thermal fuse — a one-shot safety device that opens the heater circuit if the boiler ever exceeds a safe temperature (typically 165°C for brew, 180°C for steam). Once blown, the machine reads "off" to the heater even though the rest of the electrics work. Most common cause: running the machine dry (no water in the tank) for more than a few seconds, which spikes the dry boiler temperature.',
        fix:
          '<p>Replacement thermal fuse is $5-8. Requires opening the chassis (1-2 screws on Gaggia/Silvia top cover). The fuse is wired in series with the heating element — typically mounted directly to the boiler with a metal clip. Voids warranty if under 1 year. If you are uncomfortable with mains-voltage wiring, this is a service-tech job ($60-100 with parts).</p>',
      },
      {
        cause: 'Failed thermostat',
        explanation:
          'The brew thermostat (and on dual-stat machines, the steam thermostat) controls when the heating element cycles. A failed thermostat reads "always at temp" so the heater never engages, or "never at temp" so it never disengages. On Gaggia/Silvia these are bimetal disc thermostats that cost $10-15 each.',
        fix:
          '<p>Replacement thermostat is $10-15, snap-on metal disc on the boiler. Same chassis-opening procedure as the thermal fuse. Diagnose with a multimeter: at room temperature both brew (105°C) and steam (140°C) thermostats should read closed (continuity). If either reads open at room temp, it has failed.</p>',
      },
      {
        cause: 'Heating element failure (rare)',
        explanation:
          'The heating element itself can fail — the resistance wire inside opens after years of thermal cycling. Symptom: machine powers on, no heat at all, multimeter shows infinite resistance across the element terminals (should be ~30-50 ohms for a typical 1000-1400W single boiler).',
        fix:
          '<p>Heating element replacement is the most invasive single-boiler repair — requires fully draining the boiler, removing the boiler from the chassis, and torquing the new element in with the right gasket. ~$30 parts + $150 service labor. At that price point, weigh against replacing the machine.</p>',
      },
      {
        cause: 'Thermojet failure (Breville Bambino specific)',
        explanation:
          'The Bambino uses a Thermojet thermocoil rather than a traditional boiler. If the Thermojet element fails, the machine cannot heat at all — no partial-heat symptom. Bambino Thermojet failure is uncommon but reported in some Breville support threads, typically after a dry-fire event.',
        fix:
          '<p>The Thermojet is not user-replaceable. If your Bambino does not heat at all, contact Breville — under warranty it is a replacement; out of warranty, the repair cost typically exceeds the value of the machine.</p>',
      },
    ],
    whenToEscalate:
      'If your machine is under warranty: contact the manufacturer first, full stop. Opening the chassis voids warranty even if the eventual fix would have been a $5 part. For out-of-warranty machines, if you do not have basic multimeter skills and comfort with mains wiring, take it to a service tech — heating-circuit work has electrocution risk and the cost difference vs. DIY is not large enough to justify the safety risk for an inexperienced person.',
    replacementParts: [
      {
        item: 'Thermal fuse (per-machine spec)',
        note:
          'Match the manufacturer-spec temperature rating. Generic fuses can fail incorrectly. Source from Gaggia/Rancilio/Breville parts retailers, not Amazon generics. ~$5-8.',
      },
      {
        item: 'Brew thermostat (bimetal disc)',
        note:
          'Match the temperature rating (105°C brew, 140°C steam for most single-boilers). ~$10-15.',
      },
    ],
    faqs: [
      {
        question: 'How long should my machine take to warm up?',
        answer:
          'Varies widely. Thermojet/Thermoblock machines (Bambino, Dedica) — under 30 seconds. Single-boiler with brass boiler (Gaggia, Silvia) — 8-15 minutes for brew, another 5-10 for steam. Dual boiler (Breville DB, Lelit Mara X) — 12-25 minutes for full readiness. If yours is taking dramatically longer than spec, that is a real symptom.',
      },
      {
        question: 'My machine reaches temp but cools fast — is that a heating issue?',
        answer:
          'No, that is normal for single-boiler machines. The brass boiler holds only ~100ml of water and loses temperature quickly between shots. The fix is shot pacing — pull within 30 seconds of the temp light coming on for best stability — not machine repair.',
      },
      {
        question: 'Can I test the thermal fuse without removing it?',
        answer:
          'Yes — with the machine unplugged and cool, you can probe the fuse terminals from the back of the chassis (some machines) or by removing the top cover. A working thermal fuse reads continuity (near 0 ohms); a blown one reads open. This is the cheapest possible diagnostic before ordering parts.',
      },
      {
        question: 'Is dry-firing covered by warranty?',
        answer:
          'Usually no. Most manufacturers exclude damage from running the machine dry (no water in tank) because it is user-preventable. If you blew the thermal fuse by dry-firing, expect to either pay for the repair out of pocket or DIY it.',
      },
    ],
    updatedAt: '2026-05-15',
  },
  {
    slug: 'channeling-fix-espresso',
    title: 'Espresso channeling — what causes it and how to fix it',
    description:
      'Channeling in espresso shots: what it looks like, the prep mistakes that cause it (distribution, tamping, dose), and the tools that genuinely help vs. the gimmicks.',
    category: 'technique',
    problem: 'Espresso shots have visible jets or fast streams in some basket holes while other holes barely flow — the puck is broken after pulling, and the taste is thin and sour despite a normal grind setting.',
    tldrFix:
      'Channeling is almost always caused by uneven puck preparation, not the machine. The fix is distribution: a WDT (Weiss Distribution Technique) tool eliminates ~90% of channeling on home setups for under $25.',
    diagnostics: [
      'Pull a shot with a bottomless portafilter (or borrow one). Channeling shows as visible side streams or "spritzers" — if you see them, you have channeling. If the puck pulls as a single steady column, you do not.',
      'Examine the puck after the shot: are there visible craters, holes, or "donut" patterns? Those are channels.',
      'Check your dose: are you within 0.2 g of the target every shot? Variable dose creates variable headspace, which causes channeling.',
      'Check the basket: is it level after distribution and tamping? A tilted puck channels on the high side.',
      'Is the shower screen clean and flat? A clogged screen pushes water unevenly through the puck.',
    ],
    causes: [
      {
        cause: 'Uneven distribution (most common, by far)',
        explanation:
          'When you grind into a basket, the grounds form clumps and uneven piles — denser in the center, less dense around the edge, with air pockets between clumps. Tamping compresses what is there but cannot fix the underlying unevenness. Water then takes the path of least resistance through the loose spots, creating channels.',
        fix:
          '<p>The fix is WDT — Weiss Distribution Technique. Insert a fine needle tool (WDT tool) into the basket after dosing and stir gently to break up clumps. 30 seconds of stirring eliminates virtually all clumping. A dedicated WDT tool is $15-25 and is the single highest-ROI espresso accessory after a scale.</p>',
      },
      {
        cause: 'Uneven tamp',
        explanation:
          'If you tamp at an angle (one side lower than the other) the puck has uneven density. Water flows through the low-density side, creating a channel. The bigger your basket and the more force you apply, the more pronounced the effect.',
        fix:
          '<p>Use a calibrated tamper sized correctly for your basket (58mm for prosumer, 54mm for Breville) and tamp with even downward pressure. The tamp should be flat — look at the puck surface after lifting the tamper; you should see a level, even circle.</p>',
      },
      {
        cause: 'Dose too high or too low for the basket',
        explanation:
          'Each basket has a design dose range — typically 18 ± 1 g for a standard 58mm double. Going below the range leaves too much headspace; the puck shifts during preinfusion and channels. Going above leaves no headspace; the shower screen embeds into the puck and creates the channel itself.',
        fix:
          '<p>Match dose to basket. For an 18 g double basket, target 18.0 g ± 0.2 g. If you cannot hit the target consistently, the issue is the scale or workflow, not the grinder.</p>',
      },
      {
        cause: 'Stale beans or wrong grind',
        explanation:
          'Beans within the first 4-5 days post-roast release CO₂ that disrupts the puck during preinfusion, creating channels. Beans 6+ weeks past roast have lost so much CO₂ that flow patterns become unpredictable — and a grind setting that worked at 2 weeks no longer does at 6 weeks.',
        fix:
          '<p>Use beans that are 5-30 days post roast date. Re-dial every 7-10 days as the bag ages. If channeling started recently with no prep changes, check your bean age first.</p>',
      },
    ],
    whenToEscalate:
      'Channeling is almost never a hardware issue — there is no service-tech fix. The exception: if you have done all the distribution and tamping right and still channel, and the basket itself is visibly damaged (bent edge, deformed holes), then the basket may need replacement. $15 for an aftermarket VST or IMS basket. Beyond that, channeling is a technique problem that resolves with practice.',
    replacementParts: [
      {
        item: 'WDT tool (Weiss Distribution Technique)',
        affiliateAsin: 'B09QV3RTBN',
        note:
          'The single highest-ROI accessory for fixing channeling on home setups. B Plus and Normcore make similar tools — both work. ~$15-25.',
      },
      {
        item: 'Tamper sized to your basket',
        affiliateAsin: 'B07XGYLW2H',
        note:
          'Calibrated 58mm or 54mm depending on your machine. Stock tampers shipped with machines are often the wrong size or too lightweight.',
      },
      {
        item: 'Precision basket (VST, IMS, or Pesado)',
        note:
          'After WDT and tamper, a precision-machined basket reduces channeling further. ~$25-40. Match your portafilter size.',
      },
    ],
    faqs: [
      {
        question: 'Do I need a bottomless portafilter to diagnose channeling?',
        answer:
          'It helps enormously — you can see channels visually as side spritzers. A bottomless costs $25-40. Without it, you can sometimes infer channeling from the puck appearance after the shot (craters, "donut" rings, soft spots) but the visual is less obvious.',
      },
      {
        question: 'Is WDT really worth it? Some baristas say it is overhyped.',
        answer:
          'For home users with clumping grinders (which is almost all of them), WDT is the difference between regular channeling and almost none. Pro baristas with high-end commercial grinders that produce minimal clumping can sometimes skip it; home grinders almost always benefit. The community consensus on r/espresso has held for 3+ years that WDT is essentially mandatory for home setups.',
      },
      {
        question: 'My shots are slow and channel — would a coarser grind fix it?',
        answer:
          'No. A coarser grind makes the shot faster but does not address the underlying uneven distribution. Channels happen at any grind setting if the puck is uneven. Fix distribution first, then dial in grind separately.',
      },
      {
        question: 'Do distribution tools (spinners, leveling tools) replace WDT?',
        answer:
          'No — they sit on top of the basket and level the surface, but do not break up clumps inside the puck. They are useful as a finishing step but not a substitute for WDT. The community consensus is WDT first, then optional distribution tool, then tamp.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-dial-in-espresso', 'how-to-dial-in-espresso-bambino-plus'],
  },
  // ============================================================
  // GRINDER-SPECIFIC issues
  // ============================================================
  {
    slug: 'niche-zero-retention-issues',
    title: 'Niche Zero retention issues — purging, popcorning, and what is normal',
    description:
      'When the Niche Zero retains coffee grounds between doses: what is design-normal, what is excessive, and the workflow tweaks that minimize retention.',
    productAsin: 'B08CXVZL8R',
    category: 'grinder',
    problem: 'Niche Zero retains coffee in the chute or burr chamber between doses, leading to inconsistent dose weights and stale grounds carrying over to the next bean.',
    tldrFix:
      'The Niche Zero is marketed as "zero retention" but in practice retains 0.1-0.3 g per dose. That is below the threshold of taste impact for almost all home users. If you are measuring more than 0.5 g of carryover, check your single-dose workflow — usually the issue is bean popcorning, not the grinder.',
    diagnostics: [
      'Weigh beans in, weigh grounds out. Difference of <0.3 g per 18 g dose is design-normal.',
      'Are you single-dosing (loading individual doses into the hopper)? If so, are you using bellows after each dose to push grounds through the chute?',
      'Are you grinding for espresso or filter? Espresso grinds retain slightly more than filter grinds because the finer particles stick to the chute walls.',
      'Has the burr chamber been cleaned in the last 3 months? Oils build up on the burr surfaces and increase retention.',
      'When you weigh "missing" coffee, do you see grounds in the burr chamber when you open it? Or is the loss invisible (lost to static, fine particles)?',
    ],
    causes: [
      {
        cause: 'Normal single-dosing retention (0.1-0.3 g, expected)',
        explanation:
          'The Niche Zero\'s name refers to its hopper-less, single-dose design that eliminates grinder-bin carryover (the issue with traditional cafe grinders that hold 500g+ in a hopper). It does NOT mean literally zero grounds remain in the burr chamber or chute. Across the home barista community, 0.1-0.3 g of true retention per dose is reported as normal for the Niche Zero.',
        fix:
          '<p>This is design-expected, not a fix. The workflow that maintains it: load beans into the hopper, grind, then use the included bellows (or a Niche bellows accessory) to puff out the chute once or twice after grinding. The bellows blast clears the chute almost completely.</p>',
      },
      {
        cause: 'Popcorning (beans bouncing rather than feeding) on small doses',
        explanation:
          'When the hopper is nearly empty (last few grams), beans bounce around above the burrs rather than being pulled down by the next bean\'s weight. This causes uneven grind start/stop and beans can sit in the chamber after the motor stops. Especially noticeable on doses under 14 g.',
        fix:
          '<p>Load all your beans for the shot at once (not in a "round" hopper but in the small dosing cup that ships with the Niche). For doses under 15 g, consider also adding 1-2 "ballast" beans on top, then weighing only the output rather than measuring beans in. The ballast helps push the last beans through, then is discarded.</p>',
      },
      {
        cause: 'Static-related retention (very fine particles sticking)',
        explanation:
          'Fine espresso particles (boulders aside) can build static charge during grinding and stick to plastic chute walls. The Niche\'s chute is metal-lined, which helps, but cold/dry climates exacerbate static retention. Symptom: fine, "dusty" residue inside the chute even after bellowing.',
        fix:
          '<p>The RDT (Ross Droplet Technique): before grinding, mist the whole beans with 1-2 drops of water from a fine spray bottle. The water reduces static dramatically. Side effect: slightly more chute retention from the moisture, but net total retention drops. Common in dry winter months.</p>',
      },
      {
        cause: 'Burr buildup from oily beans',
        explanation:
          'Dark, oily beans (espresso roast, French roast) leave a fine film on the burr surfaces that traps subsequent grounds. Over weeks of dark-roast grinding, the burrs accumulate enough buildup that retention noticeably increases.',
        fix:
          '<p>Run grinder-cleaning tablets (Urnex Grindz) through the Niche every 3 months if you use dark roasts. ~$15 for a year\'s supply. Procedure: load 1 dose of pellets, grind, discard the output, run a small amount of beans (5-10 g) through to flush any pellet residue.</p>',
      },
    ],
    whenToEscalate:
      'If you have done the workflow checks (single-dose, bellows, RDT in dry months, periodic cleaning) and retention is still over 1 g per dose, something is genuinely wrong — either physical damage to the chute, a burr alignment issue from a drop, or rare manufacturing variance. Contact Niche Coffee support directly — they have been responsive to retention complaints and will troubleshoot via email or replace under warranty if needed.',
    replacementParts: [
      {
        item: 'Grinder-cleaning tablets (Urnex Grindz or equivalent)',
        note:
          'For periodic burr cleaning. ~$15 for a year on a single-grinder home setup.',
      },
    ],
    faqs: [
      {
        question: 'Is the Niche Zero retention really meaningfully better than a Eureka or DF64?',
        answer:
          'Compared to a Eureka Specialita (traditional hopper grinder), yes — the Niche eliminates the 500g+ hopper carryover. Compared to other single-dose grinders (DF64, MAX Pesado, even some Mahlkonig models), the difference is small (0.1-0.3 g range for all of them). The Niche\'s zero-retention claim is competitive but not unique.',
      },
      {
        question: 'Do I need the Niche bellows accessory?',
        answer:
          'The Niche ships with a basic bellows attachment. Aftermarket bellows (Niche\'s own larger version, or third-party silicone bellows) blow more air and clear retention slightly better. Worth $20-30 if you grind multiple beans per day; not essential.',
      },
      {
        question: 'My Niche Zero output weight varies by 0.5 g shot to shot — is that retention?',
        answer:
          'Partially — but also dose-in variation. Weigh beans in to 0.1 g precision. If output still varies 0.5 g+ at fixed grind, there is bean variability (different roasts behave differently) and/or retention. Try the RDT and bellows workflow and see if variation drops.',
      },
      {
        question: 'Does retention affect taste?',
        answer:
          'For most home users, no. 0.2 g of carryover from one bean to the next is below the threshold most palates can detect. If you are switching from a dark roast to a light roast, the first dose may show subtle carry-over notes. For single-bean households, it is irrelevant.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-season-grinder-burrs'],
  },
  {
    slug: 'baratza-encore-slow-or-replace',
    title: 'Baratza Encore grinding slow or unevenly — service, burrs, or replace?',
    description:
      'Diagnosing a Baratza Encore that grinds slowly, makes new noises, or produces inconsistent output: burr wear, motor issues, and the Baratza service program.',
    productAsin: 'B007F183LK',
    category: 'grinder',
    problem: 'Baratza Encore grinds noticeably slower than when new, makes new buzzing or rattling sounds, or produces visibly inconsistent grind sizes at the same setting.',
    tldrFix:
      'Steel burrs in the Encore are rated for ~500 pounds of coffee — roughly 5-7 years of daily filter use. If your Encore is older than 5 years, the burrs are probably due for replacement ($35 parts). For younger Encores, the issue is usually cleaning, not wear.',
    diagnostics: [
      'How long have you owned the Encore? Under 2 years = unlikely to be burr wear. Over 5 years = burrs may be due.',
      'Have you cleaned the burrs in the last 3 months? Coffee oils on the burr surfaces slow grinding and dull the cutting edges effectively.',
      'What grind setting are you using? Espresso-fine settings (1-5) wear faster than filter settings (15+).',
      'Listen: are the new sounds during grinding, between bursts, or only when empty? Buzzing while running = motor or burr; rattling between bursts = bean popcorning or housing.',
      'Open the burr chamber (top hopper removes easily) — are the burr edges visibly chipped or rounded? Compare to photos of new Encore burrs online.',
    ],
    causes: [
      {
        cause: 'Coffee oil buildup on burrs (most common, easy fix)',
        explanation:
          'Steel burrs accumulate a thin film of coffee oils over months of use. The film effectively dulls the cutting edges, slowing grinding speed and producing more boulders/fines. Especially noticeable with dark/oily roasts.',
        fix:
          '<p>Run 1-2 doses of grinder-cleaning tablets (Urnex Grindz, Cafiza-G) through the Encore. Discard the resulting "grounds" — they are pellet dust mixed with old coffee oil. Run 10 g of fresh beans through to clear any pellet residue. ~$15 for a year of cleaning tablets.</p>',
      },
      {
        cause: 'Burr wear at end-of-life (after ~500 lb of coffee)',
        explanation:
          'Baratza\'s stated burr life is 500 lb of coffee — at 30 g per day, that is roughly 6.5 years. Heavy users (3+ shots/day at espresso fine) wear faster. Symptoms: noticeably slower grind, increased fines, can no longer get fine enough for espresso even at setting 1.',
        fix:
          '<p>Burr replacement is a 15-minute DIY job — Baratza sells the burr set for $35 and ships with a hex key. YouTube tutorials cover it in detail. Important: the replacement burrs are the same as OEM, not the M2 conical upgrade. If you want the M2 burrs (sharper, finer grind ceiling for espresso), that is the Encore ESP territory.</p>',
      },
      {
        cause: 'Motor or gearbox wear (rare, signals service program)',
        explanation:
          'The Encore\'s DC motor and reduction gearbox can wear after long use. Symptoms: motor sound becomes uneven, grinding pauses mid-burst, motor stops randomly. Less common than burr wear and harder to DIY-diagnose.',
        fix:
          '<p>Use Baratza\'s service program. Send the unit in (cost varies by region — typically $40-80 including return shipping) and they assess, replace worn parts, and return. For an Encore 4-5+ years old with motor symptoms, this is often more cost-effective than a new grinder.</p>',
      },
    ],
    whenToEscalate:
      'If the burrs are visibly worn and the motor is sluggish — the Encore is at end-of-life. Either send to Baratza service (gets you a refurb-quality grinder), buy replacement burrs and try the burr-only fix first, or replace. At the Encore\'s price point ($170 new), replacement burrs ($35) are worth trying before buying a new grinder. If the new burrs do not restore the grinder, then the motor/gearbox is the issue and a new Encore (or Encore ESP for espresso) makes more sense than the service program.',
    replacementParts: [
      {
        item: 'Baratza Encore burr set (steel, OEM)',
        note:
          'Direct from Baratza\'s site or authorized retailers. ~$35. Same burrs as the Encore ships with (not the M2 upgrade burrs). 15-minute install.',
      },
      {
        item: 'Grinder-cleaning tablets',
        note:
          'For preventative burr maintenance. ~$15 for a year on home use.',
      },
    ],
    faqs: [
      {
        question: 'How do I know if the burrs need replacement vs. just cleaning?',
        answer:
          'Clean first — it is cheaper and faster. Run grinder-cleaning tablets and a few flushes. If grinding speed and consistency return to normal, it was oils. If still slow after thorough cleaning, the burrs are dull and replacement is the next step.',
      },
      {
        question: 'Should I upgrade to the Encore ESP burrs?',
        answer:
          'The Encore ESP has different burrs (M2-style conical) optimized for espresso fine ranges. They do not retrofit easily onto a base Encore — the ESP is a different unit. If your use case shifted toward espresso, replace the unit, not the burrs.',
      },
      {
        question: 'My Encore was bought used — how do I know its age?',
        answer:
          'Baratza serial numbers (printed on the bottom plate) encode manufacture date. Email Baratza support with the serial number — they will confirm the manufacture year, which gives you a usage estimate to compare against the 500 lb burr life.',
      },
      {
        question: 'Is the Baratza service program worth it for the Encore at this price point?',
        answer:
          'Borderline. At $40-80 for service + return shipping, you are 25-50% of the new-unit cost. For sentimental units or if you specifically want to avoid e-waste, yes. For pure cost-effectiveness, replacement burrs first, then if those do not fix it, a new Encore is often cleaner than service.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-season-grinder-burrs'],
  },
  // ============================================================
  // RANCILIO — Silvia thermometer mod
  // ============================================================
  {
    slug: 'rancilio-silvia-thermometer-mod',
    title: 'Rancilio Silvia thermometer mod — temperature surfing vs. PID upgrade',
    description:
      'The Silvia thermometer mod explained: what it tells you, how it relates to temperature surfing, and whether to mod-then-PID or go directly to a Silvia Pro X.',
    productAsin: 'B0BQYMTBNL',
    category: 'modification',
    problem: 'You have read about the Rancilio Silvia "thermometer mod" or "temperature surfing" but are not sure whether to install a temperature gauge, install a PID controller, or upgrade to the Silvia Pro X (which has a PID built-in).',
    tldrFix:
      'The thermometer mod is a $25 mechanical thermometer that taps into the boiler so you can see brew temperature in real time. Useful for "temperature surfing" (timing shots to peak temp). The PID upgrade ($150-200 kit) automates this. The Silvia Pro X ships with a factory PID for ~$400 more than a V6 — if you are buying new, often a better path than V6 + PID retrofit.',
    diagnostics: [
      'Which Silvia do you have? V6 (no PID) or Pro X (factory PID)? If Pro X, neither mod is relevant.',
      'Do you experience inconsistent shot taste at the same recipe? Temperature variability is one of the top 3 causes (along with grind shift and bean age).',
      'Are you comfortable with a soldering iron and basic electrical work? PID kits require both.',
      'What is your budget? Thermometer mod: $25. PID kit + install: $150-300. Pro X upgrade vs. V6: $400.',
    ],
    causes: [
      {
        cause: 'Why the Silvia V6 has temperature variability',
        explanation:
          'The V6 uses a bimetal thermostat to control the boiler — heat on until 105°C, off until 95°C, repeat. This 10°C swing means your brew water temperature depends on when in the cycle you pull the shot. Pull during the heat-on phase → over-temp espresso (harsh, bitter). Pull during the heat-off phase → under-temp (sour, thin).',
        fix:
          '<p>Context, not a fix. Three solutions follow below.</p>',
      },
      {
        cause: 'Thermometer mod (mechanical solution)',
        explanation:
          'Install a mechanical thermometer that reads from the boiler directly. You watch the gauge and time your shot to the peak of the heat cycle — "temperature surfing". Does not fix the underlying swing, just gives you visibility to work around it.',
        fix:
          '<p>Kit: Auber Instruments and EspressoParts sell Silvia-specific thermometer kits for ~$25-30. Install: drill a small hole in the chassis, screw the thermometer fitting into the boiler\'s steam thermostat port (the steam thermostat is removed temporarily), reinstall. Warranty void on a new Silvia; on an older machine, low risk.</p>',
      },
      {
        cause: 'PID controller retrofit (electronic solution)',
        explanation:
          'A PID (Proportional-Integral-Derivative) controller replaces the bimetal thermostat with electronic temperature control, holding the boiler within ±1°C instead of the stock 10°C swing. Auber Instruments sells a Silvia-specific PID kit (~$150-200) that requires soldering and chassis modification.',
        fix:
          '<p>Buy the Auber SYL-2362A2 Silvia kit (the most commonly used). Watch the Home-Barista tutorial threads — there are step-by-step photos. Installation takes 2-3 hours for someone comfortable with electronics, longer for first-timers. Warranty void. The PID is the most impactful single mod for shot consistency on the V6.</p>',
      },
      {
        cause: 'Upgrade to Silvia Pro X (no mod required)',
        explanation:
          'Rancilio released the Silvia Pro X with a factory PID and a dual-boiler architecture (separate boilers for brew and steam). At ~$1000 vs. the V6\'s $600, the Pro X delivers what V6 + PID retrofit + thermometer mod give you, but with full warranty, factory engineering, and steam-on-demand. If you are considering both mods, the Pro X is usually the better path.',
        fix:
          '<p>Sell the V6 (used Silvias hold value well — ~$300-400 on the used market), buy the Pro X. Total swap cost typically $400-500.</p>',
      },
    ],
    whenToEscalate:
      'If your Silvia is under warranty (first year), do not install either mod — it voids the warranty. If you are not comfortable with electronics, the PID install is not a beginner project; hire a service tech (~$100 install on top of the $150 kit cost). If you are buying new with the intent to immediately PID, the Silvia Pro X is almost always the better total-cost-of-ownership choice.',
    replacementParts: [
      {
        item: 'Auber Instruments Silvia thermometer kit',
        note:
          'Direct from auberins.com. ~$25-30. Includes the thermometer, mounting fittings, and instructions specific to the Silvia.',
      },
      {
        item: 'Auber Instruments Silvia PID kit',
        note:
          'Direct from auberins.com. ~$150-200 depending on PID model and accessories. Requires soldering and chassis modification.',
      },
    ],
    faqs: [
      {
        question: 'How much does the PID actually improve shots?',
        answer:
          'Most Home-Barista users report a noticeable consistency improvement — shots-at-the-same-recipe taste closer together. For light roasts (which want tighter temperature control), the improvement is bigger. For dark roasts, smaller. Not a magic bullet, but a real, repeatable improvement.',
      },
      {
        question: 'Is temperature surfing without a thermometer reliable?',
        answer:
          'Borderline. The "heat-on light cycle" is roughly predictable on a warmed-up Silvia (light off → wait 30s → pull) but ambient temperature, idle time, and the exact age of the thermostat shift the timing. With the thermometer mod, you stop guessing.',
      },
      {
        question: 'Does the PID mod work on the Silvia Pro X?',
        answer:
          'No — the Pro X already has a factory PID and modifying further is both unnecessary and likely to break things. If you have the Pro X, neither mod applies.',
      },
      {
        question: 'Can I install both the thermometer and PID?',
        answer:
          'Yes — the thermometer reads boiler temp visually, the PID controls it electronically. They occupy different chassis spaces (thermometer at the front, PID controller usually mounted in the existing thermostat housing). Some Silvia owners install both for redundancy and visual feedback during shots.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-dial-in-espresso'],
  },
  // ============================================================
  // GENERIC — burrs scraping / common grinder errors
  // ============================================================
  {
    slug: 'grinder-burrs-scraping',
    title: 'Grinder burrs scraping each other — alignment and shimming',
    description:
      'When grinder burrs scrape or grind against each other (metallic sound during operation): the causes, the alignment check, and when shimming helps vs. when the burrs are damaged.',
    category: 'grinder',
    problem: 'A grinder makes a metallic scraping or grinding noise during operation — either continuously or intermittently — even when empty of beans.',
    tldrFix:
      'Burr scrape almost always means the burrs are too close to each other (over-adjusted). Open the grind setting 2-3 steps coarser and re-test. If scrape persists at maximum coarseness, you have a real alignment issue.',
    diagnostics: [
      'At what grind setting does the scrape happen? If only at very fine settings, the burrs are simply too close — coarsen up.',
      'Empty the grinder and run it dry. Does the scrape continue without beans? If yes, alignment issue. If no, the issue is between burrs and beans (popcorning or bean fragments).',
      'Has the grinder been dropped recently? Drops can misalign or chip burrs.',
      'When were the burrs last cleaned? Buildup in the burr threads can shift the zero point.',
      'Open the burr chamber and inspect: are the burr edges chipped, dented, or visibly warped? Visible damage = replace, not realign.',
    ],
    causes: [
      {
        cause: 'Over-fine grind setting (most common)',
        explanation:
          'Most grinders use a threaded adjustment ring that moves the burrs closer together at finer settings. At the absolute finest setting (or below the user-accessible zero), the burrs physically touch. Some grinders allow this; most do not and the scrape is the warning.',
        fix:
          '<p>Coarsen the grind setting by 2-3 steps. If the scrape stops, you were simply past the safe limit. Many grinders ship with a "calibration" or "zero" procedure documented in the manual — recalibrate the zero point so the user-visible "1" setting is just above touching, not below.</p>',
      },
      {
        cause: 'Burr buildup shifting the alignment',
        explanation:
          'Coffee oils and very fine particles can build up in the burr threads, on the burr-mounting surfaces, or in the alignment housing. This effectively raises the burr a fraction of a millimeter — the "zero" shifts and the user-visible scale no longer matches the real burr position. Result: a setting that worked last month now scrapes.',
        fix:
          '<p>Remove the burrs (most grinders have an access cover). Clean both burr surfaces and the mounting cup thoroughly — use a soft brush, then a microfiber. Wipe the alignment threads. Reinstall, recalibrate the zero. The scrape should disappear.</p>',
      },
      {
        cause: 'Burr alignment off-axis (requires shimming)',
        explanation:
          'Some grinders ship with the upper or lower burr slightly tilted relative to the rotation axis — not enough to scrape at most settings, but enough to scrape at fine settings on one side. This is a manufacturing tolerance issue, most common on lower-tier grinders ($150-400 range).',
        fix:
          '<p>Shimming. Place a thin shim (paper, plastic foil, dedicated alignment shim) under the high side of the burr to tilt it back to true. The home-barista community has extensive shimming guides for popular grinders (Eureka, DF64). This is intermediate DIY — comfortable with mechanical adjustment. If unsure, contact the manufacturer; some will exchange under warranty if alignment is significantly off.</p>',
      },
      {
        cause: 'Damaged burrs (after a drop or foreign object)',
        explanation:
          'A stone or piece of debris in the beans can chip a burr edge. A chipped burr makes a distinct "clack-clack" sound at every rotation, not a continuous scrape. Dropped grinders can also bend the burr mount.',
        fix:
          '<p>Inspect the burrs visibly. Chips or dents = replace. Most grinder manufacturers sell replacement burr sets for $30-80. Aftermarket burrs (SSP for premium grinders) cost more but can be an upgrade rather than just a fix.</p>',
      },
    ],
    whenToEscalate:
      'If the grinder is under warranty: contact the manufacturer first. Persistent burr scrape on a new grinder is almost always a warranty case — they will either send replacement burrs, calibration shims, or RMA the unit. Shimming is a real and accepted fix for some manufacturing tolerances, but a new grinder should not require the user to shim it. For out-of-warranty grinders, basic shimming is DIY-friendly with online guides; replacement burrs are 15-30 minute installs.',
    replacementParts: [
      {
        item: 'Replacement burr set (manufacturer-specific)',
        note:
          'OEM burrs from the grinder maker — $30-80 typically. For an upgrade rather than fix, SSP or other aftermarket burrs (espresso-optimized geometries) cost $100-200 and require specific compatibility.',
      },
      {
        item: 'Alignment shims (per-grinder, often included free from manufacturer)',
        note:
          'Many manufacturers will ship shims under warranty. Aftermarket shim kits exist for DF64, Eureka, and other popular grinders for $5-15.',
      },
    ],
    faqs: [
      {
        question: 'Is some burr noise normal during grinding?',
        answer:
          'Yes — burrs cutting beans make a distinct crunching/whirring sound. What is NOT normal is a metallic "scraping" or "shrieking" sound that continues with no beans in the chamber. The difference is roughly: the normal sound varies with beans; the scrape sound is constant.',
      },
      {
        question: 'My new grinder scrapes only at the finest setting — defective?',
        answer:
          'Possibly, possibly not. Many grinders document that the "1" setting is below the safe minimum and intended only for manual recalibration. Check your manual. If the manual says "1" should be usable for espresso and your grinder scrapes there, contact the manufacturer.',
      },
      {
        question: 'Do I need a feeler gauge to align burrs?',
        answer:
          'Not for the basic check — you can verify alignment by hand-rotating the burrs slowly with the grinder unplugged and feeling for binding. For precision shimming on espresso grinders, a feeler gauge or printed paper shim guide is helpful. $10 on Amazon.',
      },
      {
        question: 'After fixing alignment, do I need to re-season the burrs?',
        answer:
          'Usually not — seasoning is for breaking in new burr edges, not for restoring alignment. After fixing alignment, the existing burrs (assuming undamaged) should perform as before within a few doses.',
      },
    ],
    updatedAt: '2026-05-15',
    relatedHowToSlugs: ['how-to-season-grinder-burrs'],
  },
];

// Index helpers — para internal linking y agrupamiento.
export const TROUBLESHOOT_CATEGORIES: Record<TroubleshootPage['category'], string> = {
  'no-water': 'Water flow',
  'no-steam': 'Steam',
  leaking: 'Leaks',
  'no-heat': 'Heating',
  modification: 'Modifications',
  technique: 'Technique',
  grinder: 'Grinders',
  electrical: 'Electrical',
};

export function troubleshootBySlug(slug: string): TroubleshootPage | undefined {
  return troubleshootPages.find((p) => p.slug === slug);
}

export function troubleshootsForProduct(asin: string): TroubleshootPage[] {
  return troubleshootPages.filter((p) => p.productAsin === asin);
}
