# Beckhoff / TwinCAT Cheatsheet

This file covers the essential concepts and quirks of the Beckhoff ecosystem, specifically **TwinCAT 3** (which integrates into Visual Studio and relies heavily on the Codesys v3 foundation).

## 1. The TwinCAT / Codesys Heritage

TwinCAT 3 PLC programming is based on the IEC 61131-3 standard and is heavily derived from Codesys v3. Most general Codesys rules apply here, but Beckhoff adds significant system-level integration.

- **Object-Oriented Programming (OOP):** TwinCAT fully supports OOP in Structured Text. You can use `METHODS`, `PROPERTIES`, `INTERFACES`, `EXTENDS` (inheritance), and `IMPLEMENTS`.
- **Pointers and References:** TwinCAT allows pointers (`POINTER TO`) and references (`REFERENCE TO`). **Preference:** Use `REFERENCE TO` as it is safer and doesn't require explicit dereferencing (`^`).

## 2. Memory and Addressing

While TwinCAT supports tag-based memory, I/O mapping uses specific absolute address specifiers to link software variables to hardware terminals.

- **%I* (Input Mapping):** Defines a variable that will be linked to a physical input terminal in the TwinCAT System Manager. Example: `bSensor1 AT %I* : BOOL;`
- **%Q* (Output Mapping):** Defines a variable linked to a physical output. Example: `bMotorRun AT %Q* : BOOL;`
- **%M (Memory):** Legacy marker memory. Generally avoided in modern TwinCAT 3 development in favor of standard global variable lists (GVL).

## 3. Project Structure

- **POU (Program Organization Unit):** The building block. Can be a `PROGRAM` (PRG), `FUNCTION_BLOCK` (FB), or `FUNCTION` (FUN).
- **PRG (Program):** Usually assigned to a Task for cyclic execution. `MAIN` is the default PRG.
- **GVL (Global Variable List):** Used for variables that need to be accessed across multiple POUs. Accessible via namespace (e.g., `GVL.MyVar`).
- **DUT (Data Unit Type):** Used to define Structs, Enums, and Unions.

## 4. Timers and Triggers

TwinCAT uses standard IEC blocks from the `Tc2_Standard` library:
- **TON / TOF / TP:** Standard timers. Require an instance. Time format is `T#2s500ms`.
- **R_TRIG / F_TRIG:** Rising and falling edge triggers.

**Important Quirk:** Like all IEC environments, timer and trigger FBs **must be called unconditionally** for their internal state to update correctly.

## 5. Typical Pitfalls
- **Division by Zero:** Will cause a severe exception (Page Fault) and crash the TwinCAT runtime into "Config Mode" (Blue Screen equivalent for the PLC). Always protect divisions: `IF Divisor <> 0 THEN Result := Num / Divisor; END_IF`
- **Array Bounds:** Accessing an array out of bounds will also cause a runtime exception and halt the PLC. Always use `LOWER_BOUND` and `UPPER_BOUND` or strict checks.
- **Retain vs Persistent:** 
  - `RETAIN`: Survives a warm restart, but cleared on a Rebuild/Download. Requires UPS or NovRAM.
  - `PERSISTENT`: Survives downloads and cold boots. Slower to read/write.