# Schneider Electric Official Documentation Index

This file indexes official Schneider Electric documentation for Modicon PACs and EcoStruxure Control Expert (formerly Unity Pro).

## Primary Documentation Sources

### Main Software: EcoStruxure Control Expert
EcoStruxure Control Expert (formerly Unity Pro) is the primary programming environment for Modicon M340, M580, Premium, Quantum, and Momentum PLCs/PACs.

#### Control Expert - Program Languages and Structure Reference Manual
- Document Number: 35006144K01000
- Covers:
  - Project structure and execution (Tasks, Events, SR)
  - Data types and variables
  - Programming languages (LD, FBD, SFC, ST, IL)
  - Derived Data Types (DDT)
  - Derived Function Blocks (DFB)
- Link: https://www.se.com/us/en/download/document/35006144K01000/

#### Control Expert - Operating Modes
- Document Number: 33003101K01000
- Covers:
  - Online editing (CCOTF - Change Configuration On The Fly)
  - Building and downloading projects
  - Animation and debugging
  - Simulation mode
- Link: https://www.se.com/us/en/download/document/33003101K01000/

#### Control Expert - Standard Block Library
- Covers all standard IEC and Schneider-specific EFB (Elementary Function Blocks)
- Timers, counters, math, logic, and data manipulation instructions

### Hardware Manuals

#### Modicon M580 Hardware Reference Manual
- Document Number: EIO0000001578
- Covers: Ethernet routing, local backplane, ePAC architecture, coprocessor modules.
- Link: https://www.se.com/us/en/download/document/EIO0000001578/

#### Modicon M340 Hardware Setup Manual
- Covers: Racks, power supplies, CPU configuration, and discrete/analog I/O.

## Controller Families

### Modicon M580 (ePAC)
- High-end Ethernet Programmable Automation Controller
- Built natively on Ethernet (Ethernet backplane)
- Used for high-availability (Hot Standby), process automation, and DCS (PlantStruxure / EcoStruxure Process Expert)
- Replaces Quantum and Premium series

### Modicon M340 (PAC)
- Mid-range controller
- Uses the X80 I/O platform (which is also used by M580)
- Used for discrete manufacturing and standalone process control

### Legacy Platforms (Still programmed with Control Expert)
- **Quantum**: Classic high-end modular PLC
- **Premium**: Classic mid-range modular PLC
- **Momentum**: Distributed I/O controller

## Terminology Mapping

| Schneider / Modicon Term | Generic PLC Term | Description |
|--------------------------|------------------|-------------|
| Control Expert | IDE / Software | Formerly Unity Pro |
| EFB | Instruction | Elementary Function Block |
| DFB | Function Block | Derived Function Block (User-defined) |
| DDT | UDT | Derived Data Type (User-defined structure) |
| X80 | I/O System | Common I/O platform for M340/M580 |
| CCOTF | Online Edit | Change Configuration On The Fly |
| Mast Task | Main Task | Primary cyclic task |

## Evidence Priority

When answering Schneider-specific questions, use sources in this order:
1. Control Expert (Unity Pro) Reference Manuals (Program Languages & Structure)
2. EcoStruxure Control Expert Online Help
3. M580/M340 Hardware Reference Manuals
4. IEC 61131-3 standards
5. Community resources (lowest priority)

---
Last updated: 2026-04-06
