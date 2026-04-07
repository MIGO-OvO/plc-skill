# Template map

Use this file to choose the nearest reusable template before writing a large custom answer.

## Common template selection

- Standard equipment module (Auto/Manual/Fault handling)
  - `templates/common/equipment-module-template.md`

- Start / stop motor or actuator control
  - `templates/common/start-stop-interlock-template.md`

- Sequence flow with explicit steps
  - `templates/common/sequence-step-template.md`

- Advanced sequence flow (Pause / Resume / Abort handling)
  - `templates/common/pause-resume-sequence-template.md`

- State-based machine control
  - `templates/common/state-machine-template.md`

- Alarm latch, hold, and reset behavior
  - `templates/common/alarm-latch-reset-template.md`

- Alarm/interlock module design
  - `templates/common/alarm-interlock-module-template.md`

- Timer / counter diagnosis
  - `templates/common/timer-counter-diagnostic-template.md`

- Output ownership review
  - `templates/common/output-ownership-review-template.md`

- Analog scaling, fault detection, limit clamping
  - `templates/common/analog-scaling-template.md`

- Signal filtering, digital debounce, analog smoothing
  - `templates/common/debounce-filter-template.md`

- Process control loops, PID wrapper, Auto/Manual bumpless
  - `templates/common/pid-control-template.md`

- One-shot logic, edge detection, R_TRIG/F_TRIG patterns
  - `templates/common/edge-detection-template.md`

- Advanced motion control sequence (PLCopen Part 1)
  - `templates/common/motion-control-template.md`

- Safe recipe loading and management
  - `templates/common/recipe-management-template.md`

- Data logging and circular buffer array management
  - `templates/common/data-logging-template.md`

## Selection rules

- Prefer state-machine and step templates for expandable sequential processes.
- Prefer alarm/reset templates when fault memory and recovery are the focus.
- Prefer output-ownership review before rewriting a large code block.
- If vendor-specific syntax matters, combine the common template with the vendor module instead of inventing cross-vendor syntax.
