# Beckhoff / TwinCAT Overview

Use this module when the request is clearly in the Beckhoff ecosystem.

## Current State

This vendor module contains comprehensive rules for Beckhoff TwinCAT 3 PC-based control systems. It covers:

- Visual Studio integration and project structure
- Object-oriented programming (OOP) features in IEC 61131-3 3rd edition
- Motion control via PLCopen-compliant Tc2_MC2 library
- ADS (Automation Device Specification) communication
- Official documentation index with direct links

## Reference Priority

When a Beckhoff context is confirmed, read these files in addition to the common PLC rules:

1. `references/vendors/beckhoff/beckhoff-overview.md` (this file - context setting)
2. `references/vendors/beckhoff/beckhoff-rules.md` (core engineering rules)
3. `references/vendors/beckhoff/beckhoff-cheatsheet.md` (quick reference)
4. `references/vendors/beckhoff/official-doc-index.md` (for official manual citations)

## Key Focus Areas

### PC-Based Control
Beckhoff pioneered the concept of using Industrial PCs as the controller hardware, running a hard real-time kernel alongside Windows.

**Key advantages:**
- Leverage standard PC hardware (Intel processors, SSDs, RAM)
- Integrate PLC, motion control, vision, HMI, and data logging on one platform
- Use Visual Studio as the development environment

### TwinCAT 3 Architecture
TwinCAT 3 is not just a PLC runtime—it's a complete automation platform:
- **TC3 PLC**: IEC 61131-3 programming
- **TC3 C++**: Real-time C++ modules for custom algorithms
- **TC3 Motion**: PLCopen motion control
- **TC3 Vision**: Image processing
- **TC3 HMI**: Web-based visualization

### Object-Oriented Programming (OOP)
TwinCAT 3 supports IEC 61131-3 3rd edition, which adds powerful OOP features:
- **Methods**: Functions bound to function blocks
- **Properties**: Getter/Setter access to FB variables
- **Inheritance (`EXTENDS`)**: Create base classes and derived classes
- **Interfaces (`IMPLEMENTS`)**: Define contracts for polymorphism

This makes TwinCAT 3 feel more like modern software development (C#, Java) than traditional PLC programming.

### EtherCAT Native
Beckhoff invented EtherCAT, the high-speed industrial Ethernet protocol.
- TwinCAT 3 is the reference implementation of EtherCAT master.
- Cycle times down to 50 µs.
- Distributed clocks for precise synchronization across hundreds of devices.

### ADS Communication
ADS (Automation Device Specification) is Beckhoff's proprietary protocol for inter-process communication:
- PLC ->C++ modules
- PLC ->HMI
- PLC ->External applications (C#, Python, MATLAB)
- Very efficient, symbol-based access to variables

## Controller Families

### CX Series (Embedded PCs)
- Compact, DIN-rail mountable Industrial PCs
- Fanless, solid-state storage
- Typical applications: Machine control, building automation

### C Series (Panel PCs)
- Industrial PCs with integrated displays
- Used as combined controller + HMI

### C6xxx Series (Industrial PCs)
- Rack-mount or tower Industrial PCs
- High-performance multi-core processors
- Used for large-scale automation, vision, robotics

## Common Terminology

| Beckhoff / TwinCAT Term | Generic PLC Term | Description |
|-------------------------|------------------|-------------|
| TwinCAT 3 | IDE / Runtime | Automation software platform |
| POU | Program / Function / FB | Program Organization Unit |
| DUT | UDT / Structure | Data Unit Type (user-defined) |
| FB_init | Constructor | Initialization method for FB |
| REFERENCE TO | Pointer | Safe reference to a variable |
| ADS | Communication Protocol | Automation Device Specification |
| System Manager | I/O Configuration | Hardware and I/O mapping tool |

## Routing Signals

Route to Beckhoff module when any of these cues are present:

### Explicit Mentions
- Beckhoff
- TwinCAT
- TwinCAT 3 (TC3)
- EtherCAT (when in context of Beckhoff)

### Controller Families
- CX series (CX5xxx, CX7xxx, CX9xxx)
- C series (C6xxx, C7xxx)
- Embedded PC

### Terminology
- ADS (Automation Device Specification)
- System Manager
- Tc2_MC2 (motion library)
- Visual Studio integration (in PLC context)
- FB_init, EXTENDS, IMPLEMENTS (OOP features)

## Boundary Conditions

### TwinCAT 2 vs. TwinCAT 3
- **TwinCAT 2**: Legacy platform, standalone IDE, no OOP features
- **TwinCAT 3**: Modern platform, Visual Studio integration, full OOP support
- If the user mentions TwinCAT without a version, assume TwinCAT 3 unless context suggests otherwise.

### TwinCAT vs. Codesys
- TwinCAT 3 PLC is built on the Codesys V3 runtime engine.
- ST syntax is 99% compatible.
- Libraries are often cross-compatible.
- **Key difference**: TwinCAT uses Visual Studio; Codesys uses its own IDE.
- If a user asks about Codesys, note the relationship but keep Beckhoff-specific features (ADS, System Manager, C++ integration) separate.

### Mixing Vendors
If a user asks to migrate from Beckhoff to another vendor (or vice versa), explicitly map the concepts:
- Beckhoff Task ->Siemens OB / Rockwell Task
- Beckhoff FB with Methods ->Siemens FB / Rockwell AOI
- Beckhoff DUT ->Siemens UDT / Rockwell UDT
- Beckhoff ADS ->Vendor-specific communication (Siemens S7 Comm, Rockwell CIP)

---

**Last updated:** 2026-04-06
