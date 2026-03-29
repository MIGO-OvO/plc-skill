# Task router

Use this file first after the skill triggers. Classify the request, then read only the narrowest relevant references.

## 1. Generate new logic

Use when the user wants new PLC logic from process requirements, sequence description, machine behavior, or control intent.

Read:

- `references/program-templates.md`
- `templates/template-map.md`
- `references/mitsubishi-fx3u-rules.md`
- `references/fx3u-device-and-instruction-notes.md`
- `references/gxworks2-structured-project-deep-notes.md`
- `references/st-style-guide.md`
- `references/output-format.md`

Check `templates/template-map.md` before writing new logic from scratch. Prefer a matching template over a one-off implementation.

Use when the user provides ST, device lists, logic fragments, or asks what a block is doing.

Read:

- `references/fx3u-device-and-instruction-notes.md`
- `references/st-style-guide.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/output-format.md`

## 3. Review or refactor code

Use when the user wants quality review, maintainability review, restructuring, ownership cleanup, modularization, or logic improvement.

Read:

- `references/debugging-and-review.md`
- `references/code-review-checklists.md`
- `references/gxworks2-project-review-patterns.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/alarm-and-interlock-patterns.md`
- `references/output-format.md`

Reference roles:

- workflow -> `references/debugging-and-review.md`
- finding checklist -> `references/code-review-checklists.md`
- GX Works2 project patterns -> `references/gxworks2-project-review-patterns.md`

## 4. Debug or troubleshoot behavior

Use when the user reports abnormal behavior, wrong transitions, alarm issues, overwritten outputs, timer or counter problems, or scan-cycle surprises.

Read:

- `references/debugging-and-review.md`
- `references/debugging-checklists.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/alarm-and-interlock-patterns.md`
- `references/safety-boundaries.md`
- `references/output-format.md`

Reference roles:

- workflow -> `references/debugging-and-review.md`
- fault-isolation checklist -> `references/debugging-checklists.md`

## 5. Clarify incomplete requests

Use when platform, software, language, project organization, or field conditions are unclear.

Read:

- `references/input-completeness-rules.md`
- `references/response-fallback-rules.md`
- `references/scope-and-trigger-rules.md`

## Router rules

- Prefer the smallest useful reference set.
- Prefer templates before full program dumps.
- Prefer review of ownership and state visibility before cosmetic rewrite.
- Prefer fault isolation before speculative correction.
- Prefer explicit assumptions when evidence is incomplete.
