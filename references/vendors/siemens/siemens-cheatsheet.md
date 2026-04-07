# Siemens TIA Portal (S7-1200/1500) Cheatsheet

## Memory Areas (Operands)
*   **`I` (Input):** Physical input image (e.g., `I0.0` bit, `IB0` byte, `IW0` word)
*   **`Q` (Output):** Physical output image (e.g., `Q0.0` bit, `QB0` byte, `QW0` word)
*   **`M` (Memory):** Internal flag/bit memory (e.g., `M0.0` bit, `MW10` word, `MD20` dword)
*   **`DB` (Data Block):** Structured program data (e.g., `DB1.DBX0.0` bit, `DB1.DBW2` word)

## Basic Data Types
*   **`Bool`**: Boolean (1 bit) - `TRUE` / `FALSE`
*   **`Int` / `UInt`**: 16-bit Integer (Signed / Unsigned)
*   **`DInt` / `UDInt`**: 32-bit Integer (Signed / Unsigned)
*   **`Word` / `DWord`**: 16-bit / 32-bit bit-string (Hex/Binary representation)
*   **`Real`**: 32-bit floating-point number
*   **`Time`**: 32-bit duration (Format: `T#10s`, `T#2h30m`, up to 24 days)
*   **`DTL`**: Date and Time Long (12 bytes: Year, Month, Day, Weekday, Hour, Min, Sec, Nanosec)

## Data Blocks (DBs)
*   **Global DB:** Centralized data repository accessible from anywhere in the program.
*   **Instance DB:** Dedicated memory assigned specifically to a single Function Block (FB) call. 
*   **Optimized Block Access:** (Default for S7-1200/1500) The CPU structures the data automatically for optimal performance. Variables have no fixed address offsets (cannot use `DB1.DBW2`, must use symbolic name `DB1.MyVar`).
*   **Non-Optimized (Standard):** Retains fixed byte offsets for compatibility with legacy S7-300/400 systems and external HMI/SCADA communications.

## Common Timers (IEC)
*IEC Timers are Function Blocks (FBs) and require an Instance DB or a Multi-Instance declaration.*
*   **`TON` (Timer On Delay):** Output `Q` turns TRUE after input `IN` has been TRUE for time `PT`.
*   **`TOF` (Timer Off Delay):** Output `Q` turns FALSE after input `IN` has been FALSE for time `PT`.
*   **`TP` (Pulse Timer):** When `IN` goes TRUE, `Q` goes TRUE for exactly duration `PT`, regardless of `IN` state.
*   **Parameters:** `IN` (Bool: Trigger), `PT` (Time: Preset Time), `Q` (Bool: Output), `ET` (Time: Elapsed Time).