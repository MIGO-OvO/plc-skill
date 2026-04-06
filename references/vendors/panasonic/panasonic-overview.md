# Panasonic Overview

Use this module when the request is clearly in the Panasonic ecosystem.

## Current State

This vendor module contains comprehensive rules for Panasonic FP-series PLCs and Control FPWIN Pro programming software. It covers:

- Full IEC 61131-3 compliance (all five languages)
- Program organization and task configuration
- Motion control integration with MINAS servo drives
- Official documentation index with direct links

## Reference Priority

When a Panasonic context is confirmed, read these files in addition to the common PLC rules:

1. `references/vendors/panasonic/panasonic-overview.md` (this file - context setting)
2. `references/vendors/panasonic/panasonic-rules.md` (core engineering rules)
3. `references/vendors/panasonic/official-doc-index.md` (for official manual citations)

## Key Focus Areas

### Full IEC 61131-3 Compliance
Panasonic's Control FPWIN Pro is one of the most standards-compliant PLC programming environments available. It supports all five IEC 61131-3 languages natively:
- Ladder Diagram (LD)
- Function Block Diagram (FBD)
- Structured Text (ST)
- Instruction List (IL)
- Sequential Function Chart (SFC)

This makes code highly portable and allows developers to choose the best language for each task.

### Motion Control Integration
Panasonic PLCs are tightly integrated with Panasonic MINAS servo drives via the **RTEX (Real-Time Express)** motion bus.
- High-speed, synchronized multi-axis control
- Dedicated motion libraries in FPWIN Pro
- Seamless configuration and tuning

### DUT (Data Unit Type) Support
FPWIN Pro strongly encourages the use of structured data types (DUTs) to organize complex machine data. This is similar to UDTs in other platforms but follows the IEC 61131-3 naming convention.

## Controller Families

### FP0 Series
- Ultra-compact, entry-level PLC
- 10-32 I/O points
- Ideal for simple standalone machines

### FP-X Series
- Compact, high-performance PLC
- Built-in Ethernet and USB
- Expandable I/O
- Very popular for small to medium machines

### FPÎ£ (Sigma) Series
- Mid-range modular PLC
- High-speed processing
- Extensive I/O expansion
- Suitable for complex automation

### FP0H Series
- Compact PLC with integrated motion control
- RTEX motion bus support
- Ideal for compact machines requiring positioning

## Common Terminology

| Panasonic Term | Generic PLC Term | Description |
|----------------|------------------|-------------|
| Control FPWIN Pro | IDE / Software | Programming environment |
| DUT | UDT / Structure | Data Unit Type (user-defined) |
| RTEX | Motion Bus | Real-Time Express (Panasonic motion protocol) |
| System Register | System Flag | System status and control |
| R (Relay) | Internal Relay | Internal bit memory |

## Routing Signals

Route to Panasonic module when any of these cues are present:

### Explicit Mentions
- Panasonic
- FP Series
- Control FPWIN Pro
- FPWIN Pro7

### Controller Families
- FP0, FP-X, FPÎ£ (Sigma), FP2, FP0H

### Terminology
- RTEX (Real-Time Express)
- MINAS (servo drives, in PLC context)
- Control FPWIN Pro
- DUT (in Panasonic context)

## Boundary Conditions

### FPWIN Pro vs. Legacy Software
- **Control FPWIN Pro**: Modern, IEC 61131-3 compliant software for all current FP series.
- **FPWIN GR**: Legacy software for older FP series (FP1, FP-M, FP-C). Different programming paradigm.
- If the user mentions FP0, FP-X, FPÎ£ â†?use FPWIN Pro rules.
- If the user mentions FP1, FP-M â†?note that these are legacy and use different software.

### Panasonic vs. Other IEC 61131-3 Platforms
- FPWIN Pro is very similar to Codesys, Beckhoff TwinCAT, and other IEC-compliant platforms.
- The main differences are in hardware configuration and vendor-specific libraries (e.g., RTEX motion).
- ST syntax is standard IEC, so code is highly portable.

### Mixing Vendors
If a user asks to migrate from Panasonic to another vendor (or vice versa), explicitly map the concepts:
- Panasonic DUT â†?Siemens UDT / Rockwell UDT / Codesys DUT
- Panasonic Global Variable â†?Siemens Global DB / Rockwell Controller-Scoped Tag / Codesys GVL
- Panasonic RTEX Motion â†?Siemens S7-1500 Motion / Rockwell Kinetix / Beckhoff TwinCAT Motion
- Panasonic R/T/C (legacy addressing) â†?Mitsubishi M/T/C / Omron CIO/T/C

---

**Last updated:** 2026-04-06
