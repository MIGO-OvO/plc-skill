# PLC_SKILL

> A production-grade AI agent skill for industrial control programming. Built with a two-layer architecture (Common Engineering + Vendor Specific) to handle general IEC 61131-3 logic while providing deep, accurate routing for top PLC brands like Siemens, Rockwell, Mitsubishi, and Omron.

[阅读中文版 / Read in Chinese](./README.zh-CN.md)

## What is this?

`PLC_SKILL` is an extensible AI skill for OpenClaw, Cursor, Claude Code, and other LLM-powered development tools. 

Unlike basic prompts that treat all PLCs the same, this skill implements a **Layered Architecture**:
1. **Common PLC Layer**: Handles cross-platform engineering rules (state machines, scan-cycle reasoning, modularity, interlocks).
2. **Vendor Modules**: Kicks in automatically when a specific brand is detected, providing accurate syntax, memory models, software environments, and official documentation routing.

This prevents the AI from generating "vague pseudocode" and forces it to output structured, reviewable, and platform-accurate control logic.

## Capabilities

- **Logic Design & Generation**: Generates Structured Text (ST), Ladder Diagram (LD), and Sequential Function Chart (SFC) code based on engineering best practices.
- **State Machines & Sequences**: Structures complex step-sequences with clear transition logic and output ownership.
- **Code Review & Refactoring**: Audits existing logic for maintainability, race conditions, and poor I/O mapping.
- **Debugging & Troubleshooting**: Provides systematic fault-isolation steps for online debugging.
- **Vendor-Aware Routing**: Seamlessly switches context for major ecosystems (Siemens TIA, Rockwell Studio 5000, Mitsubishi GX Works, etc.).

## When to use this skill

Trigger this skill when you need the agent to:
- Write a state machine or sequencer in Structured Text.
- Review a block of Ladder logic for scan-cycle issues or multiple-coil conflicts.
- Refactor messy "spaghetti logic" into a modular structure with clear I/O mapping.
- Troubleshoot why a specific timer, edge trigger, or interlock is failing in the field.
- Map general logic concepts to a specific vendor's software (e.g., migrating a concept to Omron Sysmac Studio).

**Do NOT use for**: Pure electrical wiring without logic context, broad IT networking, or definitive safety (SIL/PL) certification conclusions.

## Repository Structure

```text
PLC_SKILL/
├── SKILL.md                 # Primary entry point and trigger rules for the agent
├── INSTALL.md               # Setup guide for OpenClaw, Cursor, Claude Code, etc.
├── references/
│   ├── common/              # Cross-vendor rules: scan-cycle, state machines, review checklists
│   └── vendors/             # Vendor modules: Siemens, Rockwell, Mitsubishi, Omron, etc.
├── templates/               # Reusable control patterns and boilerplate
├── examples/                # Trigger samples and generation examples
├── evals/                   # Regression testing matrix for the skill
└── docs/                    # Bundled source materials and manuals
```

## Installation & Setup

### For OpenClaw (via ClawHub)
The fastest way to install is using the [ClawHub CLI](https://clawhub.com/):

```bash
npm install -g clawhub
clawhub install plc-skill
```

### For other tools (Cursor, Claude Code, etc.)
See the [INSTALL.md](./INSTALL.md) for detailed instructions on configuring this skill in your preferred AI programming environment.

## Design Principles

1. **Modular Over Monolithic**: Outputs should be modular, reviewable blocks, not giant code dumps.
2. **Vendor Separation**: Never mix vendor syntax casually. If the vendor is unknown, state the assumptions clearly.
3. **Conservative on Missing Info**: If I/O lists or process requirements are incomplete, the agent must ask or use placeholders, not hallucinate certainty.
4. **Safety Boundaries**: The skill explicitly refuses to provide high-confidence conclusions for safety-critical (e.g., fail-safe) physical systems without field verification.

## Extending the Skill

When adding or deepening a vendor module:
1. Define the vendor recognition signals (terminology, software names).
2. Add a vendor overview file.
3. Index official documentation.
4. Add specific rules (memory models, instruction quirks) only as needed.
5. **Keep common concepts in the `common/` folder** to avoid polluting vendor directories.

See `references/skill-architecture.md` for detailed extension guidelines.
