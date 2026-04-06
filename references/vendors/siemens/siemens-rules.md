# Siemens S7-1200 / S7-1500 Programming Rules

This document outlines the core engineering and programming rules for modern Siemens SIMATIC S7-1200 and S7-1500 controllers using TIA Portal. It is based on the official Siemens "Programming Guideline for S7-1200/S7-1500" and "Programming Styleguide".

## 1. Data Storage and Memory Access

### 1.1 Optimized Block Access
Modern S7-1200 and S7-1500 controllers use a different memory architecture than classic S7-300/400. The default and recommended setting for all data blocks (DBs) is "Optimized block access".

**Rules:**
- **Always use Optimized block access** for new projects. It improves performance and simplifies addressing.
- Do not disable optimized block access unless absolutely necessary (e.g., communication with legacy HMI or third-party systems that require absolute addressing).
- In optimized blocks, tags are sorted automatically by the compiler to minimize gaps. There is no defined offset.
- Addressing must be symbolic (e.g., `MyDataBlock.MyTag`), never absolute (e.g., `DB1.DBW2`).

### 1.2 Data Type Selection
**Rules:**
- Use the most appropriate data type for the task, not just standard generic types.
- **Integers**: Use `Int` (16-bit) or `DInt` (32-bit). S7-1500 processors are optimized for 32-bit operations, so `DInt` is often processed faster than `Int`.
- **Floating point**: Use `Real` (32-bit) or `LReal` (64-bit). Use `LReal` when high precision is needed or when avoiding rounding errors in accumulated values.
- **Timers**: Use IEC timers (`TON`, `TOF`, `TP`) defined as multi-instances, rather than legacy S5 timers.

## 2. Program Structure and Blocks

### 2.1 Block Types
Siemens organizes code into distinct block types.

**Rules:**
- **Organization Blocks (OB)**: Used as entry points. `OB1` is the main cyclic program. Use specific OBs (e.g., `OB30` for cyclic interrupts) rather than putting everything in `OB1` with manual timers.
- **Function Blocks (FB)**: Use FBs when a code segment has an internal state (memory) that must persist across cycles (e.g., a motor controller, a PID loop).
- **Functions (FC)**: Use FCs for pure mathematical or logical operations that have no internal state. An FC must calculate its outputs entirely based on its inputs in the same cycle.
- **Data Blocks (DB)**: Use global DBs to store data shared across multiple program parts. Use instance DBs automatically generated for FBs.

### 2.2 Instance Data Management
**Rules:**
- **Multi-instances**: When an FB calls another FB (or an IEC timer/counter), declare the called FB in the `Static` interface of the calling FB. This creates a "multi-instance" and avoids generating a new, separate instance DB for every sub-call.
- Avoid accessing an instance DB directly from outside the FB that owns it. Pass necessary data via the `IN`, `OUT`, or `INOUT` parameters of the FB.

## 3. Instruction Usage

### 3.1 Data Movement
**Rules:**
- Use the standard `MOVE` instruction for basic data transfer.
- For moving arrays or structs, use block moves (`MOVE_BLK`, `UMOVE_BLK`) or simply assign them symbolically if they are the same type (`StructA := StructB;`).
- Use `VARIANT` instructions only when dealing with generic, dynamic data structures that are not known until runtime.

### 3.2 Timers and Counters
**Rules:**
- Always use **IEC Timers** (`TON`, `TOF`, `TP`) and **IEC Counters** (`CTU`, `CTD`, `CTUD`).
- Never use legacy S5 timers/counters in new S7-1200/1500 projects. S5 timers are limited in number, have lower resolution, and complicate code reuse.
- Instantiate IEC timers as multi-instances within the FB's `Static` section.

## 4. Coding Style and Conventions

Following the official Siemens Programming Styleguide ensures readability and consistency.

### 4.1 Naming Conventions
**Rules:**
- **Variables/Tags**: Use `camelCasing` (e.g., `motorSpeed`, `tankLevel`).
- **Blocks (OB, FB, FC, DB)**: Use `PascalCasing` (e.g., `MotorControl`, `MainSequence`).
- **Constants**: Use `UPPER_CASE_WITH_UNDERSCORES` (e.g., `MAX_SPEED`, `DEFAULT_TIMEOUT`).
- **User-Defined Data Types (UDT)**: Prefix with `type` (e.g., `typeMotorData`).
- Use English identifiers globally for broader maintainability.

### 4.2 Parameter Prefixing (Optional but Recommended)
For complex blocks, Siemens suggests prefixes to clarify variable scope:
- `stat` for Static variables (e.g., `statVelocity`)
- `inst` for Multi-instances (e.g., `instMotor`)
- `temp` for Temporary variables (e.g., `tempIndex`)

### 4.3 General Principles
- **No special characters**: Use only alphanumeric characters and underscores.
- **Descriptive names**: Avoid generic names like `Flag1` or `Data2`. Use `PumpRunning` or `TemperatureSetpoint`.
- **One action per network**: In Ladder (LAD) or FBD, keep networks small and focused on a single logical outcome to simplify troubleshooting.

## 5. Safety Programming

When using fail-safe controllers (S7-1200F / S7-1500F):

**Rules:**
- Keep the safety program separate from the standard program.
- Use F-runtime groups to manage safety code execution.
- **Data Exchange**: When passing data from the safety program to the standard program (e.g., for HMI diagnostics), transfer the data to a standard global DB first to prevent standard code from accidentally corrupting safety data signatures.
- Never write to safety tags from standard code unless explicitly using proper acknowledgement mechanisms defined by the safety library.

---
**References:**
- Programming Guideline for S7-1200/1500 (Siemens Entry ID: 81318674)
- Programming Styleguide for S7-1200/S7-1500 (Siemens Entry ID: 81318674)
- Safety Programming Guideline for SIMATIC S7-1200/1500 (Siemens Entry ID: 109750255)