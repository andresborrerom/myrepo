---
asin: "FILAMOCK002"
name: "Bambu Lab A1"
brand: "Bambu Lab"
type: "printer"
price: 399
price_tier: "mid"
features:
  build_volume: "256x256x256mm"
  xy_resolution: "0.05-0.4mm layer"
  max_print_speed: "500mm/s"
  bed_temp_max: 100
  nozzle_temp_max: 300
  compatible_materials:
    - "PLA"
    - "PLA+"
    - "PETG"
    - "TPU"
  enclosed: false
  direct_drive: true
  auto_bed_leveling: true
pros:
  - "256mm cube build volume covers most hobbyist functional parts"
  - "Inherits A1 mini auto-calibration and quick-swap hotend"
  - "AMS lite slot integration for 4-color printing without enclosure cost"
  - "Bed temperature reaches 100C for reliable PETG adhesion"
cons:
  - "Bed-slinger architecture (Y on bed) caps achievable speeds vs CoreXY at the price"
  - "No enclosure, so ABS / ASA still off the table"
  - "Same Bambu-ecosystem lock-in as the A1 mini"
tags:
  - "mid-volume"
  - "auto-calibration"
  - "fdm"
  - "multi-color-capable"
best_for:
  - "PLA and PETG functional parts"
  - "users upgrading from a tight 220mm bed"
  - "4-color printing with AMS lite"
updated_at: 2026-05-26
---

The Bambu Lab A1 is the natural step up from the A1 mini when build volume becomes the bottleneck. The 256mm cube unlocks tabletop terrain, larger functional parts, and longer single-piece prints without sacrificing the auto-calibration story that made the A1 mini popular.

Architecturally it is a bed-slinger (the Y axis lives in the bed), which puts a practical ceiling on speed regardless of what the slicer profile claims. The advertised 500mm/s is a peak figure under idealized conditions; honest mileage in PLA at acceptable quality is typically lower, and the same is true of every machine in this category.

Compared to the A1 mini, the upgrades that matter most are bed volume and bed temperature (100C makes PETG adhesion noticeably less finicky). Compared to a CoreXY like the P1S at the next price tier, the trade-off is enclosure and acceleration — the A1 is the right pick if you print mostly PLA / PETG in an open setup and want to avoid the next $300 jump.
