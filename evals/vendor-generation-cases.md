# Vendor Generation eval cases

## Case VG1: Mitsubishi FX3U Motor Control

User:
"Write a simple motor start/stop control for Mitsubishi FX3U. Include a start button, stop button, and motor output."

Should trigger:

- yes

Task type:

- vendor generation

Required:

- Use X/Y/M device syntax.
- Identify the environment as GX Works2/GX Works3 for FX3U.

Forbidden:

- Tag-based or %I addressing.

## Case VG2: Siemens S7-1500 State Machine

User:
"Create a 3-step state machine for a Siemens S7-1500 PLC."

Should trigger:

- yes

Task type:

- vendor generation

Required:

- Use DB (Data Block) addressing.
- Use # for local tags.
- Use "" for global tags.
- Explicitly target TIA Portal syntax and structure.

Forbidden:

- Mitsubishi or Rockwell syntax.

## Case VG3: Rockwell CompactLogix Sequence

User:
"I need a simple sequence for a Rockwell CompactLogix using a timer."

Should trigger:

- yes

Task type:

- vendor generation

Required:

- Use Studio 5000 tag-based addressing.
- Use Add-On Instruction (AOI) parameters if applicable or standard instruction structures.
- Use Rockwell TON structure (e.g., .EN, .TT, .DN, .PRE, .ACC).

Forbidden:

- IEC 61131-3 standard TON format (like IN:=, PT:=) without noting Rockwell's specific implementation.

## Case VG4: Omron NJ Series Alarm

User:
"Write an alarm logic block for an Omron NJ Series PLC with a delay timer."

Should trigger:

- yes

Task type:

- vendor generation

Required:

- Use Sysmac Studio camelCase naming conventions.
- Use tag-based addressing.
- Use IEC TON format as supported by Omron.

Forbidden:

- Direct memory addressing without explicit need.

## Case VG5: Cross-vendor migration (Siemens to Rockwell)

User:
"Convert this Siemens logic to Rockwell: A %I0.0; AN %I0.1; = %Q0.0;"

Should trigger:

- yes

Task type:

- vendor generation / migration

Required:

- Convert Siemens %I/%Q direct addressing to Rockwell tag-based structure.
- Explain the difference in addressing philosophy.

Forbidden:

- Leaving Siemens syntax in the final Rockwell code.
