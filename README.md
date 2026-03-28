# PLC_SKILL

> A focused skill for generating, reviewing, explaining, and troubleshooting Mitsubishi FX3U PLC logic in GX Works2 Structured Project using Structured Text (ST).

[中文说明 / Read in Chinese](./README.zh-CN.md)

## Overview

`PLC_SKILL` is a structured skill repository for agents working on **Mitsubishi FX3U** engineering tasks in **GX Works2 Structured Project** with **Structured Text (ST)**.

It is built for practical PLC work: not as a generic prompt dump, but as a maintainable skill package with clear trigger boundaries, reusable templates, scoped references, and lightweight eval coverage.

## Why use this skill

Use this repository when you want PLC-oriented agent output that is:

- more structured than ad hoc prompting
- more consistent across generation, review, and debugging tasks
- more conservative when information is incomplete or safety-sensitive
- easier to maintain as the skill evolves

## Quick start

There is currently **no repo-specific installer or CLI** in this project.

To use the skill today:

1. Clone or copy this repository into your local skills/workspace directory.
2. Point your agent environment to `SKILL.md` as the skill entry file.
3. Keep `references/`, `templates/`, `examples/`, and `evals/` alongside it.
4. Let the agent read narrower files on demand instead of flattening everything into one prompt.

```text
git clone <your-fork-or-local-path> PLC_SKILL
```

> If your platform does not support packaged skills, you can still load `SKILL.md` manually and preserve the repository structure as-is.

## Project status

| Item | Status |
| --- | --- |
| Scope | Focused and intentionally narrow |
| Primary platform | Mitsubishi FX3U |
| Engineering environment | GX Works2 Structured Project |
| Primary language | Structured Text (ST) |
| Packaging workflow | Not documented in repo root yet |
| Eval coverage | Lightweight regression cases present |
| License | MIT |

## What this skill does

This skill helps an agent:

- generate ST logic from process steps and control intent
- explain existing ST blocks, device usage, and logic flow
- review PLC code for structure, maintainability, and output ownership issues
- debug scan-cycle, alarm reset, timer, counter, and interlock problems
- scaffold recurring control patterns with reusable templates
- handle incomplete input conservatively and call out missing engineering context
- stay within explicit scope and safety boundaries

## When to use

Use this skill when you need to:

- write new FX3U ST logic for a GX Works2 structured project
- explain, refactor, or review existing ST code
- diagnose why a step, alarm, timer, or counter behaves unexpectedly
- analyze hidden state, duplicated output writes, or scan-cycle risks
- structure a sequence, state machine, interlock, or alarm module
- route a PLC request to the right engineering template or checklist

Do **not** use this skill as a general-purpose PLC expert across all vendors, languages, and safety systems.

## Supported scope

| Area | Supported now | Notes |
| --- | --- | --- |
| Mitsubishi FX3U | Yes | Primary target platform |
| GX Works2 Structured Project | Yes | Main engineering context |
| Structured Text (ST) | Yes | Primary language and examples |
| PLC code generation | Yes | Via guidance, templates, and patterns |
| PLC review / refactoring | Yes | Includes maintainability and ownership checks |
| Debugging / troubleshooting | Yes | Includes scan-cycle and alarm-oriented workflows |
| Other Mitsubishi families | Not yet | Extend deliberately, do not assume generic support |
| Ladder / FBD / SFC broad coverage | Not yet | Current repo is ST-first |
| Full safety-system design | No | Requires confirmed field context and formal review |

## Repository structure

```text
PLC_SKILL/
├─ SKILL.md
├─ references/
├─ templates/
├─ examples/
├─ evals/
├─ docs/
├─ LICENSE
└─ .gitignore
```

| Path | Purpose |
| --- | --- |
| `SKILL.md` | Skill entry point, trigger rules, and operating guidance |
| `references/` | Focused knowledge for FX3U rules, GX Works2 structure, ST style, debugging, safety, and routing |
| `templates/` | Reusable patterns such as state machines, alarm reset, interlocks, and output ownership review |
| `examples/` | Positive triggers, negative triggers, and preferred output shapes |
| `evals/` | Lightweight regression cases for trigger, routing, review, and debugging behavior |
| `docs/` | Local project notes and knowledge-base material |

## Recommended reading path

1. `README.md`
2. `SKILL.md`
3. `references/task-router.md`
4. `references/doc-map.md`
5. `templates/template-map.md`
6. `examples/trigger-positive.md`
7. `evals/README.md`

## Installation / Setup

### Option 1: Local skill repository

- place this repository in your local skills/workspace area
- register or reference `SKILL.md` in your agent environment
- keep the folder layout unchanged so linked references still work

### Option 2: Manual integration

- load `SKILL.md` as the main skill definition
- keep `references/` and `templates/` available for on-demand lookup
- use `examples/` and `evals/` when extending or validating behavior

> The repository does not currently include a documented `.skill` package build process in the root.

## Usage

```text
Write FX3U Structured Text for a start/stop motor sequence in GX Works2 Structured Project.
Use separate permissive, latch, and output logic. Include alarm reset behavior.
```

```text
Review this GX Works2 ST block for maintainability.
Focus on output ownership conflicts, hidden state dependencies, and scan-cycle risks.
```

```text
Debug why this alarm re-latches immediately after reset.
Assume FX3U + GX Works2 Structured Project + ST. Explain likely causes and safe checks.
```

## Design principles

- **Narrow scope first** — optimize for FX3U + GX Works2 + ST instead of broad PLC coverage
- **Progressive disclosure** — keep `SKILL.md` concise and load detailed references only when needed
- **Reusable patterns** — turn recurring PLC scenarios into templates and checklists
- **Conservative output** — prefer explicit assumptions over false certainty
- **Maintainable structure** — separate routing, references, templates, examples, and evals by role

## Limitations

- focused on Mitsubishi FX3U
- focused on GX Works2 Structured Project
- focused on Structured Text (ST)
- not a full multi-vendor PLC repository
- not a substitute for confirmed field wiring, commissioning data, or formal safety review
- not a complete IEC 61131-3 knowledge base across all languages

## Contributing / Future improvements

Good next contributions include more templates, more realistic examples, stronger eval coverage, and documented packaging/versioning workflow.

When extending the skill, keep `SKILL.md` short, add narrow files to `references/`, prefer `templates/`, and update `examples/` plus `evals/` together.

## Missing information to improve this README

- exact target skill runtime(s) or platform(s)
- preferred installation path for local skill discovery
- whether a `.skill` package is generated elsewhere
- release/versioning policy
