# HMI/SCADA Interface Design Patterns

This document defines best practices for designing the communication interface between PLC and HMI/SCADA systems.

## Goal

Create efficient, maintainable, and scalable communication between PLC and HMI/SCADA by:
1. Minimizing communication overhead
2. Organizing data into logical structures
3. Implementing robust handshake mechanisms
4. Standardizing alarm and status reporting

## Core Principles

### 1. Use Structured Data, Not Scattered Variables

**Bad Practice:**
```st
// 50 individual BOOL variables
HMI_Motor1_Start : BOOL;
HMI_Motor1_Stop : BOOL;
HMI_Motor1_Running : BOOL;
HMI_Motor1_Fault : BOOL;
HMI_Motor2_Start : BOOL;
HMI_Motor2_Stop : BOOL;
// ... and so on
```

**Good Practice:**
```st
TYPE MotorHMI_Type
    STRUCT
        // Commands from HMI (Inputs to PLC logic)
        Cmd_Start : BOOL;
        Cmd_Stop : BOOL;
        Cmd_Reset : BOOL;
        Cmd_SpeedSetpoint : REAL;
        
        // Status to HMI (Outputs from PLC logic)
        Sts_Running : BOOL;
        Sts_Fault : BOOL;
        Sts_ActualSpeed : REAL;
        Sts_FaultCode : INT;
    END_STRUCT
END_TYPE

VAR_GLOBAL
    HMI_Motor1 : MotorHMI_Type;
    HMI_Motor2 : MotorHMI_Type;
END_VAR
```

**Benefits:**
- HMI reads/writes one structured block per motor instead of 8+ individual tags
- Easy to replicate for multiple motors
- Clear separation of commands vs. status

## Pattern 1: Bit-Packed Alarms (Efficient Alarm Transmission)

### Problem
Transmitting 100 individual BOOL alarms requires 100 separate read operations or a very large tag list.

### Solution
Pack alarms into WORD or DWORD arrays using bit manipulation.

**Implementation:**
```st
TYPE AlarmBank_Type
    STRUCT
        AlarmWord : ARRAY[0..7] OF WORD;  // 8 words = 128 alarm bits
    END_STRUCT
END_TYPE

VAR_GLOBAL
    HMI_Alarms : AlarmBank_Type;
END_VAR

// In PLC logic:
// Set alarm bit 5 (in word 0)
IF HighTemperatureAlarm THEN
    HMI_Alarms.AlarmWord[0].%X5 := TRUE;  // Codesys/Beckhoff syntax
    // Or: HMI_Alarms.AlarmWord[0] := HMI_Alarms.AlarmWord[0] OR 16#0020;  // Bit 5 = 0x0020
END_IF;

// Clear alarm bit 5
IF TemperatureNormal THEN
    HMI_Alarms.AlarmWord[0].%X5 := FALSE;
END_IF;
```

**HMI Side:**
- Read `HMI_Alarms.AlarmWord[0..7]` as a single block (16 bytes)
- Decode each bit to display individual alarms
- Most HMI software (WinCC, FactoryTalk View, Ignition) supports bit extraction

**Alarm Mapping Table (Document This!):**
```
Word 0:
  Bit 0: Emergency Stop Active
  Bit 1: High Temperature Alarm
  Bit 2: Low Pressure Alarm
  Bit 3: Motor 1 Overload
  Bit 4: Motor 2 Overload
  Bit 5: Conveyor Jam
  ...
Word 1:
  Bit 0: Tank 1 High Level
  ...
```

## Pattern 2: Command/Status Handshake (Reliable Command Execution)

### Problem
HMI sends a command (e.g., "Start Motor"). How does the PLC acknowledge receipt and execution?

### Solution: Toggle-Based Handshake

