# Reference map

Use this file to choose the narrowest bundled reference area for a given question or task.

## By question type

- FX3U devices, timers, counters, relays, registers, or instruction behavior
  - eferences/vendors/mitsubishi/fx3u-device-and-instruction-notes.md
  - eferences/vendors/mitsubishi/mitsubishi-rules.md

- GX Works2 structured project organization, module split, or maintainability
  - eferences/vendors/mitsubishi/gxworks2-structured-project.md
  - eferences/vendors/mitsubishi/gxworks2-structured-project-deep-notes.md
  - eferences/vendors/mitsubishi/gxworks2-project-review-patterns.md

- Omron Sysmac project structure, NJ/NX controller organization
  - eferences/vendors/omron/sysmac-project-structure-patterns.md

- Beckhoff TwinCAT task architecture, OOP implementation, cyclic execution
  - eferences/vendors/beckhoff/twincat-task-architecture.md

- ST style, code shape, naming, or output structure
  - eferences/common/st-style-guide.md - naming, variable declarations, code organization
  - eferences/common/logic-output-style.md - response output format and presentation
  - eferences/common/output-format.md

- Alarm latch/reset, interlock, or protection logic
  - eferences/common/alarm-and-interlock-patterns.md
  - 	emplates/common/alarm-latch-reset-template.md
  - 	emplates/common/alarm-interlock-module-template.md

- Scan-cycle behavior, overwritten outputs, or hidden write conflicts
  - eferences/common/scan-cycle-and-output-ownership.md
  - 	emplates/common/output-ownership-review-template.md

- Debug workflow or likely fault isolation
  - eferences/common/debugging-and-review.md - workflow first
  - eferences/common/debugging-checklists.md - fault-path checklist second

- Review, refactor, maintainability, or ownership cleanup
  - eferences/common/debugging-and-review.md - workflow first
  - eferences/common/code-review-checklists.md - review checklist second
  - eferences/vendors/mitsubishi/gxworks2-project-review-patterns.md - if issue is structural

- Standards-level structuring or justification
  - eferences/common/plcopen-and-iec-notes.md

- Incomplete requests, ambiguity, or confidence downgrade
  - eferences/common/input-completeness-rules.md
  - eferences/common/response-fallback-rules.md
  - eferences/common/scope-and-trigger-rules.md

- Safety-sensitive questions
  - eferences/common/safety-boundaries.md
  - eferences/common/response-fallback-rules.md

## By knowledge area

- Mitsubishi platform rules -> eferences/vendors/mitsubishi/mitsubishi-rules.md
- FX3U device and instruction notes -> eferences/vendors/mitsubishi/fx3u-device-and-instruction-notes.md
- GX Works2 structured project basics -> eferences/vendors/mitsubishi/gxworks2-structured-project.md
- GX Works2 structured project deeper review notes -> eferences/vendors/mitsubishi/gxworks2-structured-project-deep-notes.md
- Review and project-structure patterns -> eferences/vendors/mitsubishi/gxworks2-project-review-patterns.md
- Omron Sysmac project structure patterns -> eferences/vendors/omron/sysmac-project-structure-patterns.md
- Beckhoff TwinCAT task architecture -> eferences/vendors/beckhoff/twincat-task-architecture.md
- ST style and output guidance -> eferences/common/st-style-guide.md, eferences/common/logic-output-style.md
- Alarm, interlock, scan-cycle, and ownership patterns -> eferences/common/alarm-and-interlock-patterns.md, eferences/common/scan-cycle-and-output-ownership.md
- Debug and review workflow stack -> eferences/common/debugging-and-review.md (workflow), eferences/common/debugging-checklists.md (debugging checklists), eferences/common/code-review-checklists.md (review checklists), eferences/vendors/mitsubishi/gxworks2-project-review-patterns.md (GX Works2 project patterns)
- Standards and architecture guidance -> eferences/common/plcopen-and-iec-notes.md
- Input incompleteness, fallback, and safety constraints -> eferences/common/input-completeness-rules.md, eferences/common/response-fallback-rules.md, eferences/common/safety-boundaries.md
- Output structure and template selection -> eferences/common/output-format.md, eferences/common/program-templates.md, 	emplates/common/template-map.md

## If evidence is still insufficient

State which category is missing, for example:

- missing exact Mitsubishi instruction confirmation
- missing GX Works2 project-organization detail
- missing ST platform-specific limitation note
- missing hardware wiring or I/O assignment confirmation
- missing project-local naming or addressing convention
