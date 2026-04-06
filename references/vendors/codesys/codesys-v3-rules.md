# Codesys V3 Programming Rules

This document outlines the core engineering and programming rules for the Codesys V3 development environment, which is used by many hardware vendors (Schneider Machine Expert, Wago, Festo, Eaton, etc.).

## 1. System Architecture and OOP

### 1.1 Object-Oriented Programming (OOP)
Codesys V3 fully supports the object-oriented extensions of IEC 61131-3 3rd edition.

**Rules:**
- **Methods**: Use methods for operations that act on the internal state of a Function Block (FB). Methods can have their own local variables.
- **Properties**: Use properties for safe getter/setter access to FB variables. This encapsulates the internal state.
- **Interfaces (`IMPLEMENTS`)**: Define contracts for FBs. This enables polymorphism (e.g., passing any FB that implements `I_Drive` to a control program).
- **Inheritance (`EXTENDS`)**: Create base FBs and extend them to specialize behavior.

### 1.2 Program Organization Units (POU)
- **Programs (PRG)**: Assigned to Tasks in the Task Configuration. They are the entry points for execution.
- **Function Blocks (FB)**: Reusable objects with internal memory (instances).
- **Functions (FUN)**: No internal memory. Must return a value based purely on inputs.

### 1.3 Task Configuration
- Assign PRGs to specific Tasks.
- Tasks can be Cyclic (run at a fixed interval), Freewheeling (run as fast as possible), or Event-driven.
- Avoid placing heavy calculations in fast cyclic tasks.

## 2. Variables and Data Types

### 2.1 Scope and Declaration
- **Global Variable Lists (GVL)**: Used for variables that must be accessible across multiple POUs.
- **Local Variables (`VAR`)**: Scoped to the POU where they are declared.
- **Input/Output/InOut**: `VAR_INPUT`, `VAR_OUTPUT`, `VAR_IN_OUT`. `VAR_IN_OUT` passes variables by reference (pointer), which is efficient for large structures.

### 2.2 Data Types
- Standard IEC types: `BOOL`, `INT`, `DINT`, `REAL`, `LREAL`, `TIME`, `STRING`, etc.
- **DUT (Data Unit Type)**: Use `STRUCT` to group related variables. Use `ENUM` for state machines. Use `UNION` when multiple data types share the same memory area.

### 2.3 Pointers and References
- **`REFERENCE TO`**: Safer than pointers. It acts as an alias and is automatically dereferenced. Must be checked for validity using `__ISVALIDREF`.
- **`POINTER TO`**: Traditional pointers. Require manual dereferencing using the `^` operator. Must check if `<> 0` before use.

## 3. Structured Text (ST) Syntax Rules

Codesys ST is highly standard-compliant.

### 3.1 Assignment and Operators
- Assignment: `:=`
- Equality check: `=`
- Semicolon `;` required at the end of every statement.
- Case-insensitive (but follow CamelCase or PascalCase for readability).

### 3.2 Control Structures
- **IF**:
  ```st
  IF condition THEN
      // Code
  ELSIF condition2 THEN
      // Code
  ELSE
      // Code
  END_IF;
  ```
- **CASE**: Excellent for state machines (use with ENUMs).
  ```st
  CASE eState OF
      E_State.Init:
          // Code
      E_State.Run:
          // Code
  END_CASE;
  ```
- **FOR / WHILE / REPEAT**: Loop structures. Beware of infinite loops that trigger the task watchdog.

### 3.3 Pragmas and Attributes
Codesys uses pragmas extensively to instruct the compiler:
- `{attribute 'hide'}`: Hides the variable from Intellisense/UI.
- `{attribute 'obsolete'}`: Generates a warning if the variable/POU is used.
- `{attribute 'pack_mode' := '1'}`: Controls structure memory alignment.

## 4. Best Practices

### 4.1 Initialization
- Use the implicit `FB_init` method for initialization logic when an FB is created.
- Static variables retain values across scans; initialize them explicitly if needed.

### 4.2 Libraries and Namespaces
- Always use namespaces when calling library functions to avoid conflicts (e.g., `Standard.TON`, `OSCAT.SCALE_R`).
- When creating your own libraries, define a clear namespace.

### 4.3 Error Handling
- FBs should expose `xError` (BOOL) and `eErrorID` (ENUM or DWORD) outputs.
- Use a robust state machine design that includes error states and recovery paths.

### 4.4 Continuous Function Chart (CFC)
- Codesys includes CFC, which is an unconstrained version of FBD. It allows arbitrary positioning of blocks and feedback loops.
- **Rule**: Explicitly set the execution order in CFC to avoid unpredictable behavior.

## 5. Typical Codesys Ecosystem Features

### 5.1 Visualization
- Codesys includes integrated WebVisu and TargetVisu.
- Map PLC variables directly to visualization elements.

### 5.2 Device Configuration
- Hardware (I/O, Fieldbuses like EtherCAT, PROFINET) is configured in the Device Tree.
- Map variables to I/O channels directly in the I/O Mapping tab of the device, rather than using hardcoded `%I*` addresses in code.

---
**References:**
- Codesys V3.5 Online Help
- IEC 61131-3 3rd Edition