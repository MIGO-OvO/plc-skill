# Delta Electronics Overview

Use this module when the request is clearly in the Delta Electronics ecosystem.

## Current State

This vendor module contains comprehensive rules for Delta Electronics PLCs (DVP, AH, AS series) and programming software (WPLSoft, ISPSoft). It covers:

- Device-based addressing system (X, Y, M, S, T, C, D)
- Octal addressing for I/O
- WPLSoft (legacy) and ISPSoft (modern) programming environments
- Official documentation index with direct links

## Reference Priority

When a Delta context is confirmed, read these files in addition to the common PLC rules:

1. `references/vendors/delta/delta-overview.md` (this file - context setting)
2. `references/vendors/delta/delta-dvp-rules.md` (core engineering rules)
3. `references/vendors/delta/official-doc-index.md` (for official manual citations)

## Key Focus Areas

### Device-Based Addressing
Delta uses a device-based addressing system similar to Mitsubishi:
- **X/Y**: I/O (octal addressing)
- **M**: Auxiliary relays (internal bits)
- **S**: Step relays (for SFC)
- **T**: Timers
- **C**: Counters
- **D**: Data registers

### Octal Addressing for I/O
**Critical concept:** X and Y devices use **octal numbering**, not decimal.
- Valid addresses: X0, X1, ..., X7, X10, X11, ..., X17, X20, ...
- Invalid addresses: X8, X9, X18, X19 (these do not exist)

This is a common source of confusion for users transitioning from other PLC brands.

### Two Programming Environments

#### WPLSoft (Legacy)
- Used for DVP-ES, DVP-EX, DVP-SS, DVP-SA, DVP-SX series
- Primarily Ladder Diagram (LD)
- Simple, lightweight, widely deployed
- Proprietary instruction set

#### ISPSoft (Modern)
- Used for AH series, AS series, newer DVP models
- Supports LD, SFC, FBD, and limited ST
- Partial IEC 61131-3 compliance
- More advanced features (Function Blocks, structured programming)

## Controller Families

### DVP Series (Micro/Compact PLCs)
- Entry-level to mid-range PLCs
- Very cost-effective
- Widely used in Asia and emerging markets
- Series: ES, EX, SS, SA, SX, SC, EH, SV

### AH Series (Advanced PLCs)
- High-performance controllers
- Native Ethernet and EtherCAT support
- Suitable for complex automation and data-intensive applications

### AS Series (Motion Control PLCs)
- Integrated motion control
- EtherCAT motion bus
- PLCopen motion function blocks

## Common Terminology

| Delta Term | Generic PLC Term | Description |
|------------|------------------|-------------|
| Auxiliary Relay (M) | Internal Bit | Internal memory bit |
| Data Register (D) | Data Memory | 16-bit data storage |
| Step Relay (S) | Step | For SFC programming |
| Special M/D | System Flags | System status and control |

## Routing Signals

Route to Delta module when any of these cues are present:

### Explicit Mentions
- Delta Electronics
- Delta PLC
- DVP series
- AH series
- AS series

### Software Mentions
- WPLSoft
- ISPSoft
- DOPSoft (HMI software, often used with Delta PLCs)

### Terminology
- Auxiliary Relay (M)
- Data Register (D)
- Step Relay (S)
- Octal addressing for X/Y

## Boundary Conditions

### Delta vs. Mitsubishi
Delta's addressing system is heavily influenced by Mitsubishi:
- Both use device-based addressing (X, Y, M, D, T, C)
- Both use octal addressing for I/O
- Instruction sets are similar but not identical

**Key differences:**
- Delta uses `K` for decimal constants; Mitsubishi uses `K` as well
- Delta special M relays (M1000~M1999) vs. Mitsubishi special M relays (M8000~M8511)
- Delta D registers are 16-bit by default; combine two for 32-bit operations

### WPLSoft vs. ISPSoft
- If the user mentions DVP-ES, DVP-EX, DVP-SS → likely WPLSoft
- If the user mentions AH series, AS series, or IEC 61131-3 → likely ISPSoft
- If unsure, ask which software they are using

### Mixing Vendors
If a user asks to migrate from Delta to another vendor (or vice versa), explicitly map the concepts:
- Delta M → Mitsubishi M / Siemens M / Rockwell Internal Bit
- Delta D → Mitsubishi D / Siemens DB / Rockwell Tag
- Delta X/Y (octal) → Mitsubishi X/Y (octal) / Siemens I/Q (decimal) / Rockwell I/O (decimal)

---

**Last updated:** 2026-04-06
