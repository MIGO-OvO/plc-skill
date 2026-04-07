# Motor Start/Stop FB Example

## User prompt

"Write a motor start/stop block in SCL for a Siemens S7-1200. It needs a manual/auto mode, interlocks, and a reset."

## Expected skill behavior

The agent should generate a proper `FUNCTION_BLOCK` that follows Siemens standard practices, demonstrating proper separation of run logic, permissives, and output ownership.

**Expected Code Pattern:**
```iecst
FUNCTION_BLOCK "MotorControl"
{ S7_Optimized_Access := 'TRUE' }
VERSION : 0.1
   VAR_INPUT 
      startCmd : Bool;   // Start command
      stopCmd : Bool;    // Stop command
      autoMode : Bool;   // Auto mode active
      interlock : Bool;  // Safety/permissive interlocks
      resetFault : Bool; // Reset command
   END_VAR

   VAR_OUTPUT 
      runCmd : Bool;     // Motor run command
      faulted : Bool;    // Motor is faulted
   END_VAR

   VAR 
      runRequest : Bool; // Internal state memory
   END_VAR

BEGIN
   // Fault Logic (Evaluated first)
   IF NOT #interlock THEN
      #faulted := TRUE;
      #runRequest := FALSE;
   ELSIF #resetFault THEN
      #faulted := FALSE;
   END_IF;

   // Start/Stop Logic
   IF #autoMode THEN
      // Auto logic handling
      #runRequest := #startCmd AND NOT #stopCmd AND NOT #faulted;
   ELSE
      // Manual logic handling
      IF #startCmd THEN
         #runRequest := TRUE;
      ELSIF #stopCmd OR #faulted THEN
         #runRequest := FALSE;
      END_IF;
   END_IF;

   // Assign to Output (Single point of ownership)
   #runCmd := #runRequest;
END_FUNCTION_BLOCK
```

- Suggest instantiating via an instance DB (e.g., `"MotorControl_DB"(startCmd := ...);`).
- Use PascalCase or camelCase appropriately for variables.
- Use Siemens local variable prefix `#` and global tag quotes `""`.

## Why this example matters

This is a common task that requires strict adherence to standard Siemens SCL syntax, proper block interface structure (`VAR_INPUT`, etc.), correct local variable scoping (`#`), and robust industrial logic patterns (evaluating faults first, single point of output ownership).