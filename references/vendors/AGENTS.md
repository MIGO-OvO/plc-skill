# Vendor Layer

Purpose: detect vendor/platform cues and load only the narrowest matching platform files.

## Entry

| Need | File |
| --- | --- |
| cue routing | `vendor-routing.md` |
| cue vocabulary | `vendor-recognition-signals.md` |
| maturity map | `vendor-module-map.md` |

## Support Depth

- Mature: `mitsubishi/` for FX3U + GX Works2 + Structured Project + ST.
- Targeted: `siemens/`, `rockwell/`, `omron/`.
- Baseline: `beckhoff/`, `schneider/`, `codesys/`, `delta/`, `keyence/`, `panasonic/`.

## Vendor File Roles

- `*-overview.md`: context, family scope, read order.
- `*-rules.md`: platform rules, memory/tag model, tooling semantics.
- `*-cheatsheet.md`: dense syntax/addressing lookup.
- `*-pitfalls-and-pro-tips.md`: non-obvious platform traps.
- `official-doc-index.md`: official evidence routing only.
- Extra deep files: load only for matching request, not as default.

## Rules

- Common engineering rules still apply unless a vendor file explicitly narrows them.
- Mixed ecosystems require a warning before solving.
- Unknown vendor stays in common layer and marks vendor-dependent details.
- Do not create per-vendor AGENTS until that vendor subtree scores >=10.

## Forbidden

- No copying common templates into vendor folders.
- No treating baseline modules as mature.
- No merging memory models across vendors.
- No vendor official-doc summaries inside `*-rules.md`.
