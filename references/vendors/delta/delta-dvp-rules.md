# Delta Electronics Programming Rules

This document outlines the core engineering and programming rules for Delta Electronics PLCs (DVP, AH, AS series).

## 1. Memory Addressing and Device Types

Delta uses a device-based addressing system similar to Mitsubishi.

### 1.1 Device Types
**Rules:**
- **X (Input)**: External inputs. Addressing is **octal** (X0, X1, ..., X7, X10, X11, ..., X17, X20, ...).
- **Y (Output)**: External outputs. Also **octal** addressing.
- **M (Auxiliary Relay)**: Internal bits. Decimal addressing (M0~M4095). Some ranges are latched (retain values after power loss).
- **S (Step Relay)**: Used for Sequential Function Chart (SFC) programming (S0~S1023).
- **T (Timer)**: Timers with different time bases (1ms, 10ms, 100ms). T0~T255.
- **C (Counter)**: 16-bit and 32-bit counters. C0~C255.
- **D (Data Register)**: 16-bit data storage. D0~D9999. Some ranges are latched.

### 1.2 Octal Addressing for I/O
**Critical Rule:** X and Y devices use octal numbering, not decimal.
- Valid: X0, X1, X2, X3, X4, X5, X6, X7, X10, X11, ..., X17, X20
- Invalid: X8, X9, X18, X19 (these do not exist)

## 2. Programming Software

### 2.1 WPLSoft (Legacy, DVP Series)
**Rules:**
- Primarily Ladder Diagram (LD) programming.
- Simple, lightweight, widely used for DVP-ES, DVP-EX, DVP-SS series.
- Limited support for advanced features (no ST, no OOP).
- Instruction set is proprietary Delta format (e.g., `LD`, `OUT`, `MOV`, `ADD`).

### 2.2 ISPSoft (Modern, AH/AS Series)
**Rules:**
- Supports multiple languages: LD, SFC, FBD, and limited ST.
- Partial IEC 61131-3 compliance.
- Used for AH series (high-performance) and AS series (motion control).
- Supports Function Blocks (FB) and structured programming.

## 3. Timers and Counters

### 3.1 Timers
Delta timers have different time bases:
- **T0~T126**: 100ms time base (can be changed to 10ms via M1028)
- **T127**: 1ms time base
- **T128~T183**: 10ms time base (can be changed to 1ms via M1038)
- **T184~T199**: For subroutines, 100ms time base
- **T200~T255**: Accumulative timers (retain accumulated value when input is OFF)

**Rules:**
- Specify the preset value in the timer instruction (e.g., `TMR T0 K50` for 5 seconds with 100ms base).
- Use `K` for decimal constants (e.g., `K100`).

### 3.2 Counters
- **C0~C199**: 16-bit up counters
- **C200~C223**: 16-bit up counters (latched)
- **C224~C255**: 32-bit up/down counters (latched)

**Rules:**
- 16-bit counters count from 0 to 32,767.
- 32-bit counters count from -2,147,483,648 to 2,147,483,647.
- Use `RST` instruction to reset a counter.

## 4. Special Auxiliary Relays (M)

Delta uses special M relays for system control and status:
- **M1000~M1999**: Special auxiliary relays (some are latched)
- Examples:
  - **M1000**: Monitors PLC operation (ON when running)
  - **M1002**: Initial pulse (ON for one scan on startup)
  - **M1013**: 1-second clock pulse
  - **M1028**: Changes T0~T126 time base from 100ms to 10ms
  - **M1038**: Changes T200~T245 time base from 10ms to 1ms

**Rule:** Always consult the DVP-PLC Programming Manual for the complete list of special M relays and their functions.

## 5. Data Registers (D)

### 5.1 General Data Registers
- **D0~D511**: General purpose (non-latched)
- **D512~D999**: General purpose (latched)
- **D1000~D1999**: Special data registers (system status, parameters)
- **D2000~D9999**: General purpose (latched)

### 5.2 32-bit Operations
- Combine two consecutive D registers for 32-bit operations.
- Example: `D0` (low word) and `D1` (high word) form a 32-bit value.
- Use instructions like `DMOV` (32-bit move), `DADD` (32-bit add).

## 6. Instruction Set

Delta uses a proprietary instruction set, not standard IEC 61131-3 mnemonics.

### 6.1 Basic Instructions
- **LD**: Load (start a rung with a normally open contact)
- **LDI**: Load Inverse (start a rung with a normally closed contact)
- **OUT**: Output (energize a coil)
- **SET**: Set (latch ON)
- **RST**: Reset (unlatch OFF)

### 6.2 Application Instructions
- **MOV**: Move data (16-bit)
- **DMOV**: Move data (32-bit)
- **ADD**: Addition (16-bit)
- **DADD**: Addition (32-bit)
- **CMP**: Compare (16-bit)
- **DCMP**: Compare (32-bit)

**Rule:** Always use the correct instruction variant (16-bit vs. 32-bit) based on your data size.

## 7. Best Practices

### 7.1 Use Latched Devices for Critical Data
- Use latched M and D ranges for data that must survive a power cycle.
- Non-latched devices reset to 0 on power-up.

### 7.2 Avoid Octal Addressing Errors
- Remember that X and Y use octal numbering. X8 and X9 do not exist.
- When mapping I/O, skip from X7 to X10, X17 to X20, etc.

### 7.3 Initialize Special M Relays Carefully
- Changing special M relays (e.g., M1028 for timer time base) affects system behavior globally.
- Document any changes to special M relays in your code comments.

---
**References:**
- DVP-PLC Application Manual: Programming
- ISPSoft User Manual
- Delta Download Center