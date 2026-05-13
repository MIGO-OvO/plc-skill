# PLC Skill Repo Map

PLC Skill is an industrial PLC AI skill: common IEC 61131-3 engineering layer plus vendor routing layer.
Stack: Markdown knowledge base, Node >=18 installer, npm package, `npm test` verifier.

## Navigate

| Need | Go |
| --- | --- |
| Skill trigger, scope, read order | `SKILL.md` |
| Global reference routing | `references/AGENTS.md` |
| Vendor-neutral PLC rules | `references/common/AGENTS.md` |
| Vendor detection and vendor files | `references/vendors/AGENTS.md` |
| Reusable generation patterns | `templates/common/AGENTS.md` |
| Few-shot behavior examples | `examples/AGENTS.md` |
| Regression expectations | `evals/eval-matrix.md` |
| npm installer | `bin/install.js` |
| repo integrity check | `scripts/verify-repo.js` |

## Code Map

- `bin/install.js`: installs runtime skill payload into `~/.agents/skills/plc-skill` with staging and rollback.
- `scripts/verify-repo.js`: validates markdown references, placeholder text, package metadata drift.
- `references/common/task-router.md`: first post-trigger classifier.
- `references/vendors/vendor-routing.md`: vendor cue router and mixed-vendor guard.
- `templates/common/template-map.md`: template selection before custom code.

## Project Rules

- Common layer owns scan cycle, state, interlock, output ownership, review, debugging, safety downgrade.
- Vendor layer owns syntax, memory/tag model, IDE behavior, official doc routing.
- Vendor files narrow common rules only when platform behavior requires it.
- Mitsubishi FX3U/GX Works2/ST is mature; Siemens/Rockwell/Omron are targeted; others baseline.
- Official doc indexes stay separate from interpreted rules.
- Examples show behavior; evals define pass/fail expectations.
- Installed payload is runtime context only: `SKILL.md`, `AGENTS.md`, `references/`, `templates/`, `examples/`, `LICENSE`.

## Forbidden

- No vendor syntax in `references/common/` except contrast or routing notes.
- No duplicated common PLC rules inside vendor files unless explicitly narrowing.
- No pasted vendor tables; link official manuals.
- No Mitsubishi bias for unknown PLC prompts.
- No safety certification conclusions from software logic alone.
- No README/INSTALL/CONTRIBUTING/docs/evals in installed runtime payload.

## Commands

- `npm test`
- `node scripts/verify-repo.js`
- `npm install -g plc-skill`
- `install-plc-skill`

## Gotchas

- Root README files are public documentation, not runtime skill instructions.
- Deprecated root reference shims must not receive new logic.
- Long files are deep references; load by route, not by default.
- Local repo license is MIT; published npm metadata may lag until republish.
