# Omron Programming Rules (Sysmac NJ/NX Series)

This document outlines the core engineering and programming rules for modern Omron NJ/NX series controllers using Sysmac Studio.

## 1. System Architecture and Tasks

### 1.1 Task Types and Scheduling
Sysmac controllers execute POUs (Program Organization Units) based on assigned tasks.

**Rules:**
- **Primary Periodic Task**: The most critical task. It handles EtherCAT I/O refreshing, motion control, and primary logic. Keep the cycle time of this task as short and stable as possible (e.g., 1ms to 4ms).
- **Periodic Tasks**: Lower priority tasks for non-critical logic (e.g., communications, HMI interfacing, data logging).
- **Event Tasks**: Executed only when a specific condition is met.

### 1.2 Program Organization Units (POU)
- **Programs**: Assigned to tasks. They contain the main execution logic.
- **Functions (FUN)**: Do not have internal memory. Outputs depend purely on inputs.
- **Function Blocks (FB)**: Have internal memory (instance). Use for logic that requires state retention across cycles (e.g., timers, step sequences, motor control).

## 2. Variable and Memory Management

Sysmac Studio is strictly **variable-based** (tag-based), fully abandoning the physical address areas (CIO, D, W, H) used in legacy CJ/CP series.

### 2.1 Variable Scope
**Rules:**
- **Global Variables**: Defined in the Global Variable Table. Accessible by all programs. Use for physical I/O mapping, HMI communication, and data shared between programs.
- **Local Variables**: Defined inside a specific Program, FUN, or FB. They cannot be accessed from outside. Use for internal calculations, state tracking, and FB instances.

### 2.2 I/O Mapping
**Rules:**
- Physical I/O (EtherCAT slaves, NX I/O units) is mapped directly to Global Variables.
- Sysmac Studio automatically creates device variables based on the hardware configuration. You can assign custom Global Variable names to these ports in the "I/O Map" section.

### 2.3 Variable Attributes
- **Retain**: Set this attribute to TRUE if the variable's value must survive a power cycle.
- **Network Publish**: Set to `Publish Only`, `Input`, or `Output` to expose the variable via EtherNet/IP (tag data links) or to an HMI/SCADA.

### 2.4 Data Types
- **Standard**: `BOOL`, `INT`, `DINT`, `REAL`, `LREAL`, `TIME`, `STRING`.
- **Arrays**: Zero-indexed or explicitly dimensioned (e.g., `ARRAY[0..99] OF INT`).
- **Structures**: Create custom Data Types (Structures) to group related data. Highly recommended for organizing machine data (e.g., `sAxisData`, `sValveCmd`).
- **Unions**: Supported for overlapping memory interpretations (e.g., reading a DINT as 4 BYTES).

## 3. Programming Languages

### 3.1 Ladder Diagram (LD)
- The primary language in Sysmac Studio.
- **Inline ST**: A powerful feature in Sysmac Studio. You can place an "Inline ST" box directly inside a Ladder rung to perform complex math or array manipulations without creating a separate Function or FB.

### 3.2 Structured Text (ST)
- Used inside FBs, FUNs, or Inline ST boxes.
- Follows IEC 61131-3 syntax.
- Semicolon `;` required at the end of statements.
- Assignment is `:=`.
- Comparison is `=`.

## 4. Timers and Counters

### 4.1 Timer Types
Sysmac uses IEC timers. The data type is `Timer`.
- `TON` (On-Delay)
- `TOF` (Off-Delay)
- `TP` (Pulse)

**Rules:**
- Time values are represented using the `TIME` data type. Syntax: `T#2s`, `T#500ms`, `T#1h2m`.
- The timer instance must be declared as a Local Variable.

```st
// ST Timer example
Inst_TON(In := StartCond, PT := T#5s, Q => TimeUp, ET => ElapsedTime);
```

### 4.2 Counter Types
- `CTU` (Up Counter)
- `CTD` (Down Counter)
- `CTUD` (Up/Down Counter)

## 5. Motion Control Integration

A core strength of the Sysmac platform is tightly integrated motion control via EtherCAT.

**Rules:**
- Use **MC Function Blocks** (e.g., `MC_Power`, `MC_MoveAbsolute`, `MC_MoveVelocity`).
- Axes are defined globally as `_sAXIS_REF` structures.
- Motion FBs require an `Axis` InOut parameter.
- **Buffer Mode**: Motion commands can be queued or blended using the `BufferMode` parameter (e.g., `_mcAborting`, `_mcBuffered`, `_mcBlendingNext`).

```st
// Basic motion enabling sequence
Inst_MC_Power(
    Axis := Axis1,
    Enable := TRUE,
    Status => PowerOn,
    Error => AxisErr
);

IF PowerOn AND StartMove THEN
    Inst_MC_MoveAbsolute(
        Axis := Axis1,
        Execute := TRUE,
        Position := 100.0,
        Velocity := 50.0
    );
END_IF;
```

## 6. Execution Order and Refreshing

**Critical Concept:**
- In the Primary Periodic Task, execution happens in this order:
  1. Receive input data (EtherCAT, local I/O).
  2. Execute user programs (in the order defined in Task Settings).
  3. Execute motion control processing.
  4. Send output data (EtherCAT, local I/O).

**Rules:**
- Because inputs are captured at the start of the task and outputs are written at the end, I/O states are consistent throughout the entire execution of that task cycle. You do not need to manually buffer I/O to prevent mid-scan changes.

## 7. Common Pitfalls

- **Retain vs Initial Value**: `Initial Value` is applied only on a cold start or when explicitly cleared. `Retain` keeps the value across normal power cycles. Don't confuse them.
- **Array Out of Bounds**: Sysmac Studio enforces strict array bounds checking. Accessing an out-of-bounds index will cause a Major Fault.
- **Task Overlap**: If the code in a periodic task takes longer to execute than the defined task period, a Task Period Exceeded fault occurs. Monitor task execution times.

---
**References:**
- NJ/NX-series CPU Unit Software User's Manual (W501)
- NJ/NX-series Instructions Reference Manual (W502)