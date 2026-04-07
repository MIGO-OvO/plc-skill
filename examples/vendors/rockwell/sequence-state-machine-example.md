# Sequence State Machine Example

## User prompt

"I need a sequence state machine in Studio 5000 Structured Text for a cleaning cycle. It should have states for IDLE, FILLING, WASHING, DRAINING, and DONE. Show me how to structure the CASE statement and handle the state transitions."

## Expected skill behavior

- Implement a `CASE` statement using a `DINT` tag for the state machine tracking (e.g., `State_Current` as a DINT).
- Provide a robust way to map the states to constants for readability, as older Rockwell processors do not have native enum types (e.g., `STATE_IDLE := 0`, `STATE_FILLING := 10`).
- Clearly separate the state transition logic (inside the `CASE` statement) from the output generation logic (outside the `CASE` statement) to follow the scan cycle and output ownership principles.
- Use standard Logix timer structures (e.g., `Timer_Wash.TimerEnable`, `.DN`) for time-based transitions.
- Ensure output tags are written to in only one place in the routine to avoid multiple destructive writes (multiple-coil syndrome).

**Expected Code Pattern:**
```iecst
// 1. Evaluate Transitions
CASE State_Current OF
    STATE_IDLE: // 0
        IF StartCmd AND NOT Faulted THEN
            State_Current := STATE_FILLING;
        END_IF;
        
    STATE_FILLING: // 10
        IF Sensor_HighLevel THEN
            State_Current := STATE_WASHING;
        END_IF;
        
    STATE_WASHING: // 20
        Timer_Wash.TimerEnable := 1;
        IF Timer_Wash.DN THEN
            State_Current := STATE_DRAINING;
        END_IF;
        
    STATE_DRAINING: // 30
        IF Sensor_LowLevel THEN
            State_Current := STATE_DONE;
        END_IF;
        
    STATE_DONE: // 40
        IF NOT StartCmd THEN
            State_Current := STATE_IDLE;
        END_IF;
        
    ELSE
        State_Current := STATE_IDLE;
END_CASE;

// Manage Timers
Timer_Wash(TimerEnable := (State_Current = STATE_WASHING), PRE := 30000);

// 2. Assign Outputs (Single point of ownership)
Valve_Fill := (State_Current = STATE_FILLING);
Pump_Wash := (State_Current = STATE_WASHING);
Valve_Drain := (State_Current = STATE_DRAINING);
Seq_Done := (State_Current = STATE_DONE);
```

## Why this example matters

State machines are common, but implementing them cleanly in Rockwell ST requires specific data types (`DINT` for states), Rockwell timer invocation patterns, and strict adherence to output ownership rules to ensure the logic remains predictable and debuggable online.