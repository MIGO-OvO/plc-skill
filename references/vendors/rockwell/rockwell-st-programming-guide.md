# Rockwell / Allen-Bradley Structured Text (ST) Programming Guide

This document provides specific guidance for writing Structured Text programs in Studio 5000 Logix Designer for Logix 5000 controllers.

## 1. ST Language Basics in Logix Designer

### 1.1 Statement Termination
**Rule:** Every statement must end with a semicolon (`;`).

```st
MotorSpeed := 1500;
PumpRunning := TRUE;
```

### 1.2 Assignment Operator
Use `:=` for assignment (not `=`).

```st
Result := InputA + InputB;
```

### 1.3 Comments
- Single-line comment: `// This is a comment`
- Multi-line comment: `(* This is a multi-line comment *)`

```st
// Calculate average temperature
AverageTemp := (Temp1 + Temp2 + Temp3) / 3;

(* 
   This section handles the startup sequence
   for the main conveyor system
*)
```

## 2. Data Types and Operators

### 2.1 Supported Data Types
- **BOOL**: Boolean (TRUE/FALSE)
- **SINT**: 8-bit signed integer (-128 to 127)
- **INT**: 16-bit signed integer (-32,768 to 32,767)
- **DINT**: 32-bit signed integer (-2,147,483,648 to 2,147,483,647)
- **LINT**: 64-bit signed integer (CompactLogix 5380, ControlLogix 5580 only)
- **REAL**: 32-bit floating point
- **LREAL**: 64-bit floating point (CompactLogix 5380, ControlLogix 5580 only)
- **STRING**: Character string (CompactLogix 5380, ControlLogix 5580 only)

### 2.2 Arithmetic Operators
- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `MOD` Modulo (remainder)
- `**` Exponentiation (e.g., `X ** 2` is X squared)

### 2.3 Comparison Operators
- `=` Equal
- `<>` Not equal
- `<` Less than
- `>` Greater than
- `<=` Less than or equal
- `>=` Greater than or equal

### 2.4 Logical Operators
- `AND` or `&` Logical AND
- `OR` Logical OR
- `XOR` Exclusive OR
- `NOT` Logical NOT

**Precedence (highest to lowest):**
1. `NOT`
2. `AND`, `&`
3. `XOR`
4. `OR`

## 3. Control Structures

### 3.1 IF Statement
```st
IF Temperature > HighLimit THEN
    AlarmHigh := TRUE;
    CoolingValve := TRUE;
ELSIF Temperature < LowLimit THEN
    AlarmLow := TRUE;
    HeatingValve := TRUE;
ELSE
    AlarmHigh := FALSE;
    AlarmLow := FALSE;
END_IF;
```

**Rule:** Always close with `END_IF;`

### 3.2 CASE Statement
```st
CASE MachineState OF
    0:  // Idle
        MotorRunning := FALSE;
        ConveyorSpeed := 0;
    1:  // Starting
        MotorRunning := TRUE;
        ConveyorSpeed := StartSpeed;
    2:  // Running
        ConveyorSpeed := NormalSpeed;
    3:  // Stopping
        MotorRunning := FALSE;
        ConveyorSpeed := 0;
ELSE
    // Fault state
    FaultAlarm := TRUE;
    MotorRunning := FALSE;
END_CASE;
```

**Rule:** Use `CASE` for state machines and mode selection. More readable than nested IF statements.

### 3.3 FOR Loop
```st
FOR Index := 0 TO 99 BY 1 DO
    ArraySum := ArraySum + DataArray[Index];
END_FOR;
```

**Rules:**
- Loop variable must be declared (typically DINT)
- `BY` step is optional (default is 1)
- Loop executes from start TO end value inclusive
- **Caution:** Ensure the loop will not exceed the controller's watchdog timer. For large arrays, consider breaking the loop across multiple scans.

### 3.4 WHILE Loop
```st
Index := 0;
WHILE (Index < MaxCount) AND (NOT StopCondition) DO
    ProcessData[Index] := ProcessData[Index] * ScaleFactor;
    Index := Index + 1;
END_WHILE;
```

**Rule:** Ensure the loop condition will eventually become FALSE. Infinite loops cause a watchdog fault.

### 3.5 REPEAT...UNTIL Loop
```st
Position := -1;
REPEAT
    Position := Position + 2;
UNTIL (Position = 101) OR (StructArray[Position].Value = TargetValue)
END_REPEAT;
```

**Rule:** The loop body executes at least once before checking the condition.