**Implementation:**
```st
TYPE HMI_Command_Type
    STRUCT
        // From HMI
        Cmd_Execute : BOOL;      // Toggle this to trigger command
        Cmd_Code : INT;          // Command code (1=Start, 2=Stop, 3=Reset, etc.)
        Cmd_Parameter : REAL;    // Optional parameter
        
        // To HMI
        Sts_Done : BOOL;         // Mirrors Cmd_Execute when done
        Sts_Busy : BOOL;         // TRUE while executing
        Sts_Error : BOOL;        // TRUE if command failed
        Sts_ErrorCode : INT;     // Error code if failed
    END_STRUCT
END_TYPE

VAR_GLOBAL
    HMI_Command : HMI_Command_Type;
END_VAR

// PLC Logic (in a dedicated FB or routine):
VAR
    statLastExecute : BOOL := FALSE;
    statExecuting : BOOL := FALSE;
END_VAR

// Detect rising edge of Cmd_Execute (toggle detection)
IF HMI_Command.Cmd_Execute <> statLastExecute THEN
    statLastExecute := HMI_Command.Cmd_Execute;
    statExecuting := TRUE;
    HMI_Command.Sts_Busy := TRUE;
    HMI_Command.Sts_Error := FALSE;
END_IF;

// Execute command
IF statExecuting THEN
    CASE HMI_Command.Cmd_Code OF
        1:  // Start Motor
            IF StartMotor() THEN
                HMI_Command.Sts_Done := HMI_Command.Cmd_Execute;  // Mirror the toggle
                HMI_Command.Sts_Busy := FALSE;
                statExecuting := FALSE;
            END_IF;
        
        2:  // Stop Motor
            IF StopMotor() THEN
                HMI_Command.Sts_Done := HMI_Command.Cmd_Execute;
                HMI_Command.Sts_Busy := FALSE;
                statExecuting := FALSE;
            END_IF;
        
        ELSE
            // Invalid command
            HMI_Command.Sts_Error := TRUE;
            HMI_Command.Sts_ErrorCode := 9999;  // Invalid command code
            HMI_Command.Sts_Done := HMI_Command.Cmd_Execute;
            HMI_Command.Sts_Busy := FALSE;
            statExecuting := FALSE;
    END_CASE;
END_IF;
```

**HMI Side:**
1. Toggle `Cmd_Execute` (FALSE→TRUE or TRUE→FALSE)
2. Set `Cmd_Code` and `Cmd_Parameter`
3. Wait for `Sts_Done` to match `Cmd_Execute`
4. Check `Sts_Error` for success/failure

**Why Toggle Instead of Pulse?**
- Pulse (momentary TRUE) can be missed if HMI and PLC scan cycles don't align
- Toggle is state-based and guaranteed to be detected

## Pattern 3: Heartbeat / Watchdog (Connection Monitoring)

### Problem
How does the PLC know if the HMI is still connected and responsive?

### Solution: Bidirectional Heartbeat

**Implementation:**
```st
TYPE HMI_Heartbeat_Type
    STRUCT
        // From HMI (increments every second)
        HMI_Counter : INT;
        
        // To HMI (increments every second)
        PLC_Counter : INT;
        
        // Status
        HMI_Alive : BOOL;   // TRUE if HMI heartbeat is updating
        PLC_Alive : BOOL;   // TRUE if PLC heartbeat is updating (for HMI to monitor)
    END_STRUCT
END_TYPE

VAR_GLOBAL
    HMI_Heartbeat : HMI_Heartbeat_Type;
END_VAR

// PLC Logic:
VAR
    statTimer : TON;
    statLastHMI_Counter : INT := 0;
    statHMI_Timeout : TON;
END_VAR

// Increment PLC counter every second
statTimer(IN := TRUE, PT := T#1s);
IF statTimer.Q THEN
    statTimer(IN := FALSE);
    HMI_Heartbeat.PLC_Counter := HMI_Heartbeat.PLC_Counter + 1;
    IF HMI_Heartbeat.PLC_Counter > 32000 THEN
        HMI_Heartbeat.PLC_Counter := 0;  // Wrap around
    END_IF;
END_IF;

// Monitor HMI counter
IF HMI_Heartbeat.HMI_Counter <> statLastHMI_Counter THEN
    statLastHMI_Counter := HMI_Heartbeat.HMI_Counter;
    statHMI_Timeout(IN := FALSE);  // Reset timeout
    HMI_Heartbeat.HMI_Alive := TRUE;
ELSE
    statHMI_Timeout(IN := TRUE, PT := T#5s);  // 5-second timeout
    IF statHMI_Timeout.Q THEN
        HMI_Heartbeat.HMI_Alive := FALSE;
        // Optionally: trigger alarm or safe state
    END_IF;
END_IF;
```

