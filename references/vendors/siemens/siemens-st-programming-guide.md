# Siemens S7-1200 / S7-1500 Structured Text (ST) Programming Guide

This document provides specific guidance for writing Structured Text (ST) programs in TIA Portal for S7-1200 and S7-1500 controllers.

## 1. ST Language Basics in TIA Portal

### 1.1 Supported ST Features
TIA Portal implements IEC 61131-3 Structured Text with Siemens-specific extensions.

**Core features:**
- Assignment statements: `:=`
- Conditional statements: `IF...THEN...ELSIF...ELSE...END_IF`
- Loop statements: `FOR...TO...BY...DO...END_FOR`, `WHILE...DO...END_WHILE`, `REPEAT...UNTIL...END_REPEAT`
- Case statements: `CASE...OF...ELSE...END_CASE`
- Function and function block calls
- Direct bit and byte access

### 1.2 Statement Termination
**Rule:** Every statement must end with a semicolon (`;`).

```st
motorSpeed := 1500;
IF startButton THEN
    motorRunning := TRUE;
END_IF;
```

## 2. Variable Declaration and Scope

### 2.1 Interface Sections
In an FB or FC, variables are declared in specific sections:

**FB Interface Sections:**
- `VAR_INPUT`: Input parameters (read-only within the block)
- `VAR_OUTPUT`: Output parameters (written by the block)
- `VAR_IN_OUT`: In/Out parameters (passed by reference, can be read and written)
- `VAR`: Static variables (retain values between cycles)
- `VAR_TEMP`: Temporary variables (reset each cycle)
- `VAR CONSTANT`: Block-local constants

**FC Interface Sections:**
- `VAR_INPUT`, `VAR_OUTPUT`, `VAR_IN_OUT`, `VAR_TEMP`, `VAR CONSTANT`
- FCs do not have `VAR` (static) section because they have no persistent memory

### 2.2 Declaration Syntax
```st
VAR_INPUT
    enable : BOOL;
    setpoint : REAL;
END_VAR

VAR_OUTPUT
    done : BOOL;
    actualValue : REAL;
END_VAR

VAR
    statCounter : INT;
    statTimer : TON;  // Multi-instance timer
END_VAR

VAR_TEMP
    tempIndex : INT;
END_VAR
```

## 3. Operators and Expressions

### 3.1 Arithmetic Operators
- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `MOD` Modulo (remainder)

**Rule:** Use parentheses to clarify precedence when mixing operators.

```st
result := (a + b) * c / d;
```

### 3.2 Comparison Operators
- `=` Equal
- `<>` Not equal
- `<` Less than
- `>` Greater than
- `<=` Less than or equal
- `>=` Greater than or equal

### 3.3 Logical Operators
- `AND` or `&` Logical AND
- `OR` Logical OR
- `XOR` Exclusive OR
- `NOT` Logical NOT

**Precedence (highest to lowest):**
1. `NOT`
2. `AND`, `&`
3. `XOR`
4. `OR`

**Rule:** Use parentheses to make complex boolean expressions readable.

```st
IF (sensor1 AND sensor2) OR (manualOverride AND NOT emergencyStop) THEN
    // Action
END_IF;
```

## 4. Control Structures

### 4.1 IF Statement
```st
IF condition1 THEN
    // Statements
ELSIF condition2 THEN
    // Statements
ELSE
    // Statements
END_IF;
```

**Rule:** Always close with `END_IF;`

### 4.2 CASE Statement
```st
CASE machineState OF
    0:  // Idle
        motorRunning := FALSE;
    1:  // Starting
        motorRunning := TRUE;
        speed := startSpeed;
    2:  // Running
        speed := normalSpeed;
    3:  // Stopping
        motorRunning := FALSE;
ELSE
    // Default case
    alarm := TRUE;
END_CASE;
```

**Rule:** Use `CASE` when you have multiple discrete states or modes. It is more readable than nested `IF...ELSIF` chains.

### 4.3 FOR Loop
```st
FOR i := 1 TO 10 BY 1 DO
    arraySum := arraySum + dataArray[i];
END_FOR;
```

**Rules:**
- Loop variable must be declared (typically in `VAR_TEMP`)
- `BY` step is optional (default is 1)
- Loop executes from start value TO end value inclusive

### 4.4 WHILE Loop
```st
WHILE counter < maxCount AND NOT stopCondition DO
    counter := counter + 1;
    // Process
END_WHILE;
```

