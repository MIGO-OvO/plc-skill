# Knowledge map

Use this file to choose the narrowest bundled reference area before relying on outside material.

## Primary knowledge areas in this skill

- Mitsubishi platform rules -> `references/mitsubishi-fx3u-rules.md`
- FX3U device and instruction notes -> `references/fx3u-device-and-instruction-notes.md`
- GX Works2 structured project basics -> `references/gxworks2-structured-project.md`
- GX Works2 structured project deeper review notes -> `references/gxworks2-structured-project-deep-notes.md`
- Review and project-structure patterns -> `references/gxworks2-project-review-patterns.md`
- ST style and output guidance -> `references/st-style-guide.md`, `references/st-output-style.md`
- Alarm, interlock, scan-cycle, and ownership patterns -> `references/alarm-and-interlock-patterns.md`, `references/scan-cycle-and-output-ownership.md`
- Debug and review workflow stack -> `references/debugging-and-review.md` (workflow), `references/debugging-checklists.md` (debugging checklists), `references/code-review-checklists.md` (review checklists), `references/gxworks2-project-review-patterns.md` (GX Works2 project patterns)
- Standards and architecture guidance -> `references/plcopen-and-iec-notes.md`
- Input incompleteness, fallback, and safety constraints -> `references/input-completeness-rules.md`, `references/response-fallback-rules.md`, `references/safety-boundaries.md`
- Output structure and template selection -> `references/output-format.md`, `references/program-templates.md`, `templates/template-map.md`

## Lookup strategy

Choose the narrowest relevant area first:

- Device behavior, instruction behavior, FX-series details -> `references/fx3u-device-and-instruction-notes.md`
- FX3U platform boundaries or Mitsubishi-specific rules -> `references/mitsubishi-fx3u-rules.md`
- Structured programming on Mitsubishi CPUs -> `references/gxworks2-structured-project.md`, `references/gxworks2-structured-project-deep-notes.md`
- GX Works2 engineering organization or review -> `references/gxworks2-project-review-patterns.md`
- Standard language semantics or architecture justification -> `references/plcopen-and-iec-notes.md`
- Output ownership, scan-cycle conflicts, alarm/reset behavior -> `references/scan-cycle-and-output-ownership.md`, `references/alarm-and-interlock-patterns.md`
- Request classification and output shape -> `references/task-router.md`, `references/output-format.md`

## If evidence is still insufficient

State which category is missing, for example:

- missing exact Mitsubishi instruction confirmation
- missing GX Works2 project-organization detail
- missing ST platform-specific limitation note
- missing hardware wiring or I/O assignment confirmation
- missing project-local naming or addressing convention