**HMI Side:**
- Increment `HMI_Counter` every second
- Monitor `PLC_Counter` to verify PLC is alive
- Display warning if `PLC_Alive` goes FALSE

## Pattern 4: Recipe/Parameter Download (Bulk Data Transfer)

### Problem
HMI needs to send a recipe (e.g., 50 parameters) to the PLC.

### Solution: Staged Transfer with Checksum

**Implementation:**
```st
TYPE Recipe_Type
    STRUCT
        Temperature : ARRAY[0..9] OF REAL;
        Speed : ARRAY[0..9] OF REAL;
        Time : ARRAY[0..9] OF TIME;
        // ... more parameters
    END_STRUCT
END_TYPE

TYPE Recipe_Transfer_Type
    STRUCT
        // From HMI
        Cmd_Download : BOOL;        // Toggle to start download
        Data : Recipe_Type;         // Recipe data
        Checksum : DWORD;           // Simple checksum for validation
        
        // To HMI
        Sts_Ready : BOOL;           // TRUE when PLC is ready to receive
        Sts_Downloaded : BOOL;      // Mirrors Cmd_Download when complete
        Sts_Error : BOOL;
        Sts_ErrorCode : INT;
    END_STRUCT
END_TYPE

VAR_GLOBAL
    HMI_Recipe : Recipe_Transfer_Type;
    ActiveRecipe : Recipe_Type;  // The recipe currently in use
END_VAR

// PLC Logic:
VAR
    statLastDownload : BOOL := FALSE;
    statCalculatedChecksum : DWORD;
END_VAR

HMI_Recipe.Sts_Ready := TRUE;  // Always ready to receive

IF HMI_Recipe.Cmd_Download <> statLastDownload THEN
    statLastDownload := HMI_Recipe.Cmd_Download;
    
    // Calculate checksum (simple sum of all REAL values as DWORD)
    statCalculatedChecksum := CalculateRecipeChecksum(HMI_Recipe.Data);
    
    IF statCalculatedChecksum = HMI_Recipe.Checksum THEN
        // Checksum valid, copy to active recipe
        ActiveRecipe := HMI_Recipe.Data;
        HMI_Recipe.Sts_Downloaded := HMI_Recipe.Cmd_Download;
        HMI_Recipe.Sts_Error := FALSE;
    ELSE
        // Checksum mismatch
        HMI_Recipe.Sts_Error := TRUE;
        HMI_Recipe.Sts_ErrorCode := 1001;  // Checksum error
        HMI_Recipe.Sts_Downloaded := HMI_Recipe.Cmd_Download;
    END_IF;
END_IF;
```

## Best Practices Summary

1. **Group related data into structures** - Reduces communication overhead
2. **Use bit-packing for large alarm lists** - 128 alarms in 16 bytes
3. **Implement handshakes for commands** - Toggle-based is most reliable
4. **Always include heartbeat/watchdog** - Detect communication failures
5. **Validate bulk transfers with checksums** - Prevent corrupted data
6. **Document your interface** - Create a tag mapping table for HMI developers

---
**References:**
- ISA-88 Batch Control (for recipe management patterns)
- PackML (for state-based HMI interfaces)
- OPC UA (for modern structured communication)