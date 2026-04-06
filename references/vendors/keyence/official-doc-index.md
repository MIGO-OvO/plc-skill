# Keyence Official Documentation Index

This file indexes official Keyence documentation for KV-series PLCs and KV Studio programming software.

## Primary Documentation Sources

### Keyence Support Portal
- Main portal: https://www.keyence.com/support/user/controls/plc/
- Manuals: https://www.keyence.com/support/user/controls/plc/manual/
- Software downloads: https://www.keyence.com/support/user/controls/plc/software/

### KV Series Documentation

#### KV Series User's Manual
- Available for each CPU unit series (KV-8000, KV-7000, KV-5000, KV-3000, KV Nano)
- Covers:
  - Hardware specifications and wiring
  - Unit installation and maintenance
  - System configuration
  - I/O specifications

#### KV Studio Programming Manual
- Integrated programming environment for all KV series
- Covers:
  - Ladder Diagram (LD) programming
  - Script programming (text-based, similar to BASIC)
  - Function Block (FB) programming
  - Debugging and simulation

#### KV-8000 Series Script Programming Manual
- Detailed guide for script programming
- Covers:
  - Script syntax and operators
  - Control statements (IF, FOR, WHILE)
  - Built-in functions
  - Data types and variables

## Controller Families

### KV-8000 Series
- High-end modular PLC
- Built-in Machine Operation Recorder function
- OPC UA server support (KV-8000A)
- EtherNet/IP, EtherCAT support
- Integrated motion control (KV-X MOTION)

### KV-7000 Series
- Mid-range modular PLC
- Compact design
- Ethernet and serial communication

### KV-5000 Series
- Compact PLC with integrated I/O
- Cost-effective for small to medium applications

### KV-3000 Series
- Entry-level compact PLC
- Simple programming and setup

### KV Nano Series
- Ultra-compact PLC
- Ideal for space-constrained applications

## Programming Software

### KV Studio
- **Used for**: All KV series controllers
- **Languages**: 
  - Ladder Diagram (LD)
  - Script (text-based, BASIC-like syntax)
  - Function Block (FB)
- **Features**:
  - Integrated simulation
  - Online debugging
  - Machine Operation Recorder integration
  - Symbol-based programming (tag names)

## Key Features

### Machine Operation Recorder
- Records all equipment information before and after a shutdown
- Monitors cycle time, device operating times, and waveform data
- Enables quick problem identification and resolution

### Symbol-Based Programming
- Use meaningful tag names instead of device addresses
- Improves code readability and maintainability
- Export/import tags via CSV/TXT files

### Data Types
Keyence KV-8000 supports modern data types:
- **BOOL**: Boolean
- **INT**: 16-bit signed integer
- **UINT**: 16-bit unsigned integer
- **DINT**: 32-bit signed integer
- **UDINT**: 32-bit unsigned integer
- **REAL**: 32-bit floating point
- **LREAL**: 64-bit floating point
- **STRING**: Character string
- **ARRAY**: Arrays of any data type
- **STRUCT**: User-defined structures

## Evidence Priority

When answering Keyence-specific questions, use sources in this order:
1. Official Keyence manuals (KV Series User's Manual, KV Studio Programming Manual)
2. Keyence support portal resources
3. IEC 61131-3 standards (for general PLC concepts)
4. Community resources (lowest priority)

---
Last updated: 2026-04-06
