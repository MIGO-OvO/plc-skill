# Schneider Electric / Modicon Programming Rules

This document outlines the core engineering and programming rules for Schneider Electric Modicon controllers (M340, M580, Premium, Quantum) using EcoStruxure Control Expert (formerly Unity Pro).

## 1. Project Structure and Execution

### 1.1 Task Types
Control Expert organizes execution into tasks:

**Rules:**
- **MAST (Master Task)**: The primary cyclic task. Executes continuously at a defined period (e.g., 10ms, 100ms). Most application logic goes here.
- **FAST Task**: A higher-priority cyclic task for time-critical operations. Preempts MAST. Use sparingly.
- **AUX0-AUX3 (Auxiliary Tasks)**: Additional periodic tasks with lower priority than MAST.
- **Event Tasks**: Triggered by specific events (e.g., I/O interrupt, timer event).

### 1.2 Sections within Tasks
Each task can contain multiple sections:
- **SR (Subroutine)**: Callable code blocks. Can be called from any section using the SR instruction.
- **Sections**: Sequential execution blocks within a task. Sections execute in order.

## 2. Data Types and Variables

### 2.1 Standard Data Types
- **BOOL**: Boolean (TRUE/FALSE)
- **INT**: 16-bit signed integer
- **DINT**: 32-bit signed integer
- **REAL**: 32-bit floating point
- **TIME**: Time duration (e.g., T#5s, T#100ms)
- **STRING**: Character string

### 2.2 Derived Data Types (DDT)
User-defined structures to group related data.

**Rules:**
- Create DDTs to organize complex data (e.g., a Motor DDT with Start, Stop, Running, Fault, Speed).
- DDTs improve code readability and HMI integration.

### 2.3 Variable Scope
- **Located Variables**: Mapped to physical I/O addresses (e.g., %I0.0.1, %Q0.0.2).
- **Unlocated Variables**: Internal variables not tied to physical I/O.
- **Global Variables**: Accessible from all tasks and sections.
- **Local Variables**: Scoped to a specific section or DFB.

## 3. Programming Languages

Control Expert supports all five IEC 61131-3 languages:

### 3.1 Ladder Diagram (LD)
- Most common language for discrete logic.
- Relay-logic style with contacts and coils.

### 3.2 Function Block Diagram (FBD)
- Graphical, data-flow oriented.
- Good for process control and continuous logic.

### 3.3 Structured Text (ST)
- High-level, text-based language.
- Use for complex math, loops, and array processing.
- Assignment: `:=`
- Comparison: `=`
- Semicolon `;` required at end of statements.

### 3.4 Sequential Function Chart (SFC)
- State machine / step-based programming.
- Excellent for batch processes and sequential operations.

### 3.5 Instruction List (IL)
- Low-level, assembly-like language.
- Rarely used in modern projects.

## 4. Function Blocks

### 4.1 Elementary Function Blocks (EFB)
Pre-built function blocks provided by Schneider Electric.

**Common EFBs:**
- **TON**: On-delay timer
- **TOF**: Off-delay timer
- **TP**: Pulse timer
- **CTU**: Up counter
- **CTD**: Down counter
- **R_TRIG**: Rising edge detection
- **F_TRIG**: Falling edge detection

### 4.2 Derived Function Blocks (DFB)
User-defined function blocks that encapsulate logic and data.

**Rules:**
- Use DFBs for repetitive logic (e.g., valve control, motor control).
- DFBs have internal memory (instance data).
- DFBs can be written in any of the five IEC languages.
- DFBs can call other DFBs or EFBs.

## 5. Memory Addressing

### 5.1 I/O Addressing
Schneider uses a hierarchical addressing scheme:

**Format:** `%<Type><Rack>.<Module>.<Channel>`

**Examples:**
- `%I0.0.1`: Input, Rack 0, Module 0, Channel 1
- `%Q0.2.5`: Output, Rack 0, Module 2, Channel 5
- `%IW0.1.0`: Input Word, Rack 0, Module 1, Channel 0

**Types:**
- `%I`: Digital Input
- `%Q`: Digital Output
- `%IW`: Analog Input Word
- `%QW`: Analog Output Word
- `%M`: Internal Memory Bit
- `%MW`: Internal Memory Word

### 5.2 Internal Memory
- `%M`: Internal bits (e.g., `%M100`)
- `%MW`: Internal words (e.g., `%MW200`)
- `%MD`: Internal double words (e.g., `%MD300`)

## 6. Online Editing (CCOTF)

One of Control Expert's key features is **Change Configuration On The Fly (CCOTF)**.

**Rules:**
- You can modify logic, add variables, and even add I/O modules while the controller is running.
- Changes are validated and applied without stopping the process.
- Not all changes are allowed online (e.g., changing task periods, deleting active DFBs).
- Always test online changes in a safe environment first.

## 7. Best Practices

### 7.1 Use DDTs and DFBs
Organize your code into reusable, modular components. This improves maintainability and reduces errors.

### 7.2 Naming Conventions
- Use meaningful names for variables and DFBs (e.g., `ConveyorMotor`, `Tank1_Level`).
- Prefix located variables with their type (e.g., `DI_StartButton`, `DO_MotorRun`).

### 7.3 Task Period Selection
- Keep MAST task period consistent with your I/O update rate.
- Avoid making MAST too fast (e.g., 1ms) unless absolutely necessary. This increases CPU load.
- Use FAST task only for truly time-critical operations.

### 7.4 Avoid Deep Nesting
If you have more than 3 levels of nested IF statements in ST, consider refactoring into separate DFBs or using CASE statements.

## 8. Common Pitfalls

### 8.1 Forgetting to Initialize Variables
Variables may contain unpredictable values after a cold start. Always initialize critical variables in a startup section or on first scan.

### 8.2 Mixing Located and Unlocated Variables
Be careful when mixing `%I` (located) and internal variables. Ensure you're reading the correct source.

### 8.3 Task Overrun
If a task takes longer to execute than its defined period, a task overrun fault occurs. Monitor task execution times and optimize code if necessary.

---
**References:**
- EcoStruxure Control Expert - Program Languages and Structure (35006144K01000)
- EcoStruxure Control Expert - Operating Modes (33003101K01000)
- IEC 61131-3 standard