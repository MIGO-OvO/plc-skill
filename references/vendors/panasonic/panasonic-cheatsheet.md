# Panasonic (FPWIN Pro / FP Series) Cheatsheet

## Memory Areas (IEC & Native)
Panasonic PLCs support pure IEC addressing but naturally map directly to native FP hardware registers.

| Native | IEC | Description |
| :--- | :--- | :--- |
| **X** | `%I` | Input Relay (Physical digital inputs) |
| **Y** | `%Q` | Output Relay (Physical digital outputs) |
| **R** | `%M` | Internal Relay (Boolean markers/memory bits) |
| **T** | N/A | Timer bit and current value |
| **C** | N/A | Counter bit and current value |
| **DT** | `%MW` | Data Register (Standard 16-bit word memory) |
| **WR** | `%MW` | Word Relay (16-bit grouped representation of R relays) |
| **WL** | N/A | Word Latch (Retentive 16-bit word memory) |

## Standard Data Types
Panasonic’s FPWIN Pro is strictly IEC 61131-3 compliant for variables and types.
| Type | Size | Description / Range |
| :--- | :--- | :--- |
| `BOOL` | 1 bit | `TRUE` / `FALSE` |
| `INT` | 16 bit | Signed integer (-32768 to 32767) |
| `UINT` | 16 bit | Unsigned integer (0 to 65535) |
| `WORD` | 16 bit | Bit string (Ideal for Hex manipulation: e.g., `16#FFFF`) |
| `DINT` | 32 bit | Signed double integer |
| `REAL` | 32 bit | Floating-point (IEEE 754) |

## DUT (Data Unit Types)
A `DUT` in FPWIN Pro is the equivalent of a User-Defined Type (UDT) or Struct.
- **Purpose:** Groups multiple data variables into a single, cohesive structured type (e.g., grouping `MotorSpeed` (INT), `MotorStart` (BOOL), and `MotorTemp` (REAL) into a `DUT_Motor`).
- **Usage:** Create the DUT in the project navigator, then declare a variable of this custom type in the Global Variable List (GVL) or Local POU.
- **Access:** Accessed in code using dot notation (e.g., `Conveyor.MotorStart`).

## Special System Registers (SysM / SysD)
System bits and words provide diagnostic data and basic PLC system clock functions.
- **`sys_bIsFirstScan` (R901A):** TRUE only during the very first logic scan.
- **`sys_bIsAlwaysOn` (R9010):** Always TRUE while the PLC is in RUN mode.
- **Clock Pulses:** `sys_bPulse1s` (1-second toggle/flasher), `sys_bPulse0_1s` (0.1-second toggle).
- **`sys_iScanTimeCurrent` (DT90022):** Integer register containing the current scan time of the PLC.