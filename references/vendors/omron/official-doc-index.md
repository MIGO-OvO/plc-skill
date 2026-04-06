# Omron Official Documentation Index

This file indexes official Omron documentation for the NJ/NX-series (Sysmac) and CJ/CS/CP-series controllers.

## Primary Documentation Sources

### Sysmac (NJ/NX Series) Manuals

The modern Omron automation platform uses Sysmac Studio and NJ/NX-series machine automation controllers.

#### NJ/NX-series CPU Unit Software User's Manual
- Manual Number: W501
- PDF: https://files.omron.eu/downloads/latest/manual/en/w501_nj_nx-series_cpu_unit_software_users_manual_en.pdf
- Covers:
  - System configuration and setup
  - Task execution and priority
  - Variable definition (Global, Local, System)
  - Program organization units (POU: Programs, Functions, Function Blocks)
  - Execution rules and I/O refreshing

#### NJ/NX-series Instructions Reference Manual
- Manual Number: W502
- PDF: https://files.omron.eu/downloads/latest/manual/en/w502_nj_nx-series_instructions_reference_manual_en.pdf
- Covers:
  - Comprehensive list of all available instructions
  - Timer and Counter instructions (TON, TOF, CTU, etc.)
  - Math and Logical instructions
  - Data movement and array processing
  - Type conversion instructions

#### Sysmac Studio Version 1 Operation Manual
- Manual Number: W504
- Covers:
  - Software installation and project creation
  - Programming environment navigation
  - Compiling, building, and downloading
  - Online debugging and tracing

#### NJ/NX-series Motion Control User's Manual
- Manual Number: W507
- PDF: https://edata.omron.com.au/eData/NJ/W507-E1-23.pdf
- Covers:
  - Motion control architecture
  - Axis and Axes Group configuration
  - EtherCAT communication for motion
  - Motion control parameters

#### NJ/NX-series Motion Control Instructions Reference Manual
- Manual Number: W508
- PDF: https://www.omron-ap.co.in/data_pdf/mnu/w508-e1-25_nx_nx1p_nj.pdf
- Covers:
  - Single-axis motion instructions (MC_Power, MC_MoveAbsolute, etc.)
  - Multi-axis coordinated motion
  - Electronic camming and gearing

#### Built-in Port User's Manuals
- **EtherNet/IP** (W506): Tag data links, CIP messaging
- **EtherCAT** (W505): EtherCAT network wiring, slave configuration, PDO mapping

### Legacy/Classic (CJ/CS/CP Series) Manuals

The classic Omron PLCs programmed with CX-Programmer.

#### SYSMAC CS/CJ/CP/NSJ Series Communications Commands
- Manual Number: W342
- PDF: https://www.myomron.com/downloads/1.Manuals/PLCs/CPUs/W342-E1-14%20CS_CJ_CP+HostLink%20FINS%20ReferenceManual.pdf
- Covers: FINS commands, Host Link protocol

#### SYSMAC CJ2 CPU Unit Software User's Manual
- Manual Number: W473
- Covers: CJ2 architecture, memory areas (CIO, D, H, W, etc.), tasks.

#### SYSMAC CP1H/CP1L/CP1E Programming Manuals
- Manual Numbers: W451 (CP1H), W462 (CP1L), W480 (CP1E)
- Covers: Instruction set and programming for compact PLCs.

## Controller Families

### Modern (Sysmac Architecture)
- **NX-Series**: High-speed, high-precision machine automation controllers (e.g., NX1P, NX102, NX701). Supports EtherCAT and EtherNet/IP inherently.
- **NJ-Series**: The original Sysmac controllers (e.g., NJ301, NJ501). Used for heavy motion and logic integration.

### Classic (CX-One Architecture)
- **CJ-Series**: Modular, rackless PLCs (CJ1, CJ2). Highly successful general-purpose PLCs.
- **CS-Series**: Large, rack-based PLCs for process and large automation.
- **CP-Series**: Micro/Compact PLCs (CP1E, CP1L, CP1H). Very common in standalone machines.

## Programming Software

### Sysmac Studio
- **Used for**: NJ, NX, NY series controllers.
- **Architecture**: Variable-based (tag-based) memory, full IEC 61131-3 compliance.
- **Languages**: Ladder Diagram (LD), Structured Text (ST), Function Block Diagram (FBD, implicitly via inline ST or LD).

### CX-Programmer (part of CX-One)
- **Used for**: CJ, CS, CP series controllers.
- **Architecture**: Address-based memory (CIO, D, W, H areas).
- **Languages**: Primary Ladder Diagram (LD), with support for Function Blocks (ST or LD inside).

## Evidence Priority

When answering Omron questions, use sources in this order:
1. Official Manuals (W501, W502 for NJ/NX; W473, W451 for CJ/CP)
2. Sysmac Studio or CX-Programmer online help
3. Omron application examples
4. IEC 61131-3 standards (for NJ/NX language-level questions)
5. Community resources (lowest priority)

---

Last updated: 2026-04-06
