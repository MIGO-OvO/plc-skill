# CODESYS V3.5 (IEC 61131-3) Cheatsheet

## IEC 61131-3 Memory Allocation
CODESYS uses standard IEC direct memory addressing. Format: `%[Area][Size][Offset]`
*   **Areas:** 
    *   `I`: Input (Physical)
    *   `Q`: Output (Physical)
    *   `M`: Memory (Internal flags)
*   **Sizes:** 
    *   `X` or none: Bit (e.g., `%IX0.0`, `%QX1.2`)
    *   `B`: Byte (8-bit) (e.g., `%MB0`)
    *   `W`: Word (16-bit) (e.g., `%IW2`)
    *   `D`: Double Word (32-bit) (e.g., `%QD4`)
*   *Note: Overlapping occurs. `%MW0` consists of `%MB0` and `%MB1`.*

## Common Data Types
*   **`BOOL`**: TRUE or FALSE
*   **`INT` / `UINT`**: 16-bit Integer (Signed / Unsigned)
*   **`DINT` / `UDINT`**: 32-bit Integer (Signed / Unsigned)
*   **`REAL` / `LREAL`**: 32-bit / 64-bit Floating Point
*   **`STRING`**: ASCII String (default 80 characters, e.g., `STRING(50)`)
*   **`TIME`**: Duration (e.g., `T#5s`, `T#2h30m`)
*   **`DATE_AND_TIME` (DT)**: Format `DT#2023-10-25-12:30:00`

## Standard Timers & Counters (Standard.lib)
*   **`TON` (Timer On Delay):** 
    *   `IN` (BOOL): Starts timer when TRUE.
    *   `PT` (TIME): Preset duration.
    *   `Q` (BOOL): Turns TRUE when ET reaches PT.
    *   `ET` (TIME): Elapsed time.
*   **`TOF` (Timer Off Delay):** `Q` goes TRUE immediately with `IN`, stays TRUE until `PT` expires after `IN` goes FALSE.
*   **`CTU` (Count Up):** 
    *   `CU` (BOOL): Increments on rising edge.
    *   `RESET` (BOOL): Resets CV to 0.
    *   `PV` (WORD): Preset value.
    *   `Q` (BOOL): TRUE when CV >= PV.

## Task Configuration Basics
CODESYS executes code by assigning Program Organization Units (POUs - specifically `PRG` type) to Tasks.
*   **Cyclic Task:** Executes at a strictly defined time interval (e.g., 10ms). The most common task type for PLC logic.
*   **Freewheeling Task:** Executes continuously. As soon as one scan finishes, the next begins immediately.
*   **Event Task:** Executes only when a specific global variable triggers a rising edge.
*   **Watchdog:** Monitors task execution time. If a task exceeds the configured watchdog time (due to infinite loops or heavy logic), the PLC faults and halts.