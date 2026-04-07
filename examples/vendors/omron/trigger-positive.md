# Omron Trigger Positive Example

This example demonstrates how a user can prompt the assistant to specifically target Omron's Sysmac Studio and the NJ/NX series PLCs, triggering the appropriate vendor-specific rules.

## User Prompt

> "Write an ST program for an Omron NX1P2 PLC in Sysmac Studio. I need a function block to calculate the moving average of an analog input over 10 samples."

## Expected Agent Behavior

1. **Acknowledge Vendor & Platform**: The agent should recognize "Omron", "NX1P2", and "Sysmac Studio" and immediately apply Omron-specific coding standards.
2. **Apply IEC 61131-3 Standards**: Sysmac Studio strongly adheres to IEC 61131-3. The agent should generate standard Structured Text (ST) rather than legacy memory addressing.
3. **Use Proper Variable Declarations**: The response must structure the code with proper `VAR_INPUT`, `VAR_OUTPUT`, and `VAR` blocks, omitting physical memory addresses (e.g., avoid `%D100` unless explicitly asked, as Sysmac uses tag-based addressing).
4. **Adhere to Naming Conventions**: The agent should use camelCase for variable names, which is the standard practice in the Sysmac Studio environment.

## Why this example matters

It verifies the boundary between generic IEC 61131-3 code and Sysmac-specific IEC implementation, ensuring the skill enforces camelCase naming conventions and tag-based addressing over absolute memory arrays.