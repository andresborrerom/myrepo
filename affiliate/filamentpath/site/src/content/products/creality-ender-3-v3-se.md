---
asin: "FILAMOCK004"
name: "Creality Ender-3 V3 SE"
brand: "Creality"
type: "printer"
price: 199
price_tier: "budget"
features:
  build_volume: "220x220x250mm"
  xy_resolution: "0.1-0.4mm layer"
  max_print_speed: "250mm/s"
  bed_temp_max: 100
  nozzle_temp_max: 260
  compatible_materials:
    - "PLA"
    - "PLA+"
    - "PETG"
    - "TPU"
  enclosed: false
  direct_drive: true
  auto_bed_leveling: true
pros:
  - "Sub-$200 entry with CR-Touch auto-leveling included by default"
  - "Direct-drive Sprite-style extruder handles TPU at moderate speeds"
  - "Standard 220x220x250 bed footprint with broad community profile support"
  - "Spare parts and replacement components widely available"
cons:
  - "Bed-slinger architecture limits realistic speed under quality constraints"
  - "PEI build plate quality varies between batches"
  - "Default Creality firmware lags Bambu / Prusa on usability polish"
tags:
  - "budget"
  - "open-source-friendly"
  - "fdm"
  - "community-supported"
best_for:
  - "first 3D printer on a tight budget"
  - "users who want to tinker (Klipper-friendly community)"
  - "spare-parts availability and modding"
updated_at: 2026-05-26
---

The Ender-3 V3 SE is Creality's response to the auto-calibration baseline that Bambu set with the A1 mini. CR-Touch bed leveling is standard, the extruder is now direct-drive in a Sprite-style form factor, and the price still lands under $200. For users entering FDM with a budget hard ceiling, it remains the segment's reference for "good enough out of the box".

Honesty check on the spec sheet: the claimed 250mm/s peak is an idealized maximum. Realistic throughput at PLA quality settings sits well below that, comparable to most printers in this tier. Where the Ender-3 V3 SE earns its position is in the parts ecosystem — replacement hotends, nozzles, build plates, and firmware (Klipper, OctoPrint configs) are abundantly available and well-documented.

The trade-off vs the Bambu A1 mini at $50 more is polish vs. flexibility. The A1 mini gets you printing faster with less friction; the Ender invites tinkering and is happier in a community-driven workflow. Neither is the wrong answer; the question is whether the buyer wants to print or to print and learn the machine.

<!-- TODO: verify spec — bed temperature max is reported as 100C in current Creality datasheets, but earlier V3 SE revisions shipped at 80C. Confirm against the unit's serial-number revision before publishing. -->
