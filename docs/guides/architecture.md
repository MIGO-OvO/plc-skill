# Architecture Guide

The PLC Skill is built on a modular architecture designed to separate core automation logic from manufacturer-specific syntax and tooling. This ensures the AI can reason about complex control problems universally before adapting the solution to a specific target platform.

## The Two-Layer Architecture

To prevent the AI from generating "vague pseudocode", the knowledge base is separated into two distinct layers: the **Common Layer** and the **Vendor Layer**. There is a strict boundary between these layers—cross-pollution is not allowed.

### 1. Common Layer (`references/common/`)
The Common Layer contains vendor-neutral knowledge based on the IEC 61131-3 standard and universal automation principles. This layer focuses on *what* the logic should do, independent of *how* a specific PLC implements it. 

It includes:
- **IEC 61131-3 Logic:** Standard language rules for Structured Text (ST), Ladder Diagram (LD), and Sequential Function Chart (SFC).
- **State Machine Patterns:** Best practices for implementing robust, scalable state machines.
- **Scan-Cycle Reasoning:** Core concepts of how PLCs execute logic (read inputs -> execute logic -> write outputs) and how to avoid race conditions.
- **General Debugging Checklists:** Universal troubleshooting steps for common automation issues.
- **Safety Boundaries:** Rules instructing the AI to refuse high-confidence conclusions for safety-critical (SIL/PL) systems without field verification.

### 2. Vendor Layer (`references/vendors/`)
The Vendor Layer contains the specific syntax, memory models, software quirks, and documentation indexes for individual manufacturers. It kicks in automatically when a specific PLC brand or software is detected.

It includes:
- **Specific Syntax & Naming:** e.g., using `#` for local variables in Siemens TIA Portal vs. tag-based addressing in Rockwell Studio 5000 vs. `X/Y/M/D` devices in Mitsubishi.
- **Memory Models:** Data block (DB) structures, controller tags vs. program tags, and hardware I/O mapping.
- **Software Quirks & Pitfalls:** Undocumented behaviors, compiler limitations, timer resolutions, and IDE-specific features.
- **Documentation Indexes:** References to official manuals and manufacturer guidelines.

*Note: If a vendor is unknown, the AI defaults to the Common Layer and explicitly states its IEC 61131-3 assumptions rather than guessing a vendor.*

## Template Library

To ensure consistency, reliability, and production-ready code, the skill utilizes a structured **Template Library** (`templates/common/`). 

Instead of writing complex control routines from scratch every time, the AI leverages these battle-tested templates:
- **Discrete Control:** Standardized code blocks for alarms, sequencers, equipment modules, and motor control (start/stop/interlock).
- **Process & Analog Control:** Templates for PID loops (with anti-windup and bumpless transfer), analog scaling (raw to engineering units), and signal filtering (debounce, low-pass filters).
- **Advanced Automation:** Templates for PLCopen Motion Control, Recipe Management, and Data Logging.

Using templates guarantees that generated code adheres to industry best practices, handles edge cases, and maintains a uniform, modular structure.

## Routing Flow

When a user interacts with the PLC Skill, the prompt must be mapped to the correct context files. This is handled by an intelligent routing flow:

1. **`SKILL.md`**: The entry point. It receives the user's request, establishes the two-layer architecture rules, and initializes the reasoning process.
2. **`references/common/task-router.md`**: Analyzes the request to determine the *type* of task (e.g., code generation, debugging, code review, explanation).
3. **`references/reference-map.md`**: Based on the task type and identified vendor, this map selects the exact markdown files from the Common and Vendor layers to load into the context window.
4. **`templates/common/template-map.md`**: Selects the appropriate code template if the task involves generation or refactoring.

This flow ensures the LLM is only fed the specific documentation it needs, preventing context pollution and hallucination while maximizing accuracy.