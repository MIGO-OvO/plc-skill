# Beckhoff Official Documentation Index

This file indexes official Beckhoff documentation for TwinCAT 3 and PC-based control systems.

## Primary Documentation Sources

### Beckhoff Information System
- Main portal: https://infosys.beckhoff.com
- Comprehensive online documentation for all TwinCAT products
- Searchable by product code (e.g., TC1200, TF5xxx)

### TwinCAT 3 PLC Programming

#### TC1200 - TwinCAT 3 PLC
- Product page: https://www.beckhoff.com/en-en/products/automation/twincat/tc1xxx-twincat-3-base/tc1200.html
- Covers:
  - IEC 61131-3 programming (all 5 languages)
  - Online changes and debugging
  - Cycle times from 50 µs
  - PLCopen Base Level certified
  - Integration with Visual Studio

#### TwinCAT 3 PLC Library: Tc2_MC2 (Motion Control)
- Manual: Available via Beckhoff download center
- PDF: 117 pages, comprehensive motion control documentation
- Covers:
  - PLCopen Motion Control V2.0 function blocks
  - Point-to-point, continuous, and synchronized movements
  - Axis coupling (master-slave)
  - Homing and manual motion
  - MC_Power, MC_MoveAbsolute, MC_MoveVelocity, etc.

### Key Features of TwinCAT 3 Documentation

- **Integrated with Visual Studio**: TwinCAT 3 uses Visual Studio as its IDE
- **IEC 61131-3 3rd Edition**: Full compliance with the latest standard
- **Object-Oriented Programming**: Supports methods, properties, inheritance, and interfaces for function blocks
- **C/C++ Integration**: Advanced users can write real-time C/C++ modules alongside PLC code

## Programming Languages

TwinCAT 3 supports all five IEC 61131-3 languages:
1. **Structured Text (ST)**: Most commonly used for complex logic
2. **Ladder Diagram (LD)**: Traditional relay logic
3. **Function Block Diagram (FBD)**: Graphical data flow
4. **Sequential Function Chart (SFC)**: State machines
5. **Instruction List (IL)**: Low-level, rarely used

## Data Types

Standard IEC 61131-3 types:
- **BOOL, BYTE, WORD, DWORD, LWORD**
- **SINT, USINT, INT, UINT, DINT, UDINT, LINT, ULINT**
- **REAL, LREAL**
- **TIME, DATE, TIME_OF_DAY, DATE_AND_TIME**
- **STRING**

## Common Libraries

### OSCAT (Open Source Community for Automation Technology)
- Website: www.oscat.de
- Extensive reusable function blocks for IEC 61131-3
- Compatible with TwinCAT when imported as libraries
- Covers: Math, string manipulation, communication, data logging

### Tc2_Standard
- Built-in TwinCAT standard library
- Basic functions and function blocks

### Tc2_System
- System-level functions (file I/O, registry access, etc.)

## TwinCAT vs. Codesys

TwinCAT 3 is built on the Codesys V3 runtime engine, so:
- **ST syntax is 99% compatible** with Codesys ST
- **Function block libraries** are generally cross-compatible
- **IDE difference**: TwinCAT uses Visual Studio; Codesys uses its own IDE

## Evidence Priority

When answering Beckhoff-specific questions, use sources in this order:
1. Beckhoff Information System (infosys.beckhoff.com)
2. Official TwinCAT 3 manuals and library documentation
3. IEC 61131-3 standards
4. OSCAT library documentation
5. Community resources (lowest priority)

---
Last updated: 2026-04-06
