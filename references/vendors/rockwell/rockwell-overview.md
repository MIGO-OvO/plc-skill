# Rockwell / Allen-Bradley Overview

Use this module when the request is clearly in the Rockwell Automation / Allen-Bradley ecosystem.

## Current State

This vendor module contains comprehensive rules for Logix 5000 controllers (ControlLogix, CompactLogix, GuardLogix) using Studio 5000 Logix Designer. It covers:

- Tag-based memory architecture
- Task/Program/Routine hierarchy
- Add-On Instructions (AOI)
- All five IEC 61131-3 programming languages
- Official documentation index with direct links to Rockwell Literature Library

## Reference Priority

When a Rockwell context is confirmed, read these files in addition to the common PLC rules:

1. `references/vendors/rockwell/rockwell-overview.md` (this file - context setting)
2. `references/vendors/rockwell/rockwell-rules.md` (core engineering rules)
3. `references/vendors/rockwell/rockwell-st-programming-guide.md` (if ST programming is involved)
4. `references/vendors/rockwell/rockwell-cheatsheet.md` (quick reference)
5. `references/vendors/rockwell/official-doc-index.md` (for official manual citations)

## Key Focus Areas

### Tag-Based Memory Architecture
Unlike older PLCs with fixed memory addresses (e.g., N7:0, B3:1), Logix 5000 uses **symbolic tag-based addressing**:
- Tags have meaningful names (e.g., `ConveyorSpeed`, `Tank1_Level`)
- No need to remember memory file numbers
- Controller-scoped vs. Program-scoped tags for encapsulation
- Alias tags map symbolic names to physical I/O

### Task/Program/Routine Hierarchy
Rockwell uses a three-level structure:
- **Task**: Scheduling container (Continuous, Periodic, Event)
- **Program**: Collection of routines and program-scoped tags
- **Routine**: Executable code (Ladder, FBD, ST, SFC)
- Use `JSR` (Jump to Subroutine) to call other routines within a program

### Add-On Instructions (AOI)
Custom, reusable instructions that encapsulate logic and data:
- Similar to Function Blocks in other platforms
- **Critical limitation**: Cannot be edited online. Must download to modify.
- Use for repetitive logic (motor control, valve control, scaling)

### Timer Structures
Rockwell timers use a `TIMER` data type with specific members:
- `.PRE`: Preset value (in milliseconds)
- `.ACC`: Accumulated value
- `.EN`: Enable bit
- `.TT`: Timing bit (true while timing)
- `.DN`: Done bit (true when `.ACC >= .PRE`)

### Multi-Language Support
Logix 5000 supports all five IEC 61131-3 languages in one project:
- **Ladder Diagram (LD)**: Most common, relay-logic style
- **Function Block Diagram (FBD)**: Process control, data flow
- **Sequential Function Chart (SFC)**: State machines, batch processes
- **Structured Text (ST)**: Complex math, loops, string handling
- **Instruction List (IL)**: Rarely used

## Controller Families

### ControlLogix (1756)
- High-performance, modular platform
- Large I/O capacity
- Redundancy options
- Typical applications: Large manufacturing lines, critical infrastructure

### CompactLogix (1769, 5069)
- Compact, cost-effective
- Integrated I/O and communication
- 5069 series (latest generation) supports LINT, LREAL, STRING data types
- Typical applications: Machine control, small to medium systems

### GuardLogix
- Safety-rated versions (SIL 3 / PLe)
- Integrated safety and standard control
- Typical applications: Machinery with safety requirements

### SoftLogix (1789)
- Software-based controller on Windows PC
- Same programming as hardware controllers
- Typical applications: Simulation, testing, SCADA integration

## Common Terminology

| Rockwell Term | Generic PLC Term | Description |
|---------------|------------------|-------------|
| Tag | Variable | Named data element |
| AOI (Add-On Instruction) | Function Block | Custom reusable instruction |
| UDT (User-Defined Data Type) | Structure / UDT | Custom data structure |
| Controller-Scoped Tag | Global Variable | Accessible from anywhere |
| Program-Scoped Tag | Local Variable | Local to one program |
| JSR (Jump to Subroutine) | CALL | Call another routine |
| MSG Instruction | Message / Communication | Explicit messaging |
| Produced/Consumed Tags | Shared Tags | Implicit tag sharing over network |

## Routing Signals

Route to Rockwell module when any of these cues are present:

### Explicit Mentions
- Rockwell Automation
- Allen-Bradley
- Studio 5000
- Logix Designer
- RSLogix (legacy software)

### Controller Families
- ControlLogix
- CompactLogix
- GuardLogix
- SoftLogix
- MicroLogix (older platform, different architecture)

### Terminology
- AOI (Add-On Instruction)
- UDT (User-Defined Data Type)
- JSR (Jump to Subroutine)
- MSG instruction
- Produced/Consumed tags
- Controller-scoped / Program-scoped tags

## Boundary Conditions

### Legacy vs. Modern
- **Modern**: Logix 5000 (ControlLogix, CompactLogix) with Studio 5000 Logix Designer
- **Legacy**: PLC-5, SLC 500, MicroLogix with RSLogix 500/5/5000
- If the request involves legacy platforms, note the significant architectural differences (fixed memory addressing, different instruction set)

### Mixing Vendors
If a user asks to migrate from Rockwell to another vendor (or vice versa), explicitly map the concepts:
- Rockwell Task ->Siemens OB / Codesys Task
- Rockwell AOI ->Siemens FB / Codesys Function Block
- Rockwell Controller-Scoped Tag ->Siemens Global DB / Codesys GVL
- Rockwell Program-Scoped Tag ->Siemens Instance DB / Codesys Program Variable

---

**Last updated:** 2026-04-06
