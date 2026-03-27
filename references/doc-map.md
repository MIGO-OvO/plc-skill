# Local docs map

Use this file to orient yourself in the current local documentation tree before asking for outside sources.

## Core knowledge-base entry

Primary local entry:

- `D:\GitHub projects\PLC_SKILL\docs\PLC_SKILL_KB`

## Current top-level structure

- `01_vendor_mitsubishi`
  - `communication_and_special_modules`
  - `fx3u_hardware`
  - `fxcpu_structured_programming`
  - `fx_series_programming`
  - `gxworks2_structured_project`
- `02_standards`
  - `iec_61131_3`
- `03_guidelines`
  - `plcopen`
- `04_reference_pages`
  - `official_html_snapshots`
- `05_indexes`
  - `collection_report.md`
  - `manifest.csv`
  - `manifest.md`
- `99_inbox_unsorted`

## Lookup strategy

Choose the narrowest relevant area first:

- Device behavior, instruction behavior, FX-series details -> `01_vendor_mitsubishi\fx_series_programming`
- FX3U hardware boundaries or hardware characteristics -> `01_vendor_mitsubishi\fx3u_hardware`
- Structured programming on Mitsubishi CPUs -> `01_vendor_mitsubishi\fxcpu_structured_programming`
- GX Works2 structured engineering and organization -> `01_vendor_mitsubishi\gxworks2_structured_project`
- Standard language semantics -> `02_standards\iec_61131_3`
- Architecture, naming, and structured design guidance -> `03_guidelines\plcopen`
- Official snapshot pages or extracted reference pages -> `04_reference_pages\official_html_snapshots`

## If evidence is still insufficient

State which category is missing, for example:

- missing exact instruction reference
- missing GX Works2 project-organization detail
- missing ST platform-specific limitation note
- missing hardware wiring or I/O assignment confirmation
- missing project-local naming or addressing convention
