# Program templates

Use this file as the template-selection entry for generation tasks.

## Role boundary

This file selects reusable logic structures.
It does not duplicate detailed task routing, review workflow, or debugging checklists.

Read with:

- `references/common/task-router.md` for task classification
- `references/common/output-format.md` for output shape
- `references/common/debugging-checklists.md` when a generated template should end with troubleshooting guidance

## Template selection

Choose the nearest reusable pattern:

- start or stop control
- mode selection
- sequence control
- state machine
- alarm latch and reset
- interlock block
- debounce or filter timing
- fault reset and recovery

## Output rule

Do not jump straight into a full monolithic program.

Prefer:

1. template purpose
2. assumptions
3. module boundary
4. variable or device suggestion
5. ST skeleton
6. scan notes
7. debug checklist

## Recommended template files

If available, use:

- `templates/common/state-machine-template.md`
- `templates/common/alarm-latch-reset-template.md`
- `templates/common/alarm-interlock-module-template.md`
- `templates/common/start-stop-interlock-template.md`
- `templates/common/sequence-step-template.md`
- `templates/common/timer-counter-diagnostic-template.md`
- `templates/common/output-ownership-review-template.md`

If a matching template does not exist, produce a compact reusable skeleton instead of a large one-off program.
