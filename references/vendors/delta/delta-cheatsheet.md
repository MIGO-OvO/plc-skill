# Delta (ISPSoft / DVP & AS Series) Cheatsheet

## Device Memory Areas
Delta PLCs use letter-based memory mapping depending on the data application.

| Device | Name | Function / Type |
| :--- | :--- | :--- |
| **X** | Input Relay | Physical digital inputs (e.g., `X0`, `X1`... octal in DVP) |
| **Y** | Output Relay | Physical digital outputs (e.g., `Y0`, `Y1`... octal in DVP) |
| **M** | Auxiliary Relay | Internal bit memory (Boolean / Markers) |
| **S** | Step Relay | Used for sequential function chart (SFC) programming |
| **T** | Timer | Timer status bit / Current value register |
| **C** | Counter | Counter status bit / Current value register |
| **D** | Data Register | 16-bit word memory (stores numeric values) |

## Data Types & Lengths
Instruction prefixes dictate the data width being processed:
- **Bit:** 1-bit value (used with `X`, `Y`, `M`, `S`).
- **16-bit (Word):** Standard integer operations. Registers like `D` or `T` hold 16 bits.
- **32-bit (Double Word):** Prepend a **`D`** to the instruction to handle 32-bit values. Pairs consecutive registers (e.g., `D0` and `D1` form a 32-bit value, addressed as `D0`).

## Common Instructions
| 16-Bit | 32-Bit | Description |
| :--- | :--- | :--- |
| `MOV` | `DMOV` | Move (copy) data from source (`S`) to destination (`D`) |
| `ADD` | `DADD` | Addition (`S1 + S2 -> D`) |
| `SUB` | `DSUB` | Subtraction (`S1 - S2 -> D`) |
| `MUL` | `DMUL` | Multiplication (`S1 * S2 -> D`). *16-bit MUL yields a 32-bit result spanning two registers.* |
| `DIV` | `DDIV` | Division. *Yields quotient and remainder in consecutive registers.* |

## Edge Detection (Pulse Instructions)
Delta provides specific instructions for executing logic exactly once when a signal changes state.
- **`LDP` (Load Pulse):** Rising Edge. Activates on the transition from OFF to ON.
- **`LDF` (Load Falling):** Falling Edge. Activates on the transition from ON to OFF.
- **`ANDP` / `ANDF`:** Series rising/falling edge contact.
- **`ORP` / `ORF`:** Parallel rising/falling edge contact.
- **`PLS` / `PLF`:** Outputs a 1-scan pulse (rising or falling) to a destination bit.