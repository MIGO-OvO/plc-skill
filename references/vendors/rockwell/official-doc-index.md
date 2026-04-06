# Rockwell Automation / Allen-Bradley Official Documentation Index

This file indexes official Rockwell Automation documentation for ControlLogix, CompactLogix, and Studio 5000 Logix Designer.

## Primary Documentation Sources

### Rockwell Automation Literature Library
- Main portal: https://literature.rockwellautomation.com
- Product compatibility and versions: https://compatibility.rockwellautomation.com

### Logix 5000 Controllers Documentation

Rockwell Automation publishes a comprehensive set of programming manuals for the Logix 5000 controller family (ControlLogix, CompactLogix, GuardLogix, SoftLogix).

#### Common Procedures Programming Manual
- Publication: 1756-PM001
- PDF: https://literature.rockwellautomation.com/idc/groups/literature/documents/pm/1756-pm001_-en-e.pdf
- Links to all other Logix 5000 programming manuals
- Covers: 1756 ControlLogix, 1756 GuardLogix, 1769 CompactLogix, 1769 Compact GuardLogix, 1789 SoftLogix, 5069 CompactLogix, Studio 5000 Logix Emulate

#### Core Programming Manuals (by topic)

| Topic | Publication | Description |
|-------|-------------|-------------|
| **Add-On Instructions** | 1756-PM010 | Creating and using custom instructions |
| **ASCII Strings** | 1756-PM013 | String handling and manipulation |
| **Data Access** | 1756-PM020 | Tag access, scope, and organization |
| **EDS AOP Guidelines** | 1756-PM002 | Electronic Data Sheet Add-On Profile guidelines |
| **Function Block Diagram** | 1756-PM009 | FBD programming language |
| **IEC 61131-3 Compliance** | 1756-PM018 | Standard compliance details |
| **Import/Export** | 1756-PM019 | Project import/export procedures |
| **Information and Status** | 1756-PM015 | Controller status and diagnostics |
| **I/O and Tag Data** | 1756-PM004 | I/O configuration, tag addressing, data types |
| **Ladder Diagram** | 1756-PM008 | Ladder logic programming |
| **Major, Minor, and I/O Faults** | 1756-PM014 | Fault handling and diagnostics |
| **Messages** | 1756-PM012 | MSG instruction and communication |
| **Nonvolatile Memory Card** | 1756-PM017 | SD card usage and project storage |
| **Produced and Consumed Tags** | 1756-PM011 | Tag sharing across controllers |
| **Program Parameters** | 1756-PM021 | Parameterized routines and AOIs |
| **Security** | 1756-PM016 | Controller security features |
| **Sequential Function Charts** | 1756-PM006 | SFC programming language |
| **Structured Text** | 1756-PM007 | ST programming language |
| **Tasks, Programs, and Routines** | 1756-PM005 | Program organization and execution |

#### Structured Text Programming Manual
- Publication: 1756-PM007
- PDF: https://literature.rockwellautomation.com/idc/groups/literature/documents/pm/1756-pm007_-en-p.pdf
- Latest version: September 2024
- Covers:
  - ST syntax and operators
  - Assignment statements
  - Control structures (IF, CASE, FOR, WHILE, REPEAT)
  - Function and function block calls
  - Data type usage
  - Math status flags
  - Fault conditions

#### General Instructions Reference Manual
- Publication: 1756-RM003
- PDF: https://literature.rockwellautomation.com/idc/groups/literature/documents/rm/1756-rm003_-en-p.pdf
- Latest version: September 2024
- Comprehensive instruction set reference for all Logix 5000 controllers
- Covers:
  - Bit instructions
  - Timer and counter instructions
  - Math instructions
  - Move and logical instructions
  - Comparison instructions
  - Program control instructions
  - Array and file instructions

#### Design Considerations Reference Manual
- Publication: 1756-RM094
- PDF: https://literature.rockwellautomation.com/idc/groups/literature/documents/rm/1756-rm094_-en-p.pdf
- Latest version: September 2025
- Covers:
  - Controller resources and dual-core architecture
  - Task configuration (continuous, periodic, event)
  - Tag guidelines and data scope
  - Array and indirect addressing
  - Network guidelines (EtherNet/IP, ControlNet, DeviceNet)
  - Message buffering and communication
  - Add-on instruction design
  - Equipment phases
  - HMI applications
  - Diagnostics

