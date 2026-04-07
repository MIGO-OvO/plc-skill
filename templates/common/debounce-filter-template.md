---
trigger: "input filtering", "debouncing a button", "smoothing analog noise", "signal conditioning"
use-case: "Removing transient noise or switch bounce from digital inputs, or smoothing noisy analog signals using a first-order lag (exponential smoothing) filter."
requirements: "IEC 61131-3 standard environment. Standard library TON timer support required for digital debounce."
---

# Debounce and Filter Template

## Part 1: Digital Debounce FB

### Purpose

Delays the recognition of a digital state change until the input signal has remained stable for a predefined time duration. It applies both turn-on and turn-off delays using `TON` (Timer On Delay) instances to ensure the signal is completely settled.

### ST Implementation

```iecst
FUNCTION_BLOCK FB_DigitalDebounce
VAR_INPUT
    bIn         : BOOL;      // Raw digital input signal
    tDelayOn    : TIME;      // Time input must be continuous TRUE to set output TRUE
    tDelayOff   : TIME;      // Time input must be continuous FALSE to set output FALSE
END_VAR

VAR_OUTPUT
    bOut        : BOOL;      // Debounced digital output signal
END_VAR

VAR
    fbTimerOn   : TON;       // Timer for rising edge (TRUE) debounce
    fbTimerOff  : TON;       // Timer for falling edge (FALSE) debounce
END_VAR

// --- Logic ---
// Run timer for the TRUE state
fbTimerOn(IN := bIn, PT := tDelayOn);

// Run timer for the FALSE state
fbTimerOff(IN := NOT bIn, PT := tDelayOff);

// State change logic based on timers completing
IF fbTimerOn.Q THEN
    bOut := TRUE;
ELSIF fbTimerOff.Q THEN
    bOut := FALSE;
END_IF;
```

---

## Part 2: Analog First-Order Filter FB

### Purpose

Applies a low-pass first-order lag (exponential smoothing) filter to an analog input to eliminate high-frequency noise. 
The mathematical formula applied is: `Out = Out + FilterFactor * (NewIn - Out)`.

### ST Implementation

```iecst
FUNCTION_BLOCK FB_AnalogFilter
VAR_INPUT
    rIn             : REAL;      // Raw analog input signal
    rFilterFactor   : REAL;      // Smoothing factor (0.0 to 1.0). 1.0 = no filtering, closer to 0.0 = heavier filtering
    bInitialize     : BOOL;      // Trigger to initialize the output immediately (e.g., system startup)
END_VAR

VAR_OUTPUT
    rOut            : REAL;      // Filtered analog output signal
END_VAR

VAR
    bIsInitialized  : BOOL;      // Internal flag tracking if the output has been preloaded
    rSafeFactor     : REAL;      // Clamped internal factor to prevent math errors
END_VAR

// --- Logic ---
// Clamp filter factor to valid range [0.0, 1.0] to ensure filter stability
IF rFilterFactor < 0.0 THEN
    rSafeFactor := 0.0;
ELSIF rFilterFactor > 1.0 THEN
    rSafeFactor := 1.0;
ELSE
    rSafeFactor := rFilterFactor;
END_IF;

// Initialization: Snap the output directly to the input on the first execution or forced trigger
IF bInitialize OR NOT bIsInitialized THEN
    rOut := rIn;
    bIsInitialized := TRUE;
ELSE
    // Apply first-order lag (exponential smoothing) filter equation
    rOut := rOut + rSafeFactor * (rIn - rOut);
END_IF;
```

## Notes

- **Digital Debounce**: Ensure the timer blocks (`TON`) are called consistently in every task cycle to maintain accurate timing.
- **Analog Filter**: The `rFilterFactor` algorithm relies on a relatively stable program scan time. For systems with highly variable scan times, a time-based calculation incorporating task delta time is recommended instead of a static factor.
- **Initialization**: Always utilize the initialization path (`bInitialize`) for analog filters to prevent the output from slowly ramping up from zero upon PLC start/restart, which could trigger false low alarms.