# Rockwell Positive Trigger Example

## User prompt

"I need to create an Add-On Instruction (AOI) for a valve controller in Studio 5000. We are using a ControlLogix L83E processor. Please provide the logic in Structured Text and define the required tags."

## Expected skill behavior

- Recognize Rockwell/Allen-Bradley specific terminology (Studio 5000, AOI, ControlLogix, L83E, tags).
- Route the request to the Rockwell vendor module (`references/vendors/rockwell/`).
- Provide a solution structured specifically for an Add-On Instruction (AOI) rather than a standard program or routine.
- Use tag-based addressing rather than absolute memory registers.
- Suggest appropriate parameter types (Input, Output, InOut, Local) conforming to Rockwell conventions (including `EnableIn` and `EnableOut` behaviors if relevant).

## Why this example matters

This demonstrates how the skill identifies key vendor terminology and switches from generic IEC 61131-3 logic to the specific structural requirements of the Rockwell Logix environment, which differs significantly from Siemens or Mitsubishi in its handling of FBs vs AOIs.