# References Map

Purpose: choose the smallest useful reference set after `SKILL.md` triggers.

## Entry Order

1. `common/task-router.md`
2. `common/knowledge-priority.md`
3. `vendors/vendor-routing.md` only when vendor cues exist
4. `common/query-to-doc-routing.md` for direct topic-to-file lookup

## Areas

| Need | File |
| --- | --- |
| Task classification | `common/task-router.md` |
| Evidence order | `common/knowledge-priority.md` |
| Scope boundary | `common/scope-and-trigger-rules.md` |
| Topic routing | `common/query-to-doc-routing.md` |
| Vendor detection | `vendors/vendor-routing.md` |
| Vendor maturity | `vendors/vendor-module-map.md` |

## Canonicality

- Prefer `common/query-to-doc-routing.md` over root-level duplicate maps.
- `doc-map.md` and `reference-map.md` are maintainer aids; avoid adding overlapping routing there.
- Deprecated root shims: `task-router.md`, `scope-and-trigger-rules.md`, `query-to-doc-routing.md`.
- New cross-vendor rules go under `common/`.
- New platform rules go under `vendors/<vendor>/`.

## Forbidden

- No broad best-practice essays.
- No duplicated route lists in multiple files.
- No vendor details in common files unless used for contrast or routing.
