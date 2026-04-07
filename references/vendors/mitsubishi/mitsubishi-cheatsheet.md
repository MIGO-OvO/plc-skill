# Mitsubishi GX Works (FX/Q/iQ Series) Cheatsheet

## Device Memory
*   **`X` (Input):** Physical inputs. *Note: Octal addressing in FX series (X0-X7, X10-X17). Hexadecimal in Q/iQ series (X0-XF, X10-X1F).*
*   **`Y` (Output):** Physical outputs. *Octal in FX, Hex in Q/iQ.*
*   **`M` (Internal Relay):** Standard internal bit flag.
*   **`L` (Latch Relay):** Battery-backed internal bit flag (retains state across power cycles).
*   **`D` (Data Register):** 16-bit word memory. Used for integer/real storage.
*   **`T` (Timer):** Timer device. Contains a coil, contact, and current value.
*   **`C` (Counter):** Counter device. Contains a coil, contact, and current value.

## Data Types & Constants
*   **Bit:** 1-bit value (e.g., M0, X1).
*   **Word (16-bit):** Fits in a single `D` register.
*   **Double Word (32-bit):** Spans two consecutive registers (e.g., a 32-bit value in `D10` occupies `D10` and `D11`).
*   **Constants Prefixes:**
    *   **`K`**: Decimal constant (e.g., `K100` = 100).
    *   **`H`**: Hexadecimal constant (e.g., `HFF` = 255).
    *   **`E`**: Floating-point constant (e.g., `E1.5`).

## Common Instructions
*   **`SET` / `RST`:** 
    *   `SET M0`: Latches M0 ON.
    *   `RST M0`: Resets M0 OFF.
*   **Edge Detection:**
    *   `PLS M0`: Pulses M0 ON for one scan when the execution condition goes from OFF to ON (Rising Edge).
    *   `PLF M0`: Pulses M0 ON for one scan when the execution condition goes from ON to OFF (Falling Edge).
    *   *Inline edge contacts:* `|↑|` (LDP - Load Pulse) and `|↓|` (LDF - Load Falling Pulse).
*   **Data Movement:**
    *   `MOV K10 D0`: Moves 16-bit decimal 10 into D0.
    *   `DMOV K100000 D10`: Moves 32-bit decimal into D10 & D11.
*   **Math (16-bit / 32-bit):**
    *   `ADD` / `DADD`: Addition
    *   `SUB` / `DSUB`: Subtraction
    *   `INC` / `DINC`: Increment by 1