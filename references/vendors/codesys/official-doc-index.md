# Codesys Official Documentation Index

This file indexes official Codesys documentation and resources for IEC 61131-3 programming.

## Primary Documentation Sources

### Codesys Group Official Resources
- Main website: https://www.codesys.com
- Online help: Integrated into Codesys IDE (F1 key)
- Store: https://store.codesys.com (libraries, device packages, tools)

### IEC 61131-3 Standard
Codesys is one of the most compliant implementations of the IEC 61131-3 standard.

#### IEC 61131-3: Programming Industrial Automation Systems
- The official standard document (available for purchase from IEC)
- Defines all five programming languages (LD, FBD, ST, IL, SFC)
- Defines data types, POUs, and execution model

### Key Codesys Documentation

#### Codesys V3.5 Online Help
- Comprehensive documentation built into the IDE
- Access via F1 or Help menu
- Covers:
  - All programming languages
  - Library management
  - Device configuration
  - Visualization
  - Motion control

#### Codesys V3.5 First Start Guide
- PDF: Available from Codesys download center
- Covers:
  - Installation and setup
  - Creating first project
  - Downloading to device
  - Basic debugging

#### Features and Improvements Documents
- Released with each Service Pack (e.g., V3.5 SP16)
- Details new features, improvements, and bug fixes
- Available from: https://api-de.codesys.com

## Programming Languages

Codesys supports all five IEC 61131-3 languages:

1. **Structured Text (ST)**: High-level, text-based language
2. **Ladder Diagram (LD)**: Relay logic style
3. **Function Block Diagram (FBD)**: Graphical data flow
4. **Sequential Function Chart (SFC)**: State machine / step-based
5. **Instruction List (IL)**: Low-level, assembly-like (deprecated in IEC 61131-3 3rd edition)

## Common Libraries

### Standard Library
- Built into every Codesys installation
- Provides basic functions and function blocks (timers, counters, math, string operations)

### OSCAT (Open Source Community for Automation Technology)
- Website: www.oscat.de
- Extensive collection of reusable function blocks
- Categories: Basic, Building, Network, Communication

### CAA (Common Automation Architecture) Libraries
- Modular, standardized libraries for common automation tasks
- Examples: CAA File, CAA Memory, CAA Tick Util

### PLCopen Motion Control
- Standard motion control function blocks
- MC_Power, MC_MoveAbsolute, MC_MoveVelocity, etc.

## Codesys Ecosystem

### Codesys Control (Runtime)
- The PLC runtime that executes IEC 61131-3 programs
- Available for various platforms:
  - Codesys Control Win (Windows PC)
  - Codesys Control for Linux
  - Codesys Control for Raspberry Pi
  - Codesys Control RTE (Real-Time Ethernet)

### Codesys Development System
- The IDE for programming
- Versions:
  - Codesys V2.3 (legacy)
  - Codesys V3.5 (current standard)

### Device Manufacturers Using Codesys
Many PLC manufacturers use Codesys as their programming environment:
- Schneider Electric (M221, M241, M251, M262 - Machine Expert)
- Wago
- Festo
- ifm electronic
- Eaton
- ABB
- Bosch Rexroth
- And many more

## Evidence Priority

When answering Codesys-specific questions, use sources in this order:
1. IEC 61131-3 standard (for language-level questions)
2. Codesys V3.5 Online Help (built into IDE)
3. Official Codesys documentation and guides
4. OSCAT and CAA library documentation
5. Community resources (lowest priority)

## Important Notes

- Codesys is a **platform**, not a hardware brand. Many different PLC manufacturers use Codesys.
- When a user mentions a specific PLC brand (e.g., Wago, Schneider M241), check if it uses Codesys. If so, apply Codesys rules but note any manufacturer-specific features.
- Codesys V3.5 is the current standard. Codesys V2.3 is legacy and has significant differences (no OOP features, different library structure).

---
Last updated: 2026-04-06