**Rule:** Ensure the loop condition will eventually become FALSE to avoid infinite loops.

### 4.5 REPEAT...UNTIL Loop
```st
REPEAT
    counter := counter + 1;
    // Process
UNTIL counter >= maxCount OR stopCondition
END_REPEAT;
```

**Rule:** The loop body executes at least once before checking the condition.

## 5. Function and Function Block Calls

### 5.1 Calling a Function (FC)
Functions return a single value and can be used in expressions.

```st
result := MyFunction(input1 := value1, input2 := value2);
```

Or assign outputs explicitly:
```st
MyFunction(
    input1 := value1,
    input2 := value2,
    output1 => resultVar
);
```

### 5.2 Calling a Function Block (FB)
FBs must be instantiated. Call syntax:

```st
instMotor(
    enable := startButton,
    speed := setSpeed,
    running => motorStatus
);
```

**Rules:**
- Use `:=` for inputs
- Use `=>` for outputs
- The instance (`instMotor`) must be declared in the `VAR` section as a multi-instance

### 5.3 IEC Timer Example
```st
VAR
    statTimer : TON;  // Declare timer as multi-instance
END_VAR

// In code:
statTimer(
    IN := startSignal,
    PT := T#5s
);

IF statTimer.Q THEN
    // Timer elapsed
    outputSignal := TRUE;
END_IF;
```

## 6. Data Access and Addressing

### 6.1 Symbolic Addressing (Recommended)
Always use symbolic names for tags and DB variables.

```st
motorSpeed := processData.speedSetpoint;
```

### 6.2 Absolute Addressing (Avoid in New Projects)
Only use absolute addressing when interfacing with legacy systems.

```st
// Not recommended:
"DataBlock1".DBW10 := 100;
```

### 6.3 Bit Access
Access individual bits of a byte or word:

```st
statusByte.%X0 := TRUE;  // Set bit 0
IF controlWord.%X5 THEN  // Check bit 5
    // Action
END_IF;
```

## 7. Best Practices for ST in TIA Portal

### 7.1 Code Readability
- **Indent nested structures** (IF, FOR, WHILE, CASE) for clarity
- **Use blank lines** to separate logical sections
- **Add comments** to explain non-obvious logic

```st
// Calculate average speed over last 10 samples
tempSum := 0;
FOR i := 1 TO 10 DO
    tempSum := tempSum + speedSamples[i];
END_FOR;
averageSpeed := tempSum / 10;
```

### 7.2 Avoid Deep Nesting
If you have more than 3 levels of nested IF statements, consider refactoring into separate FBs or using CASE statements.

### 7.3 Use Meaningful Variable Names
```st
// Bad:
x := y + z;

// Good:
totalFlow := inletFlow + returnFlow;
```

### 7.4 Initialize Variables
Always initialize static variables in the first scan or in a startup OB (e.g., `OB100`).

```st
IF firstScan THEN
    statCounter := 0;
    statMode := 0;
END_IF;
```

### 7.5 Avoid Magic Numbers
Use named constants instead of hardcoded values.

```st
VAR CONSTANT
    MAX_SPEED : INT := 3000;
    MIN_SPEED : INT := 500;
END_VAR

IF currentSpeed > MAX_SPEED THEN
    currentSpeed := MAX_SPEED;
END_IF;
```

## 8. Common Pitfalls

### 8.1 Assignment vs. Comparison
- Assignment: `:=`
- Comparison: `=`

```st
// Wrong:
IF motorSpeed := 1500 THEN  // This is an assignment, not a comparison!

// Correct:
IF motorSpeed = 1500 THEN
```

### 8.2 Forgetting Semicolons
Every statement must end with `;`. Missing semicolons cause syntax errors.

### 8.3 Uninitialized Variables
Static variables retain their last value. If you don't initialize them, they may start with unpredictable values on the first cycle after a cold start.

### 8.4 Infinite Loops
Be careful with WHILE and REPEAT loops. Ensure the exit condition will eventually be met, or use a safety counter.

```st
safetyCounter := 0;
WHILE condition AND (safetyCounter < 1000) DO
    // Process
    safetyCounter := safetyCounter + 1;
END_WHILE;
```

---
**References:**
- Programming Guideline for S7-1200/1500 (Siemens Entry ID: 81318674)
- IEC 61131-3 Structured Text standard
- TIA Portal online help: Extended Instructions (S7-1200, S7-1500)