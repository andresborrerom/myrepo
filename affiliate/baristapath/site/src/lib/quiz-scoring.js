// Quiz scoring para "Which espresso machine should I buy?"
//
// Extraído del JS inline de src/pages/quiz/which-espresso-machine.astro
// para que se pueda testear con node:test sin levantar un browser.
//
// Convenciones:
// - El catálogo se PASA como parámetro a las funciones (no import). Así
//   el módulo es side-effect free y testeable con fixtures.
// - Cero deps de Node — solo objetos puros. El bundle de Astro lo
//   incluye en el script del browser sin transformaciones extras.
// - Comments en español (CLAUDE.md). API names + reasons strings en
//   inglés (contenido publicado).
//
// Si tuneás pesos acá, los tests de test/quiz.spec.js te avisan si
// rompiste uno de los escenarios canónicos.

// Mapa de budget answer → rango {min, max} en USD.
export function budgetBounds(a) {
  if (a === 'under-300') return { min: 0, max: 300 };
  if (a === '300-700') return { min: 300, max: 700 };
  if (a === '700-1500') return { min: 700, max: 1500 };
  if (a === '1500-3000') return { min: 1500, max: 3000 };
  if (a === 'over-3000') return { min: 3000, max: 100000 };
  return { min: 0, max: 100000 };
}

