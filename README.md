# PLC_SKILL

> A production-grade AI agent skill for industrial control programming. It uses a two-layer architecture (Common Engineering + Vendor Specific) to handle general IEC 61131-3 logic while routing into vendor-aware guidance when the platform is identifiable.

[阅读中文版 / Read in Chinese](./README.zh-CN.md)

## What is this?

PLC_SKILL is an extensible AI skill for OpenClaw, Cursor, Claude Code, and other LLM-powered development tools.

Unlike generic prompts that treat all PLCs the same, this skill separates:

1. **Common PLC Layer**: Cross-platform engineering rules such as scan-cycle reasoning, state machines, interlocks, output ownership, and review workflow.
2. **Vendor Modules**: Vendor-aware routing for terminology, syntax, memory models, project structure, and official documentation.

This helps the agent avoid vague pseudocode and produce structured, reviewable control logic.

## Capabilities

- **Logic Design & Generation**: Generates Structured Text (ST), Ladder Diagram (LD), Function Block Diagram (FBD), and Sequential Function Chart (SFC) oriented outputs using maintainable patterns.
- **State Machines & Sequences**: Structures step-sequences with explicit state ownership and transition logic.
- **Code Review & Refactoring**: Audits control logic for maintainability, scan-cycle conflicts, and hidden output ownership problems.
- **Debugging & Troubleshooting**: Guides fault isolation with observable-first debugging workflow.
- **Vendor-Aware Routing**: Switches context based on cues such as TIA Portal, Studio 5000, GX Works, Sysmac Studio, TwinCAT, and similar environments.

## Support Depth

- **Deepest production-ready path**: Mitsubishi FX3U + GX Works2 + Structured Project + ST.
- **Targeted secondary modules**: Siemens, Rockwell, and Omron with vendor routing, rules, and focused eval coverage.
- **Baseline routing/reference modules**: Beckhoff, Schneider, Codesys, Delta, Keyence, and Panasonic.

Do not assume equal depth across all vendor paths.

## When to use this skill

Trigger this skill when you need the agent to:

- Write a state machine or sequencer in ST.
- Review Ladder logic for scan-cycle or multiple-writer conflicts.
- Refactor spaghetti logic into clearer structure with explicit I/O ownership.
- Troubleshoot timer, edge trigger, latch/reset, or interlock behavior.
- Map a generic control concept into a specific vendor environment.

Do not use it for pure electrical wiring with no logic context, broad IT networking, or definitive SIL/PL certification conclusions.

## Repository Structure

```text
PLC_SKILL/
├── SKILL.md
├── INSTALL.md
├── references/
│   ├── common/
│   └── vendors/
├── templates/
├── examples/
├── evals/
├── docs/guides/
└── bin/
```

## Installation & Setup

### Option 1: NPM Global Install

```bash
npm install -g plc-skill
install-plc-skill
```

`npm install -g` installs the package and the helper command. `install-plc-skill` copies the skill into `~/.agents/skills/plc-skill`.

### Option 2: Git Clone

```bash
git clone https://github.com/MIGO-OvO/plc-skill.git
cd plc-skill
```

Then move or link the repository into your `~/.agents/skills/` folder, or point your tool directly at this checkout.

### Other Tools

See [INSTALL.md](./INSTALL.md) for Cursor, Claude Code, and other tool-specific guidance.

## Repository Verification

Run the repository consistency checks before publishing or merging structural documentation changes:

```bash
npm test
```

## Design Principles

1. **Modular Over Monolithic**: Favor reusable, reviewable modules over giant code dumps.
2. **Vendor Separation**: Never mix vendor syntax casually. If the vendor is unknown, say what depends on platform.
3. **Conservative on Missing Info**: Use assumptions or clarification requests instead of fake certainty.
4. **Safety Boundaries**: Do not give high-confidence safety conclusions without confirmed field conditions.

## Extending the Skill

When adding or deepening a vendor module:

1. Define the vendor recognition signals.
2. Add or update the vendor overview and rules files.
3. Maintain the official-doc index.
4. Add vendor-specific rules only where the common layer is not enough.
5. Keep cross-vendor engineering rules in `references/common/`.

See [docs/guides/adding-new-vendors.md](./docs/guides/adding-new-vendors.md) and [docs/guides/architecture.md](./docs/guides/architecture.md) for more detail.
