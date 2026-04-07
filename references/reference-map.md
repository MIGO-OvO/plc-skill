# Reference map

Use this file to choose the narrowest bundled reference area for a given question or task.

## By question type

- FX3U devices, timers, counters, relays, registers, or instruction behavior
  - `references/vendors/mitsubishi/fx3u-device-and-instruction-notes.md`
  - `references/vendors/mitsubishi/mitsubishi-rules.md`

- GX Works2 structured project organization, module split, or maintainability
  - `references/vendors/mitsubishi/gxworks2-structured-project.md`
  - `references/vendors/mitsubishi/gxworks2-structured-project-deep-notes.md`
  - `references/vendors/mitsubishi/gxworks2-project-review-patterns.md`

- Omron Sysmac project structure, NJ/NX controller organization
  - `references/vendors/omron/sysmac-project-structure-patterns.md`

- Beckhoff TwinCAT task architecture, OOP implementation, cyclic execution
  - `references/vendors/beckhoff/twincat-task-architecture.md`

- ST style, code shape, naming, or output structure
  - `references/common/st-style-guide.md`
  - `references/common/st-output-style.md`
  - `references/common/output-format.md`

- Alarm latch/reset, interlock, or protection logic
  - `references/common/alarm-and-interlock-patterns.md`
  - `templates/common/alarm-latch-reset-template.md`
  - `templates/common/alarm-interlock-module-template.md`

- Scan-cycle behavior, overwritten outputs, or hidden write conflicts
  - `references/common/scan-cycle-and-output-ownership.md`
  - `templates/common/output-ownership-review-template.md`

- Debug workflow or likely fault isolation
  - `references/common/debugging-and-review.md`
  - `references/common/debugging-checklists.md`

- Review, refactor, maintainability, or ownership cleanup
  - `references/common/debugging-and-review.md`
  - `references/common/code-review-checklists.md`
  - `references/vendors/mitsubishi/gxworks2-project-review-patterns.md`

- Standards-level structuring or justification
  - `references/common/plcopen-and-iec-notes.md`

- Incomplete requests, ambiguity, or confidence downgrade
  - `references/common/input-completeness-rules.md`
  - `references/common/response-fallback-rules.md`
  - `references/common/scope-and-trigger-rules.md`

- Safety-sensitive questions
  - `references/common/safety-boundaries.md`
  - `references/common/response-fallback-rules.md`

## By knowledge area

- Mitsubishi platform rules -> `references/vendors/mitsubishi/mitsubishi-rules.md`
- FX3U device and instruction notes -> `references/vendors/mitsubishi/fx3u-device-and-instruction-notes.md`
- GX Works2 structured project basics -> `references/vendors/mitsubishi/gxworks2-structured-project.md`
- GX Works2 structured project deeper review notes -> `references/vendors/mitsubishi/gxworks2-structured-project-deep-notes.md`
- Review and project-structure patterns -> `references/vendors/mitsubishi/gxworks2-project-review-patterns.md`
- Omron Sysmac project structure patterns -> `references/vendors/omron/sysmac-project-structure-patterns.md`
- Beckhoff TwinCAT task architecture -> `references/vendors/beckhoff/twincat-task-architecture.md`
- ST style and output guidance -> `references/common/st-style-guide.md`, `references/common/st-output-style.md`
- Alarm, interlock, scan-cycle, and ownership patterns -> `references/common/alarm-and-interlock-patterns.md`, `references/common/scan-cycle-and-output-ownership.md`
- Debug and review workflow stack -> `references/common/debugging-and-review.md`, `references/common/debugging-checklists.md`, `references/common/code-review-checklists.md`, `references/vendors/mitsubishi/gxworks2-project-review-patterns.md`
- Standards and architecture guidance -> `references/common/plcopen-and-iec-notes.md`
- Input incompleteness, fallback, and safety constraints -> `references/common/input-completeness-rules.md`, `references/common/response-fallback-rules.md`, `references/common/safety-boundaries.md`
- Output structure and template selection -> `references/common/output-format.md`, `references/common/program-templates.md`, `templates/common/template-map.md`

## If evidence is still insufficient

State which category is missing, for example:

- missing exact Mitsubishi instruction confirmation
- missing GX Works2 project-organization detail
- missing ST platform-specific limitation note
- missing hardware wiring or I/O assignment confirmation
- missing project-local naming or addressing convention
