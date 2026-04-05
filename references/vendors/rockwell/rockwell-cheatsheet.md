# Rockwell / Allen-Bradley Cheatsheet

This file covers the essential concepts and quirks of the Rockwell Automation (Allen-Bradley) ecosystem, primarily focusing on **Studio 5000 Logix Designer** (ControlLogix, CompactLogix).

## 1. Tag-Based Memory (No Fixed Addresses)

Rockwell completely abandoned traditional fixed memory registers (like X/Y/M or I/Q/M) in favor of a strictly **Tag-Based** system.

- **Controller Tags:** Global scope. Accessible by any program, HMI, or SCADA. Use this for I/O and shared data.
- **Program Tags:** Local scope. Isolated to a specific Program. Use this for intermediate logic.
- **Base Data Types:** `BOOL`, `SINT` (8-bit), `INT` (16-bit), `DINT` (32-bit - **default and preferred**), `REAL` (32-bit float).
- **Strings:** `STRING` is a structured type containing a `.LEN` (DINT) and `.DATA` (Array of SINTs). String manipulation requires specific instructions (CONCAT, FIND, MID) and isn't as seamless as PC programming.

## 2. Program Structure: Tasks, Programs, Routines

- **Task:** Defines the execution trigger (Continuous, Periodic, Event). A controller can only have ONE Continuous task, but multiple Periodic tasks.
- **Program:** A logical grouping within a Task. Contains its own Local Tags.
- **Routine:** The actual code (Ladder Logic, Structured Text, FBD, SFC). 
  - Every Program must have a **MainRoutine**.
  - To execute other routines, you must explicitly call them using the **JSR** (Jump to Subroutine) instruction.

## 3. AOI (Add-On Instructions) vs Subroutines

- **AOI:** The equivalent of a Siemens FB or Codesys Function Block. 
  - Encapsulates logic and local data.
  - **Major Quirk:** In older/current firmware, you **cannot edit AOI logic online** while the PLC is running. This is a massive difference from Siemens/Codesys. If an AOI needs a bug fix, you must download the PLC (stopping the process).
- **Subroutines (JSR with Parameters):** Often used instead of AOIs for logic that *must* be editable online. You pass parameters into a JSR using `SBR` and `RET` instructions.

## 4. Timers and Counters

Rockwell timers are structures, not just instructions:
- **Timer Type (`TIMER`):** Contains `.PRE` (Preset value in milliseconds), `.ACC` (Accumulated time), `.EN` (Enable bit), `.TT` (Timer Timing bit), `.DN` (Done bit).
- **Usage:** In ST, it looks like `TON(MyTimer);`. You check completion with `IF MyTimer.DN THEN...`

## 5. UDTs (User-Defined Data Types)

- Highly encouraged for grouping data (e.g., a `Motor` UDT containing `.Start`, `.Stop`, `.Running`, `.Fault`).
- Controller and Program tags can use UDTs. AOIs can accept UDTs as `InOut` parameters (passed by reference, saving memory).