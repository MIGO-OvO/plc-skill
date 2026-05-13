# PLC Skill

> Production-grade AI agent skill for industrial PLC programming. It combines a
> vendor-neutral engineering layer with vendor-aware routing so agents can produce
> structured, reviewable IEC 61131-3 control logic instead of generic PLC pseudocode.

[![npm](https://img.shields.io/npm/v/plc-skill?logo=npm)](https://www.npmjs.com/package/plc-skill)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[阅读中文版 / Read in Chinese](./README.zh-CN.md)

## Overview

PLC Skill is an extensible knowledge base for OpenClaw, Cursor, Claude Code, and
other LLM-powered development tools that need to reason about PLC logic, control
sequences, interlocks, alarms, and vendor-specific automation environments.

The skill is organized as a two-layer system:

1. **Common PLC layer**: Cross-vendor engineering guidance for scan-cycle
   reasoning, state machines, output ownership, interlocks, debugging, code
   review, and IEC 61131-3 style logic.
2. **Vendor layer**: Platform-specific routing for terminology, syntax, memory
   models, project structure, software behavior, and official documentation.

This separation helps an AI assistant avoid mixing vendor ecosystems, making up
unsupported syntax, or flattening every PLC request into vague IEC-style code.

## Capabilities

- **Logic design and generation** for Structured Text (ST), Ladder Diagram (LD),
  Function Block Diagram (FBD), and Sequential Function Chart (SFC) oriented work.
- **State machines and sequencers** with explicit state ownership, transition
  conditions, and output mapping.
- **Code review and refactoring** for scan-cycle risks, multiple writers, hidden
  latches, unclear interlocks, and maintainability problems.
- **Debugging and troubleshooting** using observable-first workflows for timers,
  edge triggers, resets, alarms, and sequence faults.
- **Vendor-aware routing** for cues such as TIA Portal, Studio 5000, GX Works,
  Sysmac Studio, TwinCAT, CODESYS, and related platform terminology.

See [SHOWCASE.md](./SHOWCASE.md) for examples of how the skill changes typical
AI-generated PLC output.

## Support Depth

| Depth | Vendors and environments | Expected behavior |
| --- | --- | --- |
| Mature path | Mitsubishi FX3U + GX Works2 + Structured Project + ST | Deepest bundled guidance, examples, and review patterns. |
| Targeted modules | Siemens, Rockwell / Allen-Bradley, Omron | Vendor routing, rules, examples, and focused eval coverage. |
| Baseline modules | Beckhoff, Schneider, CODESYS, Delta, Keyence, Panasonic | Recognition, reference routing, cheatsheets, and official-doc indexes. |

Do not assume every vendor path has the same depth. When a platform is unknown
or only partially covered, the skill should answer from the common PLC layer and
mark vendor-dependent details clearly.

## When to Use It

Use this skill when you want an agent to:

- Write or review PLC state machines, sequencers, equipment modules, or interlocks.
- Refactor messy ladder/ST logic into clearer modules with explicit I/O ownership.
- Troubleshoot timers, counters, edge detection, latches, resets, alarms, or scan
  order behavior.
- Translate a generic control concept into a specific PLC software environment.
- Check for vendor mismatches, such as Siemens TIA Portal prompts using Mitsubishi
  `Y` output addressing.

This skill is not a substitute for electrical design review, field commissioning,
SIL/PL certification, or vendor-official validation. It should stay conservative
when safety-critical conclusions depend on site conditions.

## Quick Start

### Install from npm

Prerequisite: Node.js 18 or newer for the installer and repository checks.

```bash
npm install -g plc-skill
install-plc-skill --target claude-code
```

The npm package installs the `install-plc-skill` helper. Running the helper copies
the runtime skill payload into `~/.claude/skills/plc-skill` for Claude Code.
For OpenClaw-style `.agents` installs, run `install-plc-skill --target agents`.
Use `install-plc-skill --target both` to install both copies, or `--dry-run` to
inspect target paths without writing files.

### Install from Git

```bash
git clone https://github.com/MIGO-OvO/plc-skill.git
cd plc-skill
node bin/install.js --target claude-code
```

For Claude Code, use the installer so only the runtime payload is copied into the
skill directory. The repository root also contains maintainer docs and evals that
are not part of the installed runtime context.

For tool-specific notes, see [INSTALL.md](./INSTALL.md).

## Using the Skill

Use [SKILL.md](./SKILL.md) as the entry point. A compatible agent should read it
first, classify the task, load the common PLC layer, and then load the narrowest
matching vendor files when a platform is identifiable.

Recommended starting points:

- [references/common/task-router.md](./references/common/task-router.md) for task
  classification.
- [references/common/knowledge-priority.md](./references/common/knowledge-priority.md)
  for evidence order.
- [references/vendors/vendor-routing.md](./references/vendors/vendor-routing.md)
  for vendor detection and routing.
- [templates/common/template-map.md](./templates/common/template-map.md) for reusable
  generation templates.

## Repository Contents

Current repository snapshot:

| Area | Count | Purpose |
| --- | ---: | --- |
| Vendor modules | 10 | Vendor recognition, rules, cheatsheets, pitfalls, and official-doc indexes. |
| Common references | 26 | Cross-vendor engineering guidance, review rules, and debugging workflows. |
| Common templates | 17 | Reusable ST/control patterns for generation and refactoring. |
| Examples | 20 | Common and vendor-specific behavior examples. |
| Eval documents | 16 | Markdown and JSON regression cases for routing, generation, review, debugging, and fallback behavior. |

```text
plc-skill/
|-- SKILL.md                  # Skill entry point and routing contract
|-- INSTALL.md                # Installation and tool integration notes
|-- references/
|   |-- common/               # Vendor-neutral PLC engineering guidance
|   `-- vendors/              # Vendor-specific routing and rules
|-- templates/common/         # Reusable PLC output templates
|-- examples/                 # Common and vendor-specific examples
|-- evals/                    # Regression and behavior test cases
|-- docs/guides/              # Architecture, testing, and extension guides
|-- bin/install.js            # npm helper command
|-- scripts/verify-repo.js    # Repository consistency check
```

## Maintainer Workflow

Run the repository consistency check before publishing or opening structural
documentation changes:

```bash
npm test
```

The check validates internal markdown references, placeholder text, package
metadata consistency, `SKILL.md` frontmatter, runtime payload boundaries,
encoding artifacts, common-template vendor neutrality, and machine-readable eval
coverage.

When adding or deepening a vendor module:

1. Define recognition signals and vendor routing.
2. Add or update the vendor overview, rules, cheatsheet, pitfalls, and official
   documentation index.
3. Keep common engineering rules in `references/common/`.
4. Add realistic vendor examples under `examples/vendors/`.
5. Add or update eval cases in `evals/`.

See [docs/guides/adding-new-vendors.md](./docs/guides/adding-new-vendors.md),
[docs/guides/architecture.md](./docs/guides/architecture.md), and
[CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Reporting Issues

Found a bug, unclear routing rule, bad example, or missing vendor behavior? Open an
issue at [GitHub Issues](https://github.com/MIGO-OvO/plc-skill/issues).

Useful issue details include:

- PLC vendor, model, and engineering software version.
- Programming language or diagram type, such as ST, LD, FBD, or SFC.
- The exact agent prompt or generated output that looked wrong.
- The expected behavior, with official documentation links when available.

## License

This repository is released under the [MIT License](./LICENSE).
