---
name: plc-skill
description: Vendor-aware PLC engineering skill for IEC 61131-3 logic design, review, debugging, refactoring, and documentation routing.
when_to_use: Use for PLC programming questions involving ST, LD, FBD, SFC, state machines, sequences, alarms, interlocks, timers, counters, I/O mapping, scan-cycle behavior, or vendor-specific PLC environments such as Siemens, Rockwell, Mitsubishi, Omron, Beckhoff, Schneider, Delta, Keyence, Panasonic, or CODESYS. Do not use for generic electronics, wiring-only work, broad industrial networking, or final safety certification.
metadata:
  {
    "openclaw":
      {
        "requires": { "bins": ["openclaw"] }
      },
    "version": "1.0.0",
    "author": "OpenClaw Community",
    "tags": ["plc", "iec61131-3", "st", "ladder", "sfc", "siemens", "rockwell", "mitsubishi", "omron", "codesys", "beckhoff", "schneider", "delta", "keyence", "panasonic"]
  }
---

# PLC Skill

Treat this as a general PLC skill with explicit vendor routing, not as a vague all-brands encyclopedia.

Work in two layers:

1. Common PLC layer
2. Vendor-specific layer when the platform is identifiable

Always keep these layers separate.

## Operating model

First decide whether the request is actually a PLC/programming task.

Then classify it as one of:

- common PLC question with no confirmed vendor
- vendor-specific PLC question
- mixed / ambiguous vendor question
- out-of-scope non-PLC question

If the vendor is known, use the matching vendor references first for environment, terminology, program organization, instruction semantics, and tooling behavior.

If the vendor is unknown, answer from the common PLC layer first and explicitly mark which details depend on vendor, model, software, or language.

If the user mixes multiple vendor ecosystems or terms, point out the likely mismatch instead of silently merging them.

## Core boundaries

This skill covers:

- PLC logic design
- sequence / state-machine / step control
- alarms, latches, resets, interlocks
- timers, counters, edge-triggered behavior
- I/O mapping strategy
- program organization and modularity
- debugging and troubleshooting
- code review and refactoring
- explicit support for reading, writing, and reviewing Structured Text (ST), Ladder Diagram (LD), Function Block Diagram (FBD), and Sequential Function Chart (SFC) code
- IEC 61131-3 language-level reasoning
- advanced templates for process control, motion, recipes, and data logging
- vendor-specific routing when the platform is known

This skill does not default to:

- generic electronics or PCB work
- pure wiring-only installation answers without control logic context
- broad industrial networking coverage with no PLC-program relevance
- SIL/PL/safety certification conclusions without confirmed field context
- pretending that one vendor's terminology or syntax applies to all vendors

## Read order

Always start with:

- `references/common/scope-and-trigger-rules.md`
- `references/common/task-router.md`
- `references/common/knowledge-priority.md`

Then conditionally load:

- `references/vendors/vendor-routing.md` only when the request includes vendor, software, CPU family, device model, memory/tag, or platform terminology cues.
- `templates/common/template-map.md` only for generation, refactor, or pattern-selection tasks.

Then load only the narrowest files needed.

## Common layer responsibilities

Use the common layer for:

- IEC 61131-3 framing and language-level concepts
- sequence, state, alarm, interlock, reset, ownership, and scan-cycle reasoning
- engineering structure and maintainability guidance
- generic debugging, review, and completeness handling
- handling LD, FBD, and SFC code alongside ST
- leveraging common templates, checklists, and response format

Read from `references/common/` and `templates/common/` first when the vendor is unknown.

## Vendor layer responsibilities

Use a vendor layer for:

- vendor software environment and engineering workflow
- vendor terminology and model-family cues
- vendor-specific instruction, device, memory, or tag conventions
- project organization norms for that platform
- debugging behavior and common platform pitfalls
- official manual routing and evidence preference for that ecosystem

### Current support depth

Deepest production path:

- Mitsubishi FX3U + GX Works2 + Structured Project + ST

Targeted secondary modules:

- Siemens
- Rockwell / Allen-Bradley
- Omron

Baseline routing/reference modules:

- Beckhoff
- Schneider
- Codesys
- Delta
- Keyence
- Panasonic

Do not assume every vendor path has the same depth, examples, or eval coverage.

## Evidence priority

Use evidence in this order:

1. Bundled common references for PLC-generic engineering rules
2. Bundled vendor references for the identified platform
3. Vendor official manuals / official software docs
4. IEC 61131-3 and PLCopen material
5. Bundled templates and examples
6. Community material as low-priority supplement

If the answer depends on vendor-specific behavior and the vendor is not confirmed, say so.

## Response rules

Always:

- separate confirmed facts from assumptions
- say when implementation details depend on vendor/model/software
- prefer modular, reviewable outputs over giant code dumps
- use templates/checklists when inputs are incomplete
- stay conservative in safety-relevant topics
