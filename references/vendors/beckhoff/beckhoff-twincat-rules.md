# Beckhoff TwinCAT 3 Programming Rules

This document outlines the core engineering and programming rules for modern Beckhoff TwinCAT 3 PC-based control systems.

## 1. System Architecture and Integration

### 1.1 Visual Studio Integration
TwinCAT 3 (TC3) is fully integrated into Microsoft Visual Studio.

**Rules:**
- Projects are structured within a Visual Studio Solution.
- A Solution can contain multiple TwinCAT projects (e.g., PLC, C++, HMI).
- Use the Solution Explorer to navigate POUs (Program Organization Units), Data Types, and I/O mapping.

### 1.2 Tasks and Real-Time Execution
TC3 relies on a hard real-time kernel running alongside Windows.

**Rules:**
- **Tasks**: Define the execution cycle (e.g., 1ms, 10ms).
- **Programs (PRG)**: Are assigned to Tasks.
- **Priority**: Lower number = higher priority. Ensure your fastest control loops (e.g., motion control) have the highest priority.
- **Cycle Time**: Keep PLC execution time well below the task cycle time to prevent real-time jitter or watchdog faults.

## 2. Programming Languages and Object-Oriented Programming (OOP)

TC3 supports IEC 61131-3 3rd edition, which introduces powerful OOP features.

### 2.1 Structured Text (ST)
The primary language for complex logic in TC3.

**Rules:**
- Assignment: `:=`
- Equality check: `=`
- Every statement must end with `;`.
- Use descriptive naming (e.g., Hungarian notation: `bStart` for BOOL, `nCounter` for INT, `fSpeed` for REAL).

### 2.2 Object-Oriented Features
TC3 allows FBs (Function Blocks) to act like classes.

**Rules:**
- **Methods**: Functions bound to an FB. They can read/write FB variables and have their own local variables.
  ```st
  fbMotor.Start();
  fbMotor.SetSpeed(1500.0);
  ```
- **Properties**: Getter/Setter access to FB variables. Use properties to encapsulate and protect internal FB state.
- **Inheritance (`EXTENDS`)**: Create a base FB (e.g., `FB_Valve`) and extend it (e.g., `FB_ProportionalValve EXTENDS FB_Valve`).
- **Interfaces (`IMPLEMENTS`)**: Define a contract (e.g., `I_Controllable`) that multiple different FBs must implement. Excellent for dependency injection and modular machine design.

## 3. Data Types and Variables

### 3.1 Pragma Directives
Pragmas provide instructions to the compiler or IDE.

**Rules:**
- Attribute `VAR_IN_OUT` is passed by reference (pointer). Very efficient for large structures, but requires the variable to exist externally.
- Hide variables from the UI using `{attribute 'hide'}`.
- Map variables to specific I/O addresses using `%I*` and `%Q*`:
  ```st
  bSensor1 AT %I* : BOOL;  // Will be mapped in the System Manager
  ```

### 3.2 Arrays and Structures
**Rules:**
- Arrays can be multi-dimensional and use variable length (in TC3).
- Define `STRUCT` (DUT - Data Unit Type) for organizing related data.
- **Pointers and References**: TC3 supports pointers (`POINTER TO`) and references (`REFERENCE TO`). `REFERENCE TO` is generally safer as it is implicitly dereferenced.

## 4. Motion Control (Tc2_MC2)

TC3 motion is based on PLCopen standard.

**Rules:**
- Include the `Tc2_MC2` library.
- Define axes as `AXIS_REF` in global variables.
- You must call the `MC_Power` FB to enable the axis before executing movement.
- Use `Execute` input for one-shot commands (e.g., `MC_MoveAbsolute`). Trigger on a rising edge.
- Always monitor the `Error` and `ErrorID` outputs of motion FBs.
- Example pattern:
  ```st
  fbPower(Axis:=Axis1, Enable:=TRUE, Enable_Positive:=TRUE, Enable_Negative:=TRUE);
  IF fbPower.Status AND bMoveCommand THEN
      fbMoveAbs(Axis:=Axis1, Execute:=TRUE, Position:=100.0, Velocity:=50.0);
  END_IF;
  ```

## 5. TwinCAT vs. Codesys

**Context:** TwinCAT 3 PLC engine is based on Codesys V3.
- ST syntax is identical.
- Core library concepts (Tc2_Standard vs Standard) are very similar.
- **Difference**: TC3 handles I/O mapping via the "System Manager" (integrated into Visual Studio), separate from the PLC code variables. Use `AT %I*` and `AT %Q*` in PLC code, then link them graphically to hardware terminals.

## 6. ADS Communication

ADS (Automation Device Specification) is Beckhoff's proprietary, highly efficient communication protocol.

**Rules:**
- Use ADS to communicate between different TC3 runtimes, between PLC and C++ modules, or between PLC and external applications (C#, Python, HMI).
- Variables can be accessed by name or by IndexGroup/IndexOffset.
- Use the `Tc2_System` library for ADS function blocks (`ADSREAD`, `ADSWRITE`).

## 7. Best Practices

### 7.1 Initialization
- Use the `FB_init` method for initialization logic when an FB is instantiated.

### 7.2 Error Handling
- Create structured error handling.
- Use `Tc2_System` blocks to write critical errors to the Windows Event Log or TwinCAT Event Logger.

### 7.3 Avoid Blocking Calls
- Never use `WHILE` loops waiting for external events (e.g., waiting for an I/O to turn on). This will trigger the task watchdog and crash the runtime.
- Use State Machines (`CASE`) instead of blocking loops.

---
**References:**
- Beckhoff Information System (infosys.beckhoff.com)
- Tc2_MC2 Motion Control documentation
- IEC 61131-3 3rd Edition standard