# Sequence State Machine Example

## User prompt

"Create a sequence state machine using TIA Portal SCL for an assembly station. It has 3 steps: Home, Move forward, and Return."

## Expected skill behavior

The agent should implement a state machine following proper scan-cycle principles: evaluating step transitions first, then updating outputs conditionally at the end of the scan.

**Expected Code Pattern:**
```iecst
FUNCTION_BLOCK "AssemblySequence"
{ S7_Optimized_Access := 'TRUE' }
VERSION : 0.1
   VAR_INPUT 
      startSequence : Bool;
      sensorHome : Bool;
      sensorExtended : Bool;
   END_VAR

   VAR_OUTPUT 
      moveForward : Bool;
      moveBackward : Bool;
      sequenceDone : Bool;
   END_VAR

   VAR 
      stepNum : Int := 0; // State machine step
   END_VAR

   VAR_CONSTANT 
      STEP_INIT : Int := 0;
      STEP_MOVE_FWD : Int := 10;
      STEP_RETURN : Int := 20;
      STEP_DONE : Int := 30;
   END_VAR

BEGIN
   // 1. Evaluate Transitions
   CASE #stepNum OF
      #STEP_INIT:
         IF #startSequence AND #sensorHome THEN
            #stepNum := #STEP_MOVE_FWD;
         END_IF;
         
      #STEP_MOVE_FWD:
         IF #sensorExtended THEN
            #stepNum := #STEP_RETURN;
         END_IF;
         
      #STEP_RETURN:
         IF #sensorHome THEN
            #stepNum := #STEP_DONE;
         END_IF;
         
      #STEP_DONE:
         IF NOT #startSequence THEN
            #stepNum := #STEP_INIT;
         END_IF;
         
      ELSE
         #stepNum := #STEP_INIT; // Fallback
   END_CASE;

   // 2. Evaluate Outputs (Output Ownership - End of scan)
   #moveForward := (#stepNum = #STEP_MOVE_FWD);
   #moveBackward := (#stepNum = #STEP_RETURN);
   #sequenceDone := (#stepNum = #STEP_DONE);

END_FUNCTION_BLOCK
```

## Why this example matters

Enforces the core principle of output ownership by ensuring state transitions are calculated before outputs, avoiding mid-scan execution glitches. It demonstrates standard Siemens SCL `CASE` syntax, local scope access `#`, and the use of named constants (`VAR_CONSTANT`) for step numbers instead of magic numbers.