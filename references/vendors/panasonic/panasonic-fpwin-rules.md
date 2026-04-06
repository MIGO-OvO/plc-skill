# Panasonic FP Series Programming Rules

This document outlines the core engineering and programming rules for Panasonic FP-series PLCs using Control FPWIN Pro.

## 1. System Architecture and IEC 61131-3 Compliance

Control FPWIN Pro is highly compliant with the IEC 61131-3 standard.

### 1.1 Program Organization Units (POU)
**Rules:**
- **Programs (PRG)**: The main execution blocks. Assigned to a task (Default, Fast, or Event).
- **Function Blocks (FB)**: Reusable blocks with internal memory (instances). The output depends on inputs and internal state.
- **Functions (FUN)**: Blocks with no internal memory. The output depends entirely on the current inputs.

### 1.2 Tasks
**Rules:**
- **Default Task**: The standard cyclic execution task.
- **Fast Task / Timer Interrupt**: Executes at a fixed, high-speed interval. Do not overload this task.
- **Event Task**: Triggered by a specific hardware or software event.

## 2. Variables and Data Types

### 2.1 Scope
- **Global Variables**: Defined in the Global Variable List (GVL). Accessible by all POUs. Often used to map physical I/O.
- **Local Variables**: Defined in the POU header. Only accessible within that specific POU.

### 2.2 Data Types
- **Standard**: `BOOL`, `INT` (16-bit), `DINT` (32-bit), `REAL` (32-bit float), `TIME`, `STRING`.
- **DUT (Data Unit Type)**: Use `STRUCT` to group related variables. This is crucial for organized programming.
- **Arrays**: Supported for all data types (e.g., `ARRAY [0..9] OF INT`).

### 2.3 I/O Addressing (Panasonic Specific)
Panasonic uses a specific addressing format for physical I/O and internal relays.

**Format:** `%<Prefix><Address>`

**Prefixes:**
- `%IX`: Digital Input (e.g., `%IX0.0` - Input 0 on word 0)
- `%QX`: Digital Output (e.g., `%QX1.2` - Output 2 on word 1)
- `%MX`: Internal Relay / Memory bit (e.g., `%MX10.0`)
- `%MW`: Internal Memory Word (e.g., `%MW100`)
- `%MD`: Internal Memory Double Word (e.g., `%MD200`)

**Note on Octal/Hex:**
Historically, Panasonic (Matsushita) I/O addressing often used Hexadecimal for bit numbers (e.g., X0 to XF, Y10 to Y1F). In FPWIN Pro, this is mapped to the IEC format.

## 3. Programming Languages

### 3.1 Ladder Diagram (LD)
- Standard relay-logic format.
- Function blocks can be easily integrated into ladder rungs using the `EN/ENO` (Enable/Enable Out) pins.

### 3.2 Structured Text (ST)
- Used for math, arrays, and complex logic.
- Standard IEC syntax: `:=` for assignment, `;` to terminate statements.
- `IF...THEN...ELSIF...END_IF`
- `CASE...OF...END_CASE`
- `FOR...TO...BY...DO...END_FOR`

### 3.3 Function Block Diagram (FBD)
- Graphical data-flow language.
- Excellent for process control and linking multiple FBs together.

## 4. Timers and Counters

### 4.1 IEC Timers
Use standard IEC timers rather than legacy Panasonic timers when using FPWIN Pro.
- **TON**: On-Delay Timer
- **TOF**: Off-Delay Timer
- **TP**: Pulse Timer

**Rules:**
- Declare the timer as an FB instance in the Local Variables.
- Use the `TIME` data type for the `PT` (Preset Time) input (e.g., `T#5s`, `T#500ms`).

```st
// ST Timer Example
Inst_TON(IN := StartCondition, PT := T#2s);
TimerDone := Inst_TON.Q;
```

### 4.2 IEC Counters
- **CTU**: Up Counter
- **CTD**: Down Counter
- **CTUD**: Up/Down Counter

## 5. Motion Control (MINAS / RTEX)

Panasonic PLCs tightly integrate with Panasonic MINAS servo drives.

**Rules:**
- Use the dedicated FPWIN Pro motion libraries (e.g., for RTEX - Real-Time Express).
- Motion is typically handled via specialized Function Blocks provided by Panasonic.
- Configure axis parameters in the hardware configuration tool, then use FBs like `MC_Power`, `MC_MoveAbsolute` to control them.

## 6. System Registers and Special Relays

Panasonic PLCs have specific memory areas dedicated to system status.

**Rules:**
- **System Registers**: Configured in the PLC hardware setup (e.g., setting communication port parameters, holding memory ranges).
- **Special Relays (Flags)**:
  - `R9010` (or its IEC equivalent): Always ON flag.
  - `R9011`: Always OFF flag.
  - `R9013`: Initial pulse (ON for one scan at startup).
  - `R901A`: 100ms clock pulse.
  - `R901C`: 1s clock pulse.

*Note: In FPWIN Pro, it is best practice to use the system-defined global variables (e.g., `sys_bIsFirstScan`) rather than hardcoding addresses like `R9013`.*

## 7. Best Practices

### 7.1 Separation of Logic and I/O
- Do not use physical I/O addresses (`%IX`, `%QX`) deep inside Function Blocks.
- Pass physical I/O to Global Variables, and map those Global Variables to the `VAR_INPUT` / `VAR_OUTPUT` of your POUs.

### 7.2 Retentive Variables
- To make a variable survive a power cycle, check the "Retain" box in the variable declaration editor.
- Ensure your System Registers are configured to allocate enough holding (retentive) memory for your application.

### 7.3 Use DUTs for Complex Machines
- Create a `STRUCT` for a motor (Command, Status, Speed, Fault) instead of creating 4 separate arrays or variable sets.

---
**References:**
- Control FPWIN Pro Programming Manual (ACGM0313V5EN)
- Control FPWIN Pro Reference Manual (ACGM0142V50END)
- IEC 61131-3 Standard