## 4. Function and Add-On Instruction Calls

### 4.1 Calling a Function
Functions can be used in expressions or called as statements.

**In an expression:**
```st
Result := SQRT(InputValue);
```

**As a statement:**
```st
MOVE(Source := InputTag, Dest := OutputTag);
```

### 4.2 Calling an Add-On Instruction (AOI)
AOIs require an instance tag.

```st
// Declare instance in tag database:
// MyMotor : MotorControl_AOI

// Call the AOI:
MyMotor(
    StartCmd := StartButton,
    StopCmd := StopButton,
    SpeedSetpoint := DesiredSpeed,
    Running => MotorStatus,
    Fault => MotorFault
);
```

**Rules:**
- Use `:=` for inputs
- Use `=>` for outputs
- InOut parameters are passed by reference

## 5. Array and Structure Access

### 5.1 Array Indexing
Arrays are zero-indexed.

```st
FirstElement := MyArray[0];
LastElement := MyArray[99];
```

**Rule:** Always validate array indices to prevent major faults.

```st
IF Index >= 0 AND Index < 100 THEN
    Value := MyArray[Index];
ELSE
    FaultFlag := TRUE;
END_IF;
```

### 5.2 Structure (UDT) Member Access
Use dot notation to access structure members.

```st
Motor1.Speed := 1500;
Motor1.Running := TRUE;

IF Motor1.Fault THEN
    AlarmActive := TRUE;
END_IF;
```

## 6. Best Practices

### 6.1 Use Meaningful Variable Names
```st
// Bad:
x := y + z;

// Good:
TotalFlow := InletFlow + ReturnFlow;
```

### 6.2 Initialize Variables
Static variables retain their values between scans. Initialize them on first scan or in a startup routine.

```st
IF FirstScan THEN
    Counter := 0;
    MachineState := 0;
    AlarmActive := FALSE;
END_IF;
```

### 6.3 Avoid Magic Numbers
Use named constants or tags instead of hardcoded values.

```st
// Bad:
IF Speed > 3000 THEN

// Good:
IF Speed > MAX_SPEED THEN
```

### 6.4 Limit Loop Iterations
Large loops can exceed the task watchdog timer. Break long operations across multiple scans if necessary.

```st
// Process 10 items per scan
FOR i := StartIndex TO (StartIndex + 9) DO
    IF i < ArraySize THEN
        ProcessItem(MyArray[i]);
    END_IF;
END_FOR;
StartIndex := StartIndex + 10;
IF StartIndex >= ArraySize THEN
    StartIndex := 0;
END_IF;
```

### 6.5 Comment Complex Logic
```st
// Calculate weighted average based on sensor reliability
WeightedSum := (Sensor1 * Reliability1) + (Sensor2 * Reliability2) + (Sensor3 * Reliability3);
TotalWeight := Reliability1 + Reliability2 + Reliability3;
IF TotalWeight > 0 THEN
    AverageValue := WeightedSum / TotalWeight;
ELSE
    AverageValue := 0;  // No reliable sensors
END_IF;
```

## 7. Common Pitfalls

### 7.1 Assignment vs. Comparison
- Assignment: `:=`
- Comparison: `=`

```st
// Wrong:
IF MotorSpeed := 1500 THEN  // This is an assignment, not a comparison!

// Correct:
IF MotorSpeed = 1500 THEN
```

### 7.2 Forgetting Semicolons
Every statement must end with `;`. Missing semicolons cause syntax errors.

### 7.3 Uninitialized Variables
Variables may contain unpredictable values after a controller power cycle. Always initialize critical variables.

### 7.4 Array Out of Bounds
Accessing an array element outside its declared range causes a major fault and stops the controller.

### 7.5 Watchdog Faults from Long Loops
If a loop takes too long, the task watchdog timer expires and the controller faults. Keep loops short or break them across scans.

## 8. Math Status Flags

Logix 5000 controllers maintain math status flags that can be checked after arithmetic operations:

- **S:V (Overflow)**: Set if an operation overflows
- **S:Z (Zero)**: Set if the result is zero
- **S:N (Negative)**: Set if the result is negative
- **S:C (Carry)**: Set if a carry or borrow occurs

**Example:**
```st
Result := ValueA + ValueB;
IF S:V THEN
    OverflowAlarm := TRUE;
END_IF;
```

---
**References:**
- Logix 5000 Controllers Structured Text (1756-PM007)
- Logix 5000 Controllers General Instructions (1756-RM003)
- IEC 61131-3 Structured Text standard