#### I/O and Tag Data Programming Manual
- Publication: 1756-PM004
- PDF: https://www.politecnica.pucrs.br/professores/tergolina/Automacao_e_Controle/LITERATURA_ADICIONAL_-_1756-pm004_-en-p_Logix5000_Controllers_IO_and_Tag_Data.pdf
- Covers:
  - I/O module configuration
  - Tag addressing and organization
  - Controller-scoped vs. program-scoped tags
  - Alias tags
  - Array creation and indexing
  - User-defined data types
  - External access configuration
  - Constant value tags
  - Data forcing

#### Sequential Function Charts Programming Manual
- Publication: 1756-PM006
- PDF: https://literature.rockwellautomation.com/idc/groups/literature/documents/pm/1756-pm006_-en-p.pdf
- Latest version: September 2024
- Covers:
  - SFC structure (steps, transitions, actions)
  - Step types and execution
  - Action qualifiers
  - Transition logic
  - Forcing steps
  - SFC best practices

### Studio 5000 Logix Designer

#### Logix Designer SDK Getting Results Guide
- Publication: LDSDK-GR001
- PDF: https://literature.rockwellautomation.com/idc/groups/literature/documents/gr/ldsdk-gr001_-en-p.pdf
- Latest version: January 2025
- Covers:
  - Python SDK for Logix Designer automation
  - Opening and manipulating .ACD project files
  - Downloading projects to controllers
  - Automated testing workflows
  - SD card image creation

## Controller Families

### ControlLogix (1756)
- High-performance, modular PLC platform
- Supports all Logix 5000 programming languages
- Redundancy options available
- Large I/O capacity

### CompactLogix (1769, 5069)
- Compact, cost-effective platform
- Same programming environment as ControlLogix
- Integrated I/O and communication
- 5069 series is the latest generation

### GuardLogix
- Safety-rated versions of ControlLogix and CompactLogix
- Integrated safety and standard control
- SIL 3 / PLe certified

### SoftLogix (1789)
- Software-based controller running on Windows PC
- Same programming as hardware controllers
- Used for simulation and testing

## Programming Languages

Logix 5000 controllers support all five IEC 61131-3 languages:
1. **Ladder Diagram (LD)** - Most common, relay-logic style
2. **Function Block Diagram (FBD)** - Graphical, data-flow oriented
3. **Sequential Function Chart (SFC)** - State machine / step-based
4. **Structured Text (ST)** - High-level, text-based
5. **Instruction List (IL)** - Low-level, assembly-like (rarely used)

## Key Concepts and Terminology

### Program Organization
- **Task**: Scheduling container (continuous, periodic, event)
- **Program**: Collection of routines and tags
- **Routine**: Executable code (main, subroutine)
- **Add-On Instruction (AOI)**: User-defined instruction

### Tag Scope
- **Controller-scoped tags**: Accessible from anywhere in the project
- **Program-scoped tags**: Local to a specific program

### Data Types
- **Atomic**: BOOL, SINT, INT, DINT, LINT, REAL, LREAL
- **String**: STRING (82 characters)
- **User-Defined Data Types (UDT)**: Custom structures
- **Arrays**: Multi-dimensional data structures

### Communication
- **MSG instruction**: Explicit messaging between controllers or devices
- **Produced/Consumed tags**: Implicit tag sharing over network
- **CIP (Common Industrial Protocol)**: Underlying communication protocol

## Usage Notes

1. All Logix 5000 controllers use the same Studio 5000 Logix Designer software
2. Publication numbers (e.g., 1756-PM007) are stable across versions; check date for latest
3. Rockwell Literature Library requires free registration for full access
4. Online help in Studio 5000 includes all manual content
5. Compatibility tool helps verify controller, firmware, and software version compatibility

## Evidence Priority

When answering Rockwell/Allen-Bradley questions, use sources in this order:
1. Official Logix 5000 programming manuals listed above
2. Studio 5000 online help and documentation
3. Rockwell Automation knowledge base articles
4. IEC 61131-3 standards (for language-level questions)
5. Community resources (lowest priority)

---

Last updated: 2026-04-06
