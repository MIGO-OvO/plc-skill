# Query to knowledge routing

Use this file to map question types to the right bundled references.

## By question type

- vendor identification or ambiguous platform wording
  - `references/vendors/vendor-routing.md`
  - `references/vendors/vendor-recognition-signals.md`

- generic PLC sequence, state, alarm, interlock, reset, timer, counter, or ownership logic
  - `references/common/alarm-and-interlock-patterns.md`
  - `references/common/scan-cycle-and-output-ownership.md`
  - `references/common/program-templates.md`

- ST style, code shape, naming, or output structure
  - `references/common/st-style-guide.md`
  - `references/common/st-output-style.md`
  - `references/common/output-format.md`

- debug workflow or likely fault isolation
  - `references/common/debugging-and-review.md`
  - `references/common/debugging-checklists.md`

- review, refactor, maintainability, or ownership cleanup
  - `references/common/debugging-and-review.md`
  - `references/common/code-review-checklists.md`

- standards-level structuring or IEC framing
  - `references/common/plcopen-and-iec-notes.md`

- incomplete requests, ambiguity, or confidence downgrade
  - `references/common/input-completeness-rules.md`
  - `references/common/response-fallback-rules.md`
  - `references/common/scope-and-trigger-rules.md`

- safety-sensitive questions
  - `references/common/safety-boundaries.md`
  - `references/common/response-fallback-rules.md`

## Mitsubishi-specific routes

- FX3U devices, timers, counters, relays, registers, or instruction behavior
  - `references/vendors/mitsubishi/fx3u-device-and-instruction-notes.md`
  - `references/vendors/mitsubishi/mitsubishi-fx3u-rules.md`

- GX Works2 structured project organization, module split, or maintainability
  - `references/vendors/mitsubishi/gxworks2-structured-project.md`
  - `references/vendors/mitsubishi/gxworks2-structured-project-deep-notes.md`
  - `references/vendors/mitsubishi/gxworks2-project-review-patterns.md`
