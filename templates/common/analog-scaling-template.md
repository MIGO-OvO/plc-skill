# Analog scaling template

## Purpose

Use for converting raw analog input values (e.g., from an ADC or fieldbus module) into meaningful engineering units (e.g., temperature, pressure, level) while applying fault detection for under-range, over-range, and wire breaks.

## Suitable for

- 4-20mA sensor conversion
- 0-10V sensor conversion
- RTD/Thermocouple raw value scaling
- VFD speed reference scaling
- Any linear interpolation requirement

## Suggested structure

- Define configuration UDT (limits, thresholds)
- Define status UDT (scaled value, fault flags)
- Check raw input against under-range/wire-break thresholds
- Check raw input against over-range/short-circuit thresholds
- Perform linear scaling calculation
- Clamp scaled output to engineering limits
- Set appropriate status and fault flags

## UDT definitions

```st
TYPE stAnalog_Config :
STRUCT
    rRawMin       : REAL; // Minimum raw input value (e.g., 4000 for 4mA)
    rRawMax       : REAL; // Maximum raw input value (e.g., 20000 for 20mA)
    rEuMin        : REAL; // Minimum engineering unit value (e.g., 0.0)
    rEuMax        : REAL; // Maximum engineering unit value (e.g., 100.0)
    rUnderRange   : REAL; // Threshold for wire break / under-range
    rOverRange    : REAL; // Threshold for short circuit / over-range
END_STRUCT
END_TYPE

TYPE stAnalog_Status :
STRUCT
    rScaledValue  : REAL; // The resulting engineering unit value
    bValid        : BOOL; // TRUE if input is within valid range
    bUnderRange   : BOOL; // TRUE if raw input < under-range threshold
    bOverRange    : BOOL; // TRUE if raw input > over-range threshold
    bError        : BOOL; // TRUE if any fault is active
END_STRUCT
END_TYPE
```

## ST skeleton

```st
FUNCTION_BLOCK FB_AnalogScaling
VAR_INPUT
    rRawInput : REAL;
    stConfig  : stAnalog_Config;
END_VAR
VAR_OUTPUT
    stStatus  : stAnalog_Status;
END_VAR
VAR
    rNumerator   : REAL;
    rDenominator : REAL;
    rUnclamped   : REAL;
END_VAR

// 1. Fault Detection
stStatus.bUnderRange := (rRawInput < stConfig.rUnderRange);
stStatus.bOverRange  := (rRawInput > stConfig.rOverRange);
stStatus.bError      := stStatus.bUnderRange OR stStatus.bOverRange;
stStatus.bValid      := NOT stStatus.bError;

// 2. Prevent Divide by Zero
rDenominator := stConfig.rRawMax - stConfig.rRawMin;
IF ABS(rDenominator) < 0.00001 THEN
    // Invalid configuration, hold last value or set to safe state
    stStatus.bError := TRUE;
    stStatus.bValid := FALSE;
    RETURN;
END_IF;

// 3. Linear Scaling: Scaled = ((Raw - RawMin) * (EuMax - EuMin) / (RawMax - RawMin)) + EuMin
rNumerator := (rRawInput - stConfig.rRawMin) * (stConfig.rEuMax - stConfig.rEuMin);
rUnclamped := (rNumerator / rDenominator) + stConfig.rEuMin;

// 4. Clamping
IF rUnclamped > stConfig.rEuMax THEN
    stStatus.rScaledValue := stConfig.rEuMax;
ELSIF rUnclamped < stConfig.rEuMin THEN
    stStatus.rScaledValue := stConfig.rEuMin;
ELSE
    stStatus.rScaledValue := rUnclamped;
END_IF;
```

## Notes

- **Wire Break**: A 4-20mA sensor reading 0mA (or below the 4mA threshold) indicates a wire break.
- **Clamping**: Always clamp the final output. If an operator sets a high alarm limit of 100.0, an unclamped value of 100.1 might cause nuisance alarms if the raw value drifts slightly above the maximum.
- **Filtering**: Consider adding a first-order lag filter (low-pass filter) *after* scaling if the sensor signal is noisy.
- **Vendor Specifics**: Some vendors provide built-in scaling instructions (e.g., NORM_X/SCALE_X in Siemens, SCL in Rockwell). This template is useful for platforms without those, or when a standardized, custom wrapper is preferred.
