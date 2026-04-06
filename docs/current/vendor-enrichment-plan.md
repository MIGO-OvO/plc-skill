# Vendor Knowledge Base Enrichment Plan

**Goal**: Enrich all vendor modules to the same depth as Mitsubishi, using only official technical manuals and documentation.

**Start**: 2026-04-06 15:45 GMT+8

## Target Vendors (Priority Order)

1. **Siemens** (already has structure, needs depth)
2. **Rockwell/Allen-Bradley** (has cheatsheet, needs manuals)
3. **Omron** (has cheatsheet, needs manuals)
4. **Schneider** (skeleton only)
5. **Beckhoff** (has cheatsheet, needs TwinCAT depth)
6. **Codesys** (skeleton only, but critical for many platforms)
7. **Delta** (skeleton only)
8. **Keyence** (skeleton only)
9. **Panasonic** (skeleton only)

## Required Deliverables per Vendor

### Documentation Structure
- `official-doc-index.md` - Index of official manuals with download links/references
- `<vendor>-<series>-rules.md` - Core programming rules (like mitsubishi-rules.md)
- `<vendor>-device-and-instruction-notes.md` - Memory model, addressing, instruction quirks
- `<vendor>-project-structure.md` - IDE/software project organization
- `<vendor>-structured-programming.md` - ST/FBD/SFC specifics for that platform
- `<vendor>-debugging-patterns.md` - Common debugging workflows

### Knowledge Base (docs/PLC_SKILL_KB/)
- Create `01_vendor_<vendor>/` directory
- Collect official PDFs:
  - Hardware manuals
  - Programming manuals
  - Instruction reference
  - Software/IDE user guides
  - Communication modules (if applicable)

## Execution Strategy

1. Search for official vendor documentation portals
2. Download/reference key manuals (hardware, programming, instruction set)
3. Extract and synthesize rules into reference markdown files
4. Create official-doc-index.md with proper citations
5. Update vendor-routing.md and vendor-recognition-signals.md if needed
6. Create examples in examples/vendors/<vendor>/ if patterns differ significantly

## Progress Tracking

- [ ] Siemens
- [ ] Rockwell/Allen-Bradley
- [ ] Omron
- [ ] Schneider
- [ ] Beckhoff
- [ ] Codesys
- [ ] Delta
- [ ] Keyence
- [ ] Panasonic

## Notes

- Focus on most common/current series first (e.g., S7-1200/1500 for Siemens, ControlLogix for Rockwell)
- Maintain same evidence priority: official docs > standards > community
- Keep clean separation: vendor-specific rules stay in vendor folders
- Do not duplicate common PLC patterns that already exist in references/common/

---

**Status**: In progress
**Last updated**: 2026-04-06 15:45 GMT+8
