# Template map

Use this file to choose the nearest reusable template before writing a large custom answer.

## Common template selection

- Standard equipment module (Auto/Manual/Fault handling)
  - 	emplates/common/equipment-module-template.md

- Start / stop motor or actuator control
  - 	emplates/common/start-stop-interlock-template.md

- Sequence flow with explicit steps
  - 	emplates/common/sequence-step-template.md

- Advanced sequence flow (Pause / Resume / Abort handling)
  - 	emplates/common/pause-resume-sequence-template.md

- State-based machine control
  - 	emplates/common/state-machine-template.md

- Alarm latch, hold, and reset behavior
  - 	emplates/common/alarm-latch-reset-template.md

- Alarm/interlock module design
  - 	emplates/common/alarm-interlock-module-template.md

- Timer / counter diagnosis
  - 	emplates/common/timer-counter-diagnostic-template.md

- Output ownership review
  - 	emplates/common/output-ownership-review-template.md

- Analog scaling, fault detection, limit clamping
  - 	emplates/common/analog-scaling-template.md

- Signal filtering, digital debounce, analog smoothing
  - 	emplates/common/debounce-filter-template.md

- Process control loops, PID wrapper, Auto/Manual bumpless
  - 	emplates/common/pid-control-template.md

- One-shot logic, edge detection, R_TRIG/F_TRIG patterns
  - 	emplates/common/edge-detection-template.md

- Advanced motion control sequence (PLCopen Part 1)
  - 	emplates/common/motion-control-template.md

- Safe recipe loading and management
  - 	emplates/common/recipe-management-template.md

- Data logging and circular buffer array management
  - 	emplates/common/data-logging-template.md

## Selection rules

- Prefer state-machine and step templates for expandable sequential processes.
- Prefer alarm/reset templates when fault memory and recovery are the focus.
- Prefer output-ownership review before rewriting a large code block.
- If vendor-specific syntax matters, combine the common template with the vendor module instead of inventing cross-vendor syntax.
