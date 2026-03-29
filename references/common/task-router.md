# Task router

Use this file first after the skill triggers. Classify the request, then read only the narrowest relevant references.

## Step 1: classify platform certainty

- vendor-known -> load vendor routing and the matching vendor module
- vendor-unknown -> stay in common PLC references first
- mixed-vendor -> flag the mismatch before solving

Read:

- `references/vendors/vendor-routing.md`
- `references/common/knowledge-priority.md`

## 1. Generate new logic

Read common files first:

- `references/common/program-templates.md`
- `templates/common/template-map.md`
- `references/common/st-style-guide.md`
- `references/common/output-format.md`

If vendor-known, add the matching vendor files.

For Mitsubishi FX3U + GX Works2 + ST, also read:

- `references/vendors/mitsubishi/mitsubishi-fx3u-rules.md`
- `references/vendors/mitsubishi/fx3u-device-and-instruction-notes.md`
- `references/vendors/mitsubishi/gxworks2-structured-project-deep-notes.md`

## 2. Explain existing code or logic

Read:

- `references/common/st-style-guide.md`
- `references/common/scan-cycle-and-output-ownership.md`
- `references/common/output-format.md`

If the platform is Mitsubishi FX3U, add:

- `references/vendors/mitsubishi/fx3u-device-and-instruction-notes.md`

## 3. Review or refactor code

Read:

- `references/common/debugging-and-review.md`
- `references/common/code-review-checklists.md`
- `references/common/scan-cycle-and-output-ownership.md`
- `references/common/alarm-and-interlock-patterns.md`
- `references/common/output-format.md`

If vendor-known, add the vendor project-organization notes.

For Mitsubishi GX Works2 projects, add:

- `references/vendors/mitsubishi/gxworks2-project-review-patterns.md`

## 4. Debug or troubleshoot behavior

Read:

- `references/common/debugging-and-review.md`
- `references/common/debugging-checklists.md`
- `references/common/scan-cycle-and-output-ownership.md`
- `references/common/alarm-and-interlock-patterns.md`
- `references/common/safety-boundaries.md`
- `references/common/output-format.md`

If vendor-known, add the platform-specific notes.

## 5. Clarify incomplete requests

Read:

- `references/common/input-completeness-rules.md`
- `references/common/response-fallback-rules.md`
- `references/common/scope-and-trigger-rules.md`
- `references/vendors/vendor-recognition-signals.md`

## Router rules

- Prefer the smallest useful reference set.
- Prefer common engineering guidance before vendor specialization when platform certainty is low.
- Prefer templates before full program dumps.
- Prefer fault isolation before speculative correction.
- Prefer explicit assumptions when evidence is incomplete.
