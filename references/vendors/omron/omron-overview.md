# Omron Overview

Use this module when the request is clearly in the Omron ecosystem.

## Current State

This vendor module contains comprehensive rules for both modern Sysmac (NJ/NX series) and legacy (CJ/CS/CP series) Omron controllers. It covers:

- Variable-based architecture (Sysmac) vs. address-based architecture (legacy)
- Task execution and program organization
- Motion control integration via EtherCAT
- Official documentation index with direct links

## Reference Priority

When an Omron context is confirmed, read these files in addition to the common PLC rules:

1. `references/vendors/omron/omron-overview.md` (this file - context setting)
2. `references/vendors/omron/omron-rules.md` (for Sysmac NJ/NX series)
3. `references/vendors/omron/omron-cheatsheet.md` (quick reference)
4. `references/vendors/omron/official-doc-index.md` (for official manual citations)

## Key Focus Areas

### Two Distinct Architectures

Omron has two fundamentally different PLC architectures:

#### Modern: Sysmac (NJ/NX Series)
- **Software**: Sysmac Studio
- **Memory Model**: Variable-based (tag-based), no physical addresses
- **Languages**: Full IEC 61131-3 (LD, ST, FBD)
- **Strengths**: Integrated motion control, EtherCAT native, high-speed processing
- **Typical Applications**: Machine automation, robotics, packaging, semiconductor equipment

#### Legacy: CX-One (CJ/CS/CP Series)
- **Software**: CX-Programmer (part of CX-One suite)
- **Memory Model**: Address-based (CIO, D, W, H memory areas)
- **Languages**: Primarily Ladder Diagram (LD)
- **Strengths**: Proven reliability, large installed base, cost-effective
- **Typical Applications**: General automation, building automation, process control

### Variable-Based vs. Address-Based

**Sysmac (NJ/NX):**
- All data is accessed via symbolic variable names (e.g., `ConveyorSpeed`, `Tank1_Level`)
- No memory area prefixes (no CIO, D, W, H)
- Global Variables and Local Variables define scope
- I/O is mapped directly to Global Variables

**Legacy (CJ/CS/CP):**
- Data is accessed via memory addresses (e.g., `D100`, `W0.00`, `CIO 0.01`)
- Memory areas have specific purposes:
  - **CIO**: I/O and work area
  - **D**: Data memory (retentive)
  - **W**: Work area (non-retentive)
  - **H**: Holding area (retentive)
  - **A**: Auxiliary area (system flags)
  - **T**: Timers
  - **C**: Counters

### Motion Control Integration

A defining feature of the Sysmac platform is seamless motion control:
- EtherCAT-based servo communication
- PLCopen-compliant motion function blocks (MC_Power, MC_MoveAbsolute, etc.)
- Coordinated multi-axis motion (Axes Groups)
- Electronic camming and gearing

## Controller Families

### Sysmac (Modern)
- **NX-Series**: Latest generation, high-performance (NX1P, NX102, NX701)
- **NJ-Series**: Original Sysmac controllers (NJ301, NJ501)
- **NY-Series**: Industrial PC + PLC hybrid (NY532)

### Legacy (Classic)
- **CJ-Series**: Modular, general-purpose (CJ1, CJ2)
- **CS-Series**: Large-scale, rack-based (CS1)
- **CP-Series**: Compact/Micro (CP1E, CP1L, CP1H)

## Common Terminology

| Omron Term (Sysmac) | Generic PLC Term | Description |
|---------------------|------------------|-------------|
| Global Variable | Global Tag | Accessible from all programs |
| Local Variable | Local Tag | Scoped to a specific POU |
| POU (Program Organization Unit) | Program/Function/FB | Executable code container |
| Primary Periodic Task | Main Task | Highest priority cyclic task |
| Network Publish | Tag Sharing | Expose variable via EtherNet/IP |
| Inline ST | Inline Code | ST code directly in Ladder rung |

| Omron Term (Legacy) | Generic PLC Term | Description |
|---------------------|------------------|-------------|
| CIO | I/O Memory | Core I/O and work area |
| D Memory | Data Memory | Retentive data storage |
| W Memory | Work Memory | Non-retentive work area |
| H Memory | Holding Memory | Retentive holding area |

## Routing Signals

Route to Omron module when any of these cues are present:

### Explicit Mentions
- Omron
- Sysmac
- Sysmac Studio
- CX-Programmer
- CX-One

### Controller Families
- NJ-series, NX-series, NY-series
- CJ-series, CS-series, CP-series

### Terminology
- Global Variable Table (Sysmac)
- CIO, D, W, H memory areas (legacy)
- Primary Periodic Task
- MC Function Blocks (motion control)
- Network Publish
- Inline ST

## Boundary Conditions

### Sysmac vs. Legacy
When a user mentions "Omron PLC" without specifying the series:
- Ask which platform (Sysmac NJ/NX or legacy CJ/CS/CP)
- If they mention Sysmac Studio ->Sysmac (NJ/NX)
- If they mention CX-Programmer ->Legacy (CJ/CS/CP)
- If they mention motion control or EtherCAT ->Likely Sysmac

### Mixing Vendors
If a user asks to migrate from Omron to another vendor (or vice versa), explicitly map the concepts:
- Omron Global Variable ->Siemens Global DB / Rockwell Controller-Scoped Tag
- Omron Primary Periodic Task ->Siemens OB1 / Rockwell Continuous Task
- Omron FB Instance ->Siemens FB Instance / Rockwell AOI Instance
- Omron CIO/D/W (legacy) ->Mitsubishi D/M devices / Siemens DB

---

**Last updated:** 2026-04-06
