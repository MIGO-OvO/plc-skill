# Codesys Overview

Use this module when the request is clearly in the Codesys ecosystem.

## Current State

This vendor module contains comprehensive rules for Codesys V3, the widely-used IEC 61131-3 programming platform. It covers:

- Object-oriented programming (OOP) features
- Program organization and task configuration
- Structured Text (ST) syntax and best practices
- Library ecosystem (Standard, OSCAT, CAA, PLCopen)
- Official documentation index

## Reference Priority

When a Codesys context is confirmed, read these files in addition to the common PLC rules:

1. `references/vendors/codesys/codesys-overview.md` (this file - context setting)
2. `references/vendors/codesys/codesys-rules.md` (core engineering rules)
3. `references/vendors/codesys/official-doc-index.md` (for official manual citations)

## Key Focus Areas

### Codesys as a Platform, Not a Brand
**Critical concept:** Codesys is a **software platform** used by many hardware manufacturers. It is not a PLC brand itself.

**Manufacturers using Codesys:**
- Schneider Electric (M221, M241, M251, M262 - branded as "Machine Expert")
- Wago
- Festo
- ifm electronic
- Eaton
- ABB
- Bosch Rexroth
- Phoenix Contact
- Turck
- And 400+ other manufacturers

When a user mentions one of these brands, check if they're using Codesys. If so, apply Codesys rules but note any manufacturer-specific hardware features.

### IEC 61131-3 Compliance
Codesys is one of the most compliant implementations of the IEC 61131-3 standard.
- Supports all five programming languages (LD, FBD, ST, SFC, IL)
- Full support for IEC 61131-3 3rd edition (OOP features)
- PLCopen certified

### Object-Oriented Programming (OOP)
Codesys V3 fully embraces OOP:
- **Methods**: Functions bound to FBs
- **Properties**: Getter/Setter access
- **Interfaces (`IMPLEMENTS`)**: Define contracts for polymorphism
- **Inheritance (`EXTENDS`)**: Create base classes and derived classes

This makes Codesys feel like modern software development (C#, Java) rather than traditional PLC programming.

### Library Ecosystem
Codesys has a rich library ecosystem:
- **Standard Library**: Built-in, provides basic functions
- **OSCAT**: Open-source community library (www.oscat.de)
- **CAA (Common Automation Architecture)**: Modular, standardized libraries
- **PLCopen Motion Control**: Standard motion function blocks
- **Vendor-specific libraries**: Each hardware manufacturer provides their own

## Common Terminology

| Codesys Term | Generic PLC Term | Description |
|--------------|------------------|-------------|
| POU | Program / Function / FB | Program Organization Unit |
| DUT | UDT / Structure | Data Unit Type (user-defined) |
| GVL | Global Variable List | Global variables |
| FB_init | Constructor | Initialization method for FB |
| REFERENCE TO | Safe Pointer | Reference to a variable |
| Device Tree | Hardware Configuration | I/O and fieldbus setup |

## Routing Signals

Route to Codesys module when any of these cues are present:

### Explicit Mentions
- Codesys
- Codesys V3
- Codesys V2.3 (legacy)

### Manufacturer Mentions (Codesys-based)
- Schneider Machine Expert / SoMachine (M221, M241, M251, M262)
- Wago PLC
- Festo CPX-E, CECC
- ifm ecomatmobile
- Eaton XV/XC series
- ABB AC500

### Terminology
- GVL (Global Variable List)
- DUT (Data Unit Type)
- Device Tree
- WebVisu / TargetVisu
- CFC (Continuous Function Chart)
- OSCAT library

## Boundary Conditions

### Codesys V2.3 vs. Codesys V3
- **Codesys V2.3**: Legacy platform, no OOP features, different library structure
- **Codesys V3**: Modern platform, full OOP support, current standard
- If the user mentions Codesys without a version, assume V3 unless context suggests otherwise.

### Codesys vs. TwinCAT
- TwinCAT 3 PLC is built on the Codesys V3 runtime engine.
- ST syntax is 99% compatible.
- Libraries are often cross-compatible.
- **Key difference**: TwinCAT uses Visual Studio; Codesys uses its own IDE.
- TwinCAT adds Beckhoff-specific features (ADS, C++ integration, System Manager).

### Schneider Machine Expert (SoMachine)
- Schneider's M221, M241, M251, M262 controllers use Codesys V3 as the underlying platform.
- Branded as "EcoStruxure Machine Expert" (formerly SoMachine).
- When a user mentions these Schneider controllers, route primarily to Codesys rules, but note Schneider-specific hardware features.

### Mixing Vendors
If a user asks to migrate from Codesys to another vendor (or vice versa), explicitly map the concepts:
- Codesys GVL â†?Siemens Global DB / Rockwell Controller-Scoped Tag
- Codesys FB with Methods â†?Siemens FB / Rockwell AOI
- Codesys DUT â†?Siemens UDT / Rockwell UDT
- Codesys Task â†?Siemens OB / Rockwell Task

---

**Last updated:** 2026-04-06
