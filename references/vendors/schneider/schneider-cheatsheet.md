# Schneider Electric (EcoStruxure / Unity Pro) Cheatsheet

## Located Variables (Topological Addressing)
Schneider uses a `%` prefix for directly mapped physical or internal memory addresses.

| Prefix | Memory Type | Description |
| :--- | :--- | :--- |
| `%I` | Input Bit | Physical digital input (e.g., `%I0.1.0` - Rack 0, Slot 1, Channel 0) |
| `%Q` | Output Bit | Physical digital output (e.g., `%Q0.2.1` - Rack 0, Slot 2, Channel 1) |
| `%M` | Memory Bit | Internal boolean memory / Marker |
| `%MW` | Memory Word | 16-bit integer/word memory register |
| `%MD` | Memory Double | 32-bit double-word memory register |
| `%MF` | Memory Float | 32-bit floating-point memory register |

*Note: Bit access within a word is done using `.`: e.g., `%MW10.0` (Bit 0 of Word 10).*

## Standard Data Types
| Type | Size | Range / Format |
| :--- | :--- | :--- |
| `BOOL` | 1 bit | `TRUE` (1) or `FALSE` (0) |
| `INT` | 16 bit | -32,768 to 32,767 |
| `DINT` | 32 bit | -2,147,483,648 to 2,147,483,647 |
| `REAL` | 32 bit | IEEE 754 Floating point (e.g., `12.34`) |
| `TIME` | 32 bit | e.g., `T#10s`, `T#1h20m`, `T#500ms` |

## DFBs (Derived Function Blocks)
DFBs are user-defined function blocks (UDFBs). They encapsulate reusable logic and maintain state between execution cycles. 
- **Creation:** Authored in any IEC 61131-3 language (ST, FBD, LD, IL).
- **Instantiation:** Must be declared as an instance variable before calling.
- **Usage:** Call the instance in the program passing input variables (`IN`) and reading output variables (`OUT`). They retain their internal memory (`%M` and `%MW` equivalents) across scans.

## Standard IEC Timers
Schneider timers strictly follow the IEC 61131-3 standard.
- **`TON` (Timer On Delay):** Output `Q` turns `TRUE` after `IN` has been `TRUE` for the duration of `PT` (Preset Time).
- **`TOF` (Timer Off Delay):** Output `Q` remains `TRUE` until `IN` has been `FALSE` for the duration of `PT`.
- **`TP` (Pulse Timer):** Output `Q` turns `TRUE` for `PT` duration upon a rising edge of `IN`.

*Variables:* `IN` (BOOL start condition), `PT` (TIME preset), `Q` (BOOL done flag), `ET` (TIME elapsed).