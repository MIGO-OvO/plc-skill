---
trigger: "data logging", "historian buffer", "trend buffer", "circular buffer"
use-case: "A reusable circular-buffer skeleton for capturing timestamped process snapshots without unbounded array growth."
requirements: "A PLC environment with arrays, structs, and a periodic sampling trigger."
---

# Data Logging Template

## Purpose

Use this template for bounded in-PLC logging where the newest samples should overwrite the oldest samples in a controlled circular buffer.

## Suitable for

- short fault history
- trend capture around machine events
- bounded process sample storage before HMI or SCADA upload

## Suggested structure

- periodic sample trigger
- log record structure
- ring-buffer write index
- valid sample count

## Skeleton

```iecst
IF bLogSampleTrig THEN
    astLogBuffer[iLogWriteIndex].dtTimestamp := dtNow;
    astLogBuffer[iLogWriteIndex].rPV := rProcessValue;
    astLogBuffer[iLogWriteIndex].rSP := rSetpoint;
    astLogBuffer[iLogWriteIndex].bFault := bFaultActive;

    iLogWriteIndex := iLogWriteIndex + 1;
    IF iLogWriteIndex >= iLogBufferSize THEN
        iLogWriteIndex := 0;
    END_IF;

    IF iLogValidCount < iLogBufferSize THEN
        iLogValidCount := iLogValidCount + 1;
    END_IF;
END_IF;
```

## Notes

- Keep sampling trigger generation separate from the buffer write logic.
- Decide whether buffer overwrite on wrap is acceptable before using this pattern for alarms or compliance records.
- If records are exported to HMI/SCADA, document the ownership of "read pointer" versus "write pointer".
