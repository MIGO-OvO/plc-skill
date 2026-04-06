# Reference map

Use this file to choose the narrowest bundled reference area for a given question or task.

## By question type

- FX3U devices, timers, counters, relays, registers, or instruction behavior
  - `references/fx3u-device-and-instruction-notes.md`
  - `references/mitsubishi-rules.md`

- GX Works2 structured project organization, module split, or maintainability
  - `references/gxworks2-structured-project.md`
  - `references/gxworks2-structured-project-deep-notes.md`
  - `references/gxworks2-project-review-patterns.md`

- ST style, code shape, naming, or output structure
  - `references/st-style-guide.md` â€?naming, variable declarations, code organization
  - `references/st-output-style.md` â€?response output format and presentation
  - `references/output-format.md`

- Alarm latch/reset, interlock, or protection logic
  - `references/alarm-and-interlock-patterns.md`
  - `templates/alarm-latch-reset-template.md`
  - `templates/alarm-interlock-module-template.md`

- Scan-cycle behavior, overwritten outputs, or hidden write conflicts
  - `references/scan-cycle-and-output-ownership.md`
  - `templates/output-ownership-review-template.md`

- Debug workflow or likely fault isolation
  - `references/debugging-and-review.md` â€?workflow first
  - `references/debugging-checklists.md` â€?fault-path checklist second

- Review, refactor, maintainability, or ownership cleanup
  - `references/debugging-and-review.md` â€?workflow first
  - `references/code-review-checklists.md` â€?review checklist second
  - `references/gxworks2-project-review-patterns.md` â€?if issue is structural

- Standards-level structuring or justification
  - `references/plcopen-and-iec-notes.md`

- Incomplete requests, ambiguity, or confidence downgrade
  - `references/input-completeness-rules.md`
  - `references/response-fallback-rules.md`
  - `references/scope-and-trigger-rules.md`

- Safety-sensitive questions
  - `references/safety-boundaries.md`
  - `references/response-fallback-rules.md`

## By knowledge area

- Mitsubishi platform rules -> `references/mitsubishi-rules.md`
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

## If evidence is still insufficient

State which category is missing, for example:

- missing exact Mitsubishi instruction confirmation
- missing GX Works2 project-organization detail
- missing ST platform-specific limitation note
- missing hardware wiring or I/O assignment confirmation
- missing project-local naming or addressing convention

