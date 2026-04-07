# Motor Start/Stop AOI Example

## User prompt

"Write a motor start/stop Add-On Instruction (AOI) in Structured Text for Studio 5000. It needs to handle auto/manual modes, a start request, a stop request, a run feedback timeout, and a fault reset."

## Expected skill behavior

- Define the AOI parameters clearly using Rockwell classifications:
  - **Input Parameters**: `AutoMode` (BOOL), `StartReq` (BOOL), `StopReq` (BOOL), `RunFeedback` (BOOL), `FaultReset` (BOOL).
  - **Output Parameters**: `MotorRunCmd` (BOOL), `Faulted` (BOOL).
  - **Local Tags**: `Timer_Feedback` (TON), `State_Running` (BOOL).
- Implement standard AOI parameters like `EnableIn` and `EnableOut` to handle instruction execution status.
- Use tag-based addressing exclusively (no absolute memory like `%QX0.0`).
- Separate the logic into distinct sections: mode selection, fault detection, run command logic, and timer updates.
- Ensure the timer uses Rockwell's `TON` instruction format (e.g., `Timer_Feedback.PRE`, `Timer_Feedback.ACC`, `Timer_Feedback.DN`).

**Expected Tag Definitions Structure:**

| Name | Usage | Data Type | Description |
|---|---|---|---|
| EnableIn | Input | BOOL | System generated enable |
| AutoMode | Input | BOOL | 1 = Auto, 0 = Manual |
| StartReq | Input | BOOL | Request to start |
| StopReq | Input | BOOL | Request to stop (1 = stop) |
| RunFeedback | Input | BOOL | Auxiliary contact feedback |
| FaultReset | Input | BOOL | Reset command |
| MotorRunCmd | Output | BOOL | Command to contactor |
| Faulted | Output | BOOL | 1 = Fault active |
| EnableOut | Output | BOOL | System generated enable out |
| Timer_Feedback | Local | TON | Feedback timeout timer |
| State_Running | Local | BOOL | Internal run state |

## Why this example matters

This example forces the agent to output code that complies with the strict parameterization and tag structures required by Studio 5000 Add-On Instructions, rather than generating generic IEC 61131-3 logic or Siemens-style function blocks. It also ensures Rockwell-specific timer syntax is used.