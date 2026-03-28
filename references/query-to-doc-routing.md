# Query to knowledge routing

Use this file to map question types to the right bundled references.

## By question type

- FX3U devices, timers, counters, relays, registers, or instruction behavior
  - `references/fx3u-device-and-instruction-notes.md`
  - `references/mitsubishi-fx3u-rules.md`

- GX Works2 structured project organization, module split, or maintainability
  - `references/gxworks2-structured-project.md`
  - `references/gxworks2-structured-project-deep-notes.md`
  - `references/gxworks2-project-review-patterns.md`

- ST style, code shape, naming, or output structure
  - `references/st-style-guide.md`
  - `references/st-output-style.md`
  - `references/output-format.md`

- Alarm latch/reset, interlock, or protection logic
  - `references/alarm-and-interlock-patterns.md`
  - `templates/alarm-latch-reset-template.md`
  - `templates/alarm-interlock-module-template.md`

- Scan-cycle behavior, overwritten outputs, or hidden write conflicts
  - `references/scan-cycle-and-output-ownership.md`
  - `templates/output-ownership-review-template.md`

- Debug workflow or likely fault isolation
  - `references/debugging-and-review.md`
  - `references/debugging-checklists.md`
  - Use the workflow file first, then load the checklist file for the likely fault path

- Review, refactor, maintainability, or ownership cleanup
  - `references/debugging-and-review.md`
  - `references/code-review-checklists.md`
  - `references/gxworks2-project-review-patterns.md`
  - Use the workflow file first, then the review checklist, then GX Works2 project patterns if the issue is structural

- Standards-level structuring or justification
  - `references/plcopen-and-iec-notes.md`

- Incomplete requests, ambiguity, or confidence downgrade
  - `references/input-completeness-rules.md`
  - `references/response-fallback-rules.md`
  - `references/scope-and-trigger-rules.md`

- Safety-sensitive questions
  - `references/safety-boundaries.md`
  - `references/response-fallback-rules.md`
