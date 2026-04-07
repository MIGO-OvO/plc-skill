---
name: plc-skill
description: General PLC development, explanation, review, refactoring, debugging, and troubleshooting skill across IEC 61131-3 style industrial control work. Use when the request involves PLC logic, sequence control, state machines, alarms, interlocks, timers, counters, I/O mapping, Structured Text (ST), Ladder Diagram (LD), Function Block Diagram (FBD), Sequential Function Chart (SFC), program structure, code review, maintainability, or commissioning/debugging. Route through the common PLC layer first, then prefer the matching vendor path when the user mentions the "Big 3" (Siemens, Rockwell, Mitsubishi), our advanced support paths (Omron, Beckhoff), or other supported ecosystems (Schneider, Delta, Keyence, Panasonic, Codesys), software, CPU families, device models, or vendor-specific terminology. Do not prefer this skill for generic electronics, pure wiring-only work without logic context, broad industrial networking without control-program context, or high-confidence safety conclusions without confirmed field conditions.
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

Treat this as a **general PLC skill with explicit vendor routing**, not as a vague all-brands encyclopedia.

Work in two layers:

1. **Common PLC layer**
2. **Vendor-specific layer** when the platform is identifiable

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
- explicit support for reading, writing, and reviewing Structured Text (ST), Ladder Diagram (LD), and Sequential Function Chart (SFC) code
- IEC 61131-3 language-level reasoning
- Advanced Templates (Process Control, Motion, Recipes, Data Logging)
- vendor-specific routing when the platform is known

This skill does not default to:

- generic electronics or PCB work
- pure wiring-only installation answers without control logic context
- broad industrial networking coverage with no PLC-program relevance
- SIL/PL/safety certification conclusions without confirmed field context
- pretending that one vendor's terminology or syntax applies to all vendors

## Read order

Start with:

- eferences/common/scope-and-trigger-rules.md
- eferences/common/task-router.md
- eferences/common/knowledge-priority.md
- eferences/vendors/vendor-routing.md
- 	emplates/common/template-map.md

Then load only the narrowest files needed.

## Common layer responsibilities

Use the common layer for:

- IEC 61131-3 framing and language-level concepts
- sequence, state, alarm, interlock, reset, ownership, and scan-cycle reasoning
- engineering structure and maintainability guidance
- generic debugging, review, and completeness handling
- handling LD (Ladder Diagram) and SFC (Sequential Function Chart) code alongside ST
- leveraging Advanced Templates (Process Control, Motion, Recipes, Data Logging)
- common templates, checklists, and response format

Read from eferences/common/ and 	emplates/common/ first when the vendor is unknown.

## Vendor layer responsibilities

Use a vendor layer for:

- vendor software environment and engineering workflow
- vendor terminology and model-family cues
- vendor-specific instruction, device, memory, or tag conventions
- project organization norms for that platform
- debugging behavior and common platform pitfalls
- official manual routing and evidence preference for that ecosystem

### Deeply Supported Vendors

**The "Big 3" (Mature Modules):**
- Siemens
- Rockwell / Allen-Bradley
- Mitsubishi

**Advanced Support:**
- Omron
- Beckhoff

**Other Supported Ecosystems:**
- Schneider
- Codesys
- Delta
- Keyence
- Panasonic

## Evidence priority

Use evidence in this order:

1. Bundled common references for PLC-generic engineering rules
2. Bundled vendor references for the identified platform
3. Vendor official manuals / official software docs
4. IEC 61131-3 and PLCopen material
5. Bundled templates (including Advanced Templates) and examples
6. Community material as low-priority supplement

If the answer depends on vendor-specific behavior and the vendor is not confirmed, say so.

## Response rules

Always:

- separate confirmed facts from assumptions
- say when implementation details depend on vendor/model/software
- prefer modular, reviewable outputs over giant code dumps
- use templates/checklists when inputs are incomplete
- stay conservative in safety-relevant topics
