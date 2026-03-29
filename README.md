# PLC_SKILL

> A general PLC engineering skill with a clear **common layer + vendor-specific layer** architecture. It handles cross-vendor PLC logic work without flattening all vendors into one blurry ruleset, and currently keeps **Mitsubishi FX3U / GX Works2 / Structured Project / ST** as the deepest vendor module.

[中文说明 / Read in Chinese](./README.zh-CN.md)

## Overview

`PLC_SKILL` is no longer positioned as a single-brand Mitsubishi-only skill.

It is now structured as:

- a **common PLC layer** for cross-vendor engineering patterns
- **vendor modules** for platform-specific terminology, software environments, organization rules, and official-document routing

This keeps the skill useful for general PLC work while still preserving deeper, higher-quality behavior when the platform is known.

## What this skill is for

Use this repository for PLC-oriented agent work such as:

- logic design
- sequence / state-machine design
- alarms, latches, resets, and interlocks
- timers, counters, edge-trigger behavior
- I/O mapping strategy
- ST / LD / FBD / SFC reasoning at the engineering level
- code explanation, review, refactoring, debugging, and troubleshooting
- vendor-aware routing when the platform is identifiable

## Design goals

This skill is designed to satisfy four constraints at once:

1. support real **common PLC engineering**
2. preserve **deeper vendor-specific modules**
3. keep a **clean boundary** between common and vendor knowledge
4. avoid degrading into a giant low-confidence “everything PLC” prompt dump

## Current module maturity

| Layer / module | Status |
| --- | --- |
| Common PLC layer | Active |
| Mitsubishi module | Mature |
| Siemens module | Scaffolded |
| Omron module | Scaffolded |
| Rockwell / Allen-Bradley module | Scaffolded |
| Schneider module | Scaffolded |
| Delta module | Scaffolded |
| Keyence module | Scaffolded |
| Panasonic module | Scaffolded |
| Beckhoff module | Scaffolded |
| Codesys module | Scaffolded |

## Repository structure

```text
PLC_SKILL/
├─ SKILL.md
├─ references/
│  ├─ common/
│  ├─ vendors/
│  │  ├─ mitsubishi/
│  │  ├─ siemens/
│  │  ├─ omron/
│  │  ├─ rockwell/
│  │  ├─ schneider/
│  │  ├─ delta/
│  │  ├─ keyence/
│  │  ├─ panasonic/
│  │  ├─ beckhoff/
│  │  └─ codesys/
├─ templates/
│  ├─ common/
│  └─ vendors/
├─ examples/
│  ├─ common/
│  └─ vendors/
├─ evals/
└─ docs/
```

## Routing model

The skill should behave like this:

1. decide whether the request is actually PLC/program logic work
2. decide whether the vendor is known
3. if vendor-known, load the matching vendor module
4. if vendor-unknown, answer from the common PLC layer first
5. if multiple vendor ecosystems are mixed, flag the mismatch explicitly

## Current deepest specialization

The original Mitsubishi accumulation has been preserved as the first mature vendor module, especially for:

- Mitsubishi FX3U
- GX Works2
- Structured Project
- Structured Text (ST)

## Knowledge organization

- `references/common/` -> cross-vendor PLC engineering rules
- `references/vendors/<vendor>/` -> vendor-specific rules and official-doc routing
- `templates/common/` -> reusable control patterns
- `examples/common/` -> cross-vendor examples and trigger samples
- `docs/PLC_SKILL_KB/` -> bundled source materials and collected manuals

## Not the goal

This repository is **not** trying to become:

- a full industrial automation encyclopedia
- a safety-certification authority
- a one-file all-vendor prompt
- a place where vendor syntax gets mixed casually

## Recommended reading path

1. `SKILL.md`
2. `references/skill-architecture.md`
3. `references/common/task-router.md`
4. `references/vendors/vendor-routing.md`
5. `references/doc-map.md`
6. `templates/common/template-map.md`

## Notes for future extension

When adding a new vendor, keep the pattern stable:

- add vendor recognition cues
- add an overview file first
- add official-doc index second
- add narrow rules/checklists/examples only after real need appears
- keep common rules in `references/common/`, not copied into vendor files unless narrowed for that vendor