// Score crudo: cuánto encaja un producto con las respuestas del usuario.
// Devuelve {score:number, reasons:string[]} — reasons explica los hits
// positivos para mostrar en la UI ("why this pick").
export function scoreProduct(product, answers) {
  const p = product;
  const a = answers;
  let s = 0;
  const why = [];
  const b = budgetBounds(a.budget);

  // Budget — 35% buffer for grinder when not integrated. Floor only
  // penaliza en los tiers bajos (under-300/300-700) para no rechazar
  // máquinas baratas de nicho (Flair, Cafelat Robot) a presupuesto alto.
  const mb = p.hasGrinder ? b.max * 0.9 : b.max * 0.65;
  const fl = (a.budget === 'under-300' || a.budget === '300-700')
    ? (p.hasGrinder ? b.min * 0.7 : b.min * 0.4)
    : 0;
  if (p.price <= mb && p.price >= fl) {
    s += 10;
    why.push('fits your budget');
  } else if (p.price > b.max * 1.3) {
    s -= 20;
  } else if (p.price > mb) {
    s -= 8;
  }

  // Experience
  const e = a.experience;
  if (e === 'total-beginner') {
    if (p.bestForBeginners) { s += 5; why.push('beginner-friendly workflow'); }
    if (p.machineCat === 'manual-lever') s -= 8;
    if (p.priceTier === 'pro') s -= 6;
  } else if (e === 'some') {
    if (p.bestForBeginners) s += 3;
    if (p.machineCat === 'manual-lever') s -= 3;
  } else if (e === 'intermediate') {
    if (p.machineCat === 'semi-auto') { s += 3; why.push('semi-auto suits intermediate'); }
    if (p.hasPid) s += 2;
  } else if (e === 'advanced') {
    if (p.priceTier === 'pro') { s += 5; why.push('prosumer ceiling matches your level'); }
    if (p.hasPid) s += 3;
    if (p.machineCat === 'manual-lever') s += 4;
    if (p.bestForBeginners && p.priceTier === 'budget') s -= 4;
  }

  // Drinks
  const d = a.drinks;
  if (d === 'espresso') {
    if (p.machineCat === 'manual-lever') { s += 5; why.push('lever excels at straight espresso'); }
    if (p.milkCap === 'manual-wand' || p.milkCap === 'none') s += 2;
    if (p.milkCap === 'auto') s -= 2;
    if (p.type === 'brewer') s -= 4;
  } else if (d === 'milk') {
    if (p.milkCap === 'auto') { s += 8; why.push('auto milk frother handles texture for you'); }
    if (p.milkCap === 'manual-wand') { s += 4; why.push('manual steam wand for proper microfoam'); }
    if (p.milkCap === 'panarello') s -= 1;
    if (p.milkCap === 'none') s -= 6;
    if (p.type === 'brewer') s -= 8;
  } else if (d === 'mix') {
    if (p.milkCap === 'manual-wand' || p.milkCap === 'auto') {
      s += 4;
      why.push('handles both straight and milk drinks');
    }
    if (p.milkCap === 'none') s -= 3;
  } else if (d === 'filter') {
    if (p.type === 'brewer') { s += 8; why.push('right tool for filter coffee'); }
    else s -= 12;
  }

  // Volume
  const v = a.volume;
  if (v === '5plus') {
    if (p.machineCat === 'super-auto') s += 4;
    if (p.machineCat === 'manual-lever') s -= 6;
    if (p.priceTier === 'pro' && p.machineCat !== 'manual-lever') {
      s += 4;
      why.push('built for back-to-back drinks');
    }
  } else if (v === '3-4') {
    if (p.machineCat === 'manual-lever') s -= 2;
  } else if (v === '1-2') {
    if (p.timeProfile === 'fast' || p.footprint === 'small' || p.footprint === 'tiny') s += 2;
  }

  // Space
  const sp = a.space;
  if (sp === 'tiny') {
    if (p.footprint === 'tiny') { s += 8; why.push('fits very tight counters'); }
    else if (p.footprint === 'small') s += 4;
    else if (p.footprint === 'large') s -= 10;
  } else if (sp === 'small') {
    if (p.footprint === 'tiny' || p.footprint === 'small') { s += 5; why.push('compact footprint'); }
    if (p.footprint === 'large') s -= 6;
  } else if (sp === 'large') {
    if (p.footprint === 'large') s += 3;
  }

  // Time
  const t = a.time;
  if (t === '1-2min') {
    if (p.timeProfile === 'fast') { s += 6; why.push('fast workflow start to finish'); }
    if (p.timeProfile === 'manual') s -= 12;
    if (p.timeProfile === 'slow') s -= 6;
  } else if (t === '3-5min') {
    if (p.timeProfile === 'fast' || p.timeProfile === 'medium') s += 4;
    if (p.timeProfile === 'manual') s -= 4;
  } else if (t === '5-10min') {
    if (p.timeProfile === 'medium' || p.timeProfile === 'slow') {
      s += 4;
      why.push('matches your ritual length');
    }
  } else if (t === '10plus') {
    if (p.timeProfile === 'manual') { s += 10; why.push('manual workflow you said you wanted'); }
    else if (p.timeProfile === 'slow') s += 4;
    else if (p.timeProfile === 'fast') s -= 4;
  }

  // Control
  const c = a.control;
  if (c === 'max-auto') {
    if (p.machineCat === 'super-auto') { s += 10; why.push('full bean-to-cup automation'); }
    else if (p.machineCat === 'all-in-one' && p.milkCap === 'auto') s += 6;
    if (p.machineCat === 'manual-lever') s -= 12;
  } else if (c === 'some-auto') {
    if (p.machineCat === 'all-in-one') { s += 6; why.push('assisted workflow with control over dose'); }
    if (p.machineCat === 'super-auto') s += 2;
    if (p.machineCat === 'manual-lever') s -= 6;
  } else if (c === 'full-control') {
    if (p.machineCat === 'semi-auto') { s += 8; why.push('semi-auto gives you the dials you want'); }
    if (p.hasPid) s += 2;
    if (p.machineCat === 'super-auto') s -= 4;
  } else if (c === 'pure-manual') {
    if (p.machineCat === 'manual-lever') { s += 12; why.push('lever puts the pump in your hands'); }
    if (p.machineCat === 'super-auto') s -= 12;
    if (p.machineCat === 'all-in-one') s -= 6;
  }

  // De-dup why preservando orden de inserción.
  const seen = {};
  const out = [];
  for (let i = 0; i < why.length; i++) {
    if (!seen[why[i]]) { seen[why[i]] = 1; out.push(why[i]); }
  }
  return { score: s, reasons: out };
}

