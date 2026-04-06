# Keyence KV Series Programming Rules

This document outlines the core engineering and programming rules for Keyence KV-series PLCs using KV Studio.

## 1. Programming Languages

KV Studio supports multiple programming methods:

### 1.1 Ladder Diagram (LD)
- Traditional relay logic style
- Most common for discrete control
- Graphical, easy to troubleshoot

### 1.2 Script Programming
- Text-based language similar to BASIC
- Excellent for complex math, string manipulation, and data processing
- More compact than ladder for certain tasks

**Script Example:**
```basic
DIM i AS INT
DIM sum AS INT
sum = 0
FOR i = 0 TO 9
    sum = sum + DataArray[i]
NEXT i
Result = sum / 10
```

### 1.3 Function Block (FB)
- Reusable code blocks
- Encapsulate logic and data
- Can be created in Ladder or Script

## 2. Symbol-Based Programming

KV Studio uses symbol-based (tag-based) programming, not traditional device addressing.

**Rules:**
- Define variables with meaningful names (e.g., `ConveyorSpeed`, `Tank1_Level`)
- Variables are automatically mapped to internal memory
- Export/import tags via CSV for documentation or HMI integration

## 3. Data Types and Variables

### 3.1 Standard Data Types
- **BOOL**: Boolean (TRUE/FALSE)
- **INT**: 16-bit signed integer (-32,768 to 32,767)
- **UINT**: 16-bit unsigned integer (0 to 65,535)
- **DINT**: 32-bit signed integer
- **UDINT**: 32-bit unsigned integer
- **REAL**: 32-bit floating point
- **LREAL**: 64-bit floating point
- **STRING**: Character string

### 3.2 Arrays and Structures
- **ARRAY**: Multi-dimensional arrays supported
- **STRUCT**: User-defined structures to group related data

**Example:**
```
TYPE MotorData
    Running : BOOL;
    Speed : REAL;
    Fault : BOOL;
    FaultCode : INT;
END_TYPE

VAR
    Motor1 : MotorData;
    Motor2 : MotorData;
END_VAR
```

## 4. Machine Operation Recorder

A unique feature of KV-8000 series is the built-in Machine Operation Recorder.

**Rules:**
- Automatically records all device states, cycle times, and waveform data
- Triggered on equipment shutdown or error
- Use for rapid troubleshooting and root cause analysis
- Configure recording triggers and data points in KV Studio

## 5. Motion Control (KV-X MOTION)

KV-8000 series supports integrated motion control.

**Rules:**
- Use KV-X MOTION modules for positioning and motion control
- Supports point-to-point positioning, interpolation, and electronic camming
- Program motion using dedicated motion function blocks in KV Studio

## 6. Communication

### 6.1 EtherNet/IP
- Native support for EtherNet/IP
- Use for I/O expansion and communication with other devices

### 6.2 OPC UA (KV-8000A)
- Built-in OPC UA server
- Enables direct communication with SCADA, MES, and IoT platforms
- No additional gateway hardware required

### 6.3 Serial Communication
- RS-232C, RS-422, RS-485 support
- Use for communication with legacy devices, barcode readers, etc.

## 7. Best Practices

### 7.1 Use Symbols, Not Addresses
- Always use meaningful symbol names
- Avoid direct device addressing (e.g., `DM100`) in favor of symbols (e.g., `ProductCount`)

### 7.2 Leverage Script for Complex Logic
- Use Ladder for discrete logic and interlocks
- Use Script for complex math, loops, and data manipulation
- Combine both in the same project for optimal code structure

### 7.3 Utilize Machine Operation Recorder
- Configure the recorder to capture critical data points
- Review recorder data after any unexpected shutdown
- Use waveform data to identify trends and predict failures

### 7.4 Modularize with Function Blocks
- Create reusable FBs for common tasks (valve control, motor control, etc.)
- Improves code maintainability and reduces errors

## 8. Common Pitfalls

### 8.1 Forgetting to Initialize Variables
- Variables may contain unpredictable values on first scan
- Always initialize critical variables explicitly

### 8.2 Script Syntax Errors
- Script is case-insensitive but requires proper syntax
- Use `DIM` to declare variables before use
- End loops and conditionals properly (`NEXT`, `END IF`)

### 8.3 Overloading the Scan Cycle
- Avoid excessive script calculations in every scan
- Use timers or event-driven execution for heavy processing

---
**References:**
- KV Series User's Manual
- KV Studio Programming Manual
- KV-8000 Series Script Programming Manual