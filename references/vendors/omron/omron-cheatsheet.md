# Omron Cheatsheet

This file covers the essential concepts and quirks of the Omron ecosystem, primarily focusing on **Sysmac Studio** (NJ/NX series) and contrasting it with legacy **CX-Programmer** (CJ/CP/CS series).

## 1. The Generational Split (CX-Programmer vs Sysmac Studio)

Omron has two distinct paradigms. When assisting a user, **first determine which platform they are using**.

### Legacy: CX-Programmer (CP, CJ, CS Series)
- **Memory Model:** Strictly memory-mapped (Absolute Addressing).
  - `CIO` (Core I/O Area): Digital I/O and internal relays. (e.g., `0.00`, `1.05`).
  - `W` (Work Area): Internal working bits. Similar to CIO but dedicated to internal logic.
  - `H` (Holding Area): Retentive memory (keeps state through power loss).
  - `D` (Data Memory): 16-bit word storage for integers, floats, and strings.
- **Quirk:** Timer and Counter numbers are shared (e.g., `T0000`, `C0001`). You must not reuse the same index for a timer and a counter.

### Modern: Sysmac Studio (NJ, NX Series)
- **Memory Model:** Completely **Tag-Based** (IEC 61131-3 compliant). Similar to Rockwell Studio 5000 and Codesys. Absolute addressing is deprecated (though supported for backwards compatibility via "AT" specifications).
- **Global vs Local:** Variables are strictly defined as Global Variables or Internal/Local Variables inside a POU (Program Organization Unit).

## 2. Timers and Counters (Sysmac Studio)

Sysmac Studio uses standard IEC timers (`TON`, `TOF`, `TP`).
- **Structure:** Omron's IEC timer requires an instance variable of type `TON`.
- **Inputs:** `In` (Boolean trigger), `PT` (Preset Time, format is `T#2s`).
- **Outputs:** `Q` (Done bit), `ET` (Elapsed Time).
- **Execution:** Timers in Omron (and most IEC environments) must be called unconditionally if their internal state needs to update. Avoid placing a `TON` block inside an `IF` statement that might stop executing.

## 3. Arrays and Data Structures

- **Zero-Indexed:** In Sysmac Studio, arrays default to 0-indexed (e.g., `MyArray ARRAY[0..9] OF INT`). 
- **Structures (UDTs):** Extensively used. Omron supports Arrays of Structures and Structures containing Arrays.

## 4. Execution Order and Tasks

- Sysmac Studio relies heavily on **EtherCAT** for motion control and remote I/O.
- The **Primary Periodic Task** is critical. Logic execution is strictly synchronized with the EtherCAT refresh cycle.
- Avoid writing `WHILE` loops or `FOR` loops with high iteration counts that could cause a task watchdog timeout (Task Period Exceeded).

## 5. Typical Pitfalls
- **Retain vs Non-Retain:** In Sysmac Studio, you flag a variable as Retained in the variable table. If you change a Retained variable's structure (UDT) or size, a memory rebuild might wipe the retained data.
- **String Handling:** Strings in Sysmac Studio are null-terminated (`NUL`). Pay attention to string lengths when using string manipulation instructions, or buffer overflows can occur.