// Caveats — anti-gray-hat. Mensajes que se muestran cuando las
// respuestas indican que NO comprar (o reconsiderar) es la mejor opción.
// topScore = score del top pick antes de aplicar caveats (puede ser
// negativo o muy bajo, en cuyo caso agregamos un caveat genérico).
export function buildCaveats(answers, topScore) {
  const a = answers;
  const n = [];
  if (a.control === 'max-auto' && a.time === '10plus') {
    n.push('You asked for maximum automation and also for 10+ minutes per drink. Those point at different machines — a super-automatic finishes in under 90 seconds, while a 10-minute workflow implies manual lever pulls. Pick the one that actually matches the kitchen morning you want.');
  }
  if (a.control === 'pure-manual' && a.time === '1-2min') {
    n.push('Pure manual lever pulls (Robot, Flair) take 4 to 7 minutes including pre-heat and clean-up. If you really need a drink in 1 to 2 minutes, drop "pure manual" or accept the machine will spend most days unused.');
  }
  if (a.drinks === 'milk' && a.budget === 'under-300') {
    n.push('Milk drinks need a real steam wand or auto frother, both of which raise the floor to roughly $300 even with a thrifted grinder. Under $300 a milk frother + Moka pot combo gets you an honest cappuccino; a sub-$300 "espresso machine" with milk usually disappoints.');
  }
  if (a.budget === 'under-300' && a.drinks === 'espresso' && a.control !== 'pure-manual') {
    n.push('No push-button machine pulls real 9-bar espresso under $200. Your honest options are a Flair Classic Signature ($119, manual lever) or an AeroPress + Moka pot combo while you save for $400 to $500. We refuse to recommend a $139 pressurized-basket "espresso machine" as a real espresso solution.');
  }
  if (a.experience === 'total-beginner' && (a.budget === '1500-3000' || a.budget === 'over-3000')) {
    n.push('Beginner plus a $1,500+ budget works, but the ROI on the difference between a $700 setup and a $3,000 setup is mostly emotional. You will not pull better shots on day 30. Consider buying mid-range now and upgrading in 18 months if you stick with it.');
  }
  if (a.drinks === 'filter') {
    n.push('You said "mostly filter". An espresso machine is the wrong tool. The quiz pushed brewers (AeroPress, Moka pot) to the top, but our methodology page lists pour-over and drip recommendations too.');
  }
  if (topScore < 5 && n.length === 0) {
    n.push('No machine in our catalog scores well against your combination. Your answers point at a niche the catalog does not cover (yet). Treat the picks below as the least-bad fit, not as endorsements.');
  }
  return n;
}

// Categorías que el usuario debería skip dadas sus respuestas.
// Devuelve hasta 2 items para no abrumar.
export function buildSkipCategories(answers) {
  const a = answers;
  const k = [];
  if (a.control === 'pure-manual' || a.control === 'full-control') {
    k.push('Super-automatics — you said you want control, those hide every variable.');
  }
  if (a.control === 'max-auto') {
    k.push('Manual lever machines — they are the opposite of one-button.');
  }
  if (a.space === 'tiny') {
    k.push('Prosumer dual boilers and Linea Mini — they will not fit.');
  }
  if (a.experience === 'total-beginner' && a.budget !== 'over-3000') {
    k.push('Prosumer dual boilers — overkill for month one, you can upgrade later.');
  }
  if (a.drinks === 'espresso' && a.experience !== 'total-beginner') {
    k.push('Super-automatics — they cap extraction below what a semi-auto + grinder hits.');
  }
  if (a.drinks === 'filter') {
    k.push('All espresso machines — you said filter is your daily drink.');
  }
  return k.slice(0, 2);
}

// Pipeline completo: scoring + ranking + caveats + skip categories.
// Devuelve el shape que la UI consume directamente.
//
// Returns: {
//   topPick:   {product, score, reasons} | null,
//   alternates: [{product, score, reasons}, ...]  // typically 2
//   caveats:    string[],
//   skipCategories: string[],
// }
export function pickRecommendations(answers, catalog) {
  const scored = catalog.map((p) => {
    const r = scoreProduct(p, answers);
    return { product: p, score: r.score, reasons: r.reasons };
  });
  // Sort descendente por score; estable suficiente para tests porque
  // el catalog tiene un orden estable.
  scored.sort((x, y) => y.score - x.score);

  const topPick = scored[0] ?? null;
  const alternates = scored.slice(1, 3);
  const topScore = topPick ? topPick.score : -100;

  return {
    topPick,
    alternates,
    caveats: buildCaveats(answers, topScore),
    skipCategories: buildSkipCategories(answers),
  };
}
