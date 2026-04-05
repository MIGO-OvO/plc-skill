# Siemens Instruction and Device Notes

This file covers specific conventions for Siemens devices, memory, and instructions, primarily focusing on S7-1200 / S7-1500 and the TIA Portal environment.

## 1. Addressing and Device Types

Unlike Mitsubishi's X/Y/M/D, Siemens uses a distinct addressing model:

- **Inputs (I/E):** `I` (International) or `E` (Eingang - German). Examples: `I0.0`, `IW2`, `ID4`.
- **Outputs (Q/A):** `Q` (International) or `A` (Ausgang - German). Examples: `Q0.0`, `QW2`, `QD4`.
- **Memory (M):** Merker memory. Examples: `M0.0`, `MW10`, `MD20`. Note: Avoid overusing M-memory in modern Siemens development; prefer DBs.
- **Data Blocks (DB):** Used for structured storage. Can be Global (accessible everywhere) or Instance (attached to a specific FB). Example: `DB1.DBX0.0` or symbolically `"MyGlobalDB".MotorStatus`.

**Symbolic vs Absolute:**
Modern TIA Portal strongly prefers **Symbolic Addressing**. When generating code or reviewing, push towards using tag names rather than absolute addresses (e.g., `"Sensor_In"` instead of `I0.0`).

## 2. FB vs FC (Blocks)

Siemens heavily utilizes encapsulation through FBs and FCs:

- **FC (Function):** Does *not* have memory. All outputs must be assigned in every cycle. Use for pure mathematical calculations or logic that doesn't need to remember states.
- **FB (Function Block):** Has an associated **Instance Data Block (Instance DB)** to remember values between scan cycles. Use for motors, valves, state machines, timers, etc.

## 3. Passing Parameters

When defining interfaces for FB/FC:
- `Input`: Passed by value (usually).
- `Output`: Passed by value (usually).
- `InOut`: Passed by reference. **Crucial:** Use `InOut` for complex structures (UDTs) to save memory and execution time.

## 4. Timers and Counters (IEC Timers)

In S7-1200/1500, use IEC Timers (`TON`, `TOF`, `TP`).
- **Do not** use legacy S5 timers unless explicitly requested for S7-300/400 legacy maintenance.
- In an FB, declare IEC timers as **Multi-instance** (Static variables) instead of generating a new separate DB for every single timer.

## 5. UDT (User-Defined Data Types)

UDTs (PLC Data Types) are the foundation of good Siemens structure.
- Always use UDTs for grouping related signals (e.g., `typeValve_IO`, `typeMotor_Status`).
- Pass UDTs via `InOut` in block interfaces.