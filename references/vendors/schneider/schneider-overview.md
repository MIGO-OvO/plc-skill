# Schneider Electric / Modicon Overview

Use this module when the request is clearly in the Schneider Electric ecosystem.

## Current State

This vendor module contains comprehensive rules for Modicon PACs (M580, M340, Premium, Quantum) and the EcoStruxure Control Expert (formerly Unity Pro) programming environment. It covers:

- Task execution and section organization
- Derived Data Types (DDT) and Derived Function Blocks (DFB)
- Addressing conventions (%M, %MW, %I, %Q)
- Change Configuration On The Fly (CCOTF / Online Editing)
- Official documentation index with direct links

## Reference Priority

When a Schneider context is confirmed, read these files in addition to the common PLC rules:

1. `references/vendors/schneider/schneider-overview.md` (this file - context setting)
2. `references/vendors/schneider/schneider-rules.md` (core engineering rules)
3. `references/vendors/schneider/official-doc-index.md` (for official manual citations)

## Key Focus Areas

### EcoStruxure Control Expert (Unity Pro)
The primary programming environment for modern Schneider PACs. It is fully IEC 61131-3 compliant and supports all five programming languages natively.

### Architecture: MAST and FAST Tasks
Schneider organizes execution strictly into tasks:
- **MAST Task**: The default, primary cyclic task where most logic resides.
- **FAST Task**: Higher priority, preemptive task for time-critical logic.
- **Sections**: Code is divided into sections within these tasks.

### DFBs and DDTs
- **DFB (Derived Function Block)**: User-defined function block. Essential for encapsulation and reuse.
- **DDT (Derived Data Type)**: User-defined structure. Crucial for organizing machine data into logical units.

### Memory Addressing
Schneider uses a mix of symbolic (unlocated) and absolute (located) addressing:
- `%M` (Memory Bits) and `%MW` (Memory Words)
- I/O is addressed hierarchically: `%I<rack>.<module>.<channel>`

### CCOTF (Change Configuration On The Fly)
A standout feature of the high-end Modicon platform (especially M580), allowing significant online changes (adding modules, changing configurations) without stopping the process.

## Controller Families

### Modicon M580 (ePAC)
- The flagship Ethernet Programmable Automation Controller.
- Built on a native Ethernet backplane.
- Supports advanced redundancy (Hot Standby) and cybersecurity features (Achilles Level 2).

### Modicon M340 (PAC)
- The mid-range workhorse.
- Uses the same X80 I/O platform as the M580.
- Excellent for standalone machines and medium-sized processes.

### Modicon Premium and Quantum
- Legacy platforms that are still widely deployed and fully supported by Control Expert.
- Quantum was the standard for large process control before M580.

## Common Terminology

| Schneider / Modicon Term | Generic PLC Term | Description |
|--------------------------|------------------|-------------|
| Control Expert | IDE / Software | Formerly Unity Pro |
| MAST Task | Main Task | Primary cyclic task |
| Section | Routine / Network | Division of code within a task |
| DFB | Function Block | User-defined instruction |
| EFB | Built-in Function | System-provided instruction |
| DDT | UDT / Structure | User-defined data type |
| Unlocated Variable | Symbolic Tag | Variable not tied to a physical address |
| Located Variable | Addressed Tag | Variable tied to `%M`, `%MW`, `%I`, `%Q` |

## Routing Signals

Route to Schneider module when any of these cues are present:

### Explicit Mentions
- Schneider Electric
- Modicon
- EcoStruxure Control Expert
- Unity Pro
- Vijeo Designer (HMI software often used with Modicon)

### Controller Families
- M580, M340, M251, M241, M221 (Note: M2xx series uses SoMachine/Machine Expert, which is Codesys-based. See Boundary Conditions below).
- Quantum, Premium, Momentum

### Terminology
- MAST task, FAST task
- DFB, DDT, EFB
- `%M`, `%MW`, `%MD` addressing
- CCOTF (Change Configuration On The Fly)

## Boundary Conditions

### Control Expert vs. Machine Expert (Codesys)
Schneider has two distinct software ecosystems:
1. **EcoStruxure Control Expert (Unity Pro)**: Used for M340, M580, Premium, Quantum. This is the "true Modicon" architecture.
2. **EcoStruxure Machine Expert (SoMachine)**: Used for M221, M241, M251, M262. This is a **Codesys-based** environment.

**Critical Routing Rule:**
If the user specifies M241, M251, M262, or Machine Expert/SoMachine, route them primarily using the **Codesys** rules, noting Schneider-specific hardware features. If they specify M340, M580, or Control Expert/Unity Pro, use this Schneider Modicon module.

### Mixing Vendors
If a user asks to migrate from Schneider to another vendor (or vice versa), explicitly map the concepts:
- Schneider MAST Task â†?Siemens OB1 / Rockwell Continuous Task
- Schneider DFB â†?Siemens FB / Rockwell AOI
- Schneider DDT â†?Siemens UDT / Rockwell UDT
- Schneider `%MW` â†?Siemens DB / Mitsubishi `D` registers

---

**Last updated:** 2026-04-06
