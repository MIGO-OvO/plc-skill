---
trigger: "one-shot logic", "pulse on rising edge", "pulse on falling edge", "detect state changes", "edge detection", "transition"
use-case: "Triggering an action or evaluating logic exactly once during the specific PLC scan when a discrete signal transitions between FALSE and TRUE."
requirements: "IEC 61131-3 standard environment. Standard library support is required only if using standard R_TRIG/F_TRIG blocks."
---

# Edge Detection (One-Shot) Patterns

Edge detection, often referred to as "one-shot" logic, is fundamental in PLC programming. It ensures an event triggers exactly once per state transition, regardless of how long the input signal remains active. 

This template demonstrates how to manually evaluate edge transitions using historical state bits, as well as how to implement standard IEC 61131-3 edge detection function blocks.

## 1. Manual Edge Detection (Rising and Falling)

Manual edge detection evaluates the current state of an input against its state during the previous PLC scan cycle.

### Variable Declaration
```iecst
VAR
    xInputSignal : BOOL;    // The signal to monitor
    xLastState   : BOOL;    // Memory bit to store the signal's state from the previous scan
    
    xRisingEdge  : BOOL;    // Pulses TRUE for one scan when signal goes FALSE -> TRUE
    xFallingEdge : BOOL;    // Pulses TRUE for one scan when signal goes TRUE -> FALSE
END_VAR
```

### Implementation Logic
```iecst
// 1. Detect Rising Edge (Current state is TRUE, previous state was FALSE)
xRisingEdge := xInputSignal AND NOT xLastState;

// 2. Detect Falling Edge (Current state is FALSE, previous state was TRUE)
xFallingEdge := NOT xInputSignal AND xLastState;

// 3. Update the memory bit for the next scan cycle
// CRITICAL: This must be done AFTER the edge evaluations
xLastState := xInputSignal;
```

---

## 2. Standard IEC `R_TRIG` and `F_TRIG` Blocks

Most IEC 61131-3 compliant environments include standard function blocks for edge detection (`R_TRIG` for Rising Edge, `F_TRIG` for Falling Edge). Using these is generally preferred for readability and standardization unless you are writing highly optimized or low-level custom libraries.

### Variable Declaration
```iecst
VAR
    xInputSignal  : BOOL;           // The signal to monitor
    
    fbRisingEdge  : R_TRIG;         // Standard rising edge instance
    fbFallingEdge : F_TRIG;         // Standard falling edge instance
    
    xPulseOnRise  : BOOL;           // Output pulse
    xPulseOnFall  : BOOL;           // Output pulse
END_VAR
```

### Implementation Logic
```iecst
// Evaluate Rising Edge
fbRisingEdge(CLK := xInputSignal);
xPulseOnRise := fbRisingEdge.Q;

// Evaluate Falling Edge
fbFallingEdge(CLK := xInputSignal);
xPulseOnFall := fbFallingEdge.Q;

// Note: It is also common to use the function blocks inline:
// fbRisingEdge(CLK := xInputSignal);
// IF fbRisingEdge.Q THEN
//     // Execute one-shot logic here
// END_IF;
```

---

## 3. Critical Engineering Concept: Memory Scope (`VAR` vs `VAR_TEMP`)

When implementing manual edge detection (or instantiating standard function blocks), the memory used to track previous states (`xLastState` or the `fbRisingEdge` instance itself) **MUST be declared in static/instance memory (`VAR`) and NEVER in temporary memory (`VAR_TEMP`)**.

### Why `VAR` (Static/Instance Memory) is Required:
Edge detection inherently relies on "remembering" what happened in the past. Variables declared under standard `VAR` (or `VAR_GLOBAL`, `VAR_IN_OUT`, `VAR_OUTPUT`) retain their values across multiple PLC scan cycles. This allows the PLC to accurately compare the input's state *right now* with its state *one scan ago*.

### Why `VAR_TEMP` (Temporary Memory) will Fail:
Variables declared in `VAR_TEMP` are allocated on the local stack. They are re-initialized (or simply contain undefined/garbage data) at the beginning of every single Program or Function Block execution. 
If you use a temporary variable for `xLastState`:
1. It will lose the previous scan's state data as soon as the POU finishes executing.
2. On the next scan, it will evaluate against a default or random value (usually FALSE).
3. As a result, the edge detection will either constantly fire whenever the input is TRUE or fail to fire completely, causing unpredictable and dangerous logic failures.