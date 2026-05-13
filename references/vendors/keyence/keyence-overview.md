# Keyence Overview

Use this module when the request is clearly in the Keyence ecosystem.

## Current State

This vendor module contains comprehensive rules for Keyence KV-series PLCs and KV Studio programming software. It covers:

- Symbol-based programming and script language
- Machine Operation Recorder function (KV-8000)
- Motion control and communication (EtherNet/IP, OPC UA)
- Official documentation index with direct links

## Reference Priority

When a Keyence context is confirmed, read these files in addition to the common PLC rules:

1. `references/vendors/keyence/keyence-overview.md` (this file - context setting)
2. `references/vendors/keyence/keyence-rules.md` (core engineering rules)
3. `references/vendors/keyence/official-doc-index.md` (for official manual citations)

## Key Focus Areas

### Symbol-Based Programming
Keyence emphasizes a modern, symbol-based (tag-based) programming approach in KV Studio, moving away from rigid device addressing (like `R100`, `DM200`). This improves code readability and integration with HMIs and higher-level systems.

### Script Programming
A standout feature of KV Studio is its **Script** language. 
- It uses a syntax very similar to BASIC (e.g., `FOR...NEXT`, `IF...END IF`, `DIM`).
- It is heavily used for complex math, string manipulation, and array processing, often replacing the need for complex Ladder logic blocks.

### Machine Operation Recorder
The KV-8000 series features a unique built-in **Machine Operation Recorder**.
- It continuously buffers device states, cycle times, and analog waveforms.
- When an error or trigger condition occurs, it saves the "before and after" data.
- This is a massive troubleshooting advantage and a key selling point of the platform.

### Integrated Motion Control
- KV-X MOTION provides high-speed, synchronized multi-axis control.
- Programmed directly within KV Studio using dedicated motion function blocks.

## Controller Families

### KV-8000 Series
- The flagship, high-performance modular PLC.
- Built-in Machine Operation Recorder.
- KV-8000A includes a native OPC UA server for direct IT/OT integration.

### KV-7000 Series
- Mid-range, highly capable modular PLC.
- Very fast execution speed, suitable for complex machine control.

### KV Nano Series
- Ultra-compact, block-type PLC.
- Cost-effective for smaller machines or distributed control panels.
- Still programmed using the same KV Studio environment.

## Common Terminology

| Keyence Term | Generic PLC Term | Description |
|--------------|------------------|-------------|
| KV Studio | IDE / Software | The programming environment |
| Script | Structured Text (loosely) | Text-based programming language (BASIC-like) |
| Symbol | Tag / Variable | Named memory location |
| R (Relay) | Internal Relay / Coil | Bit memory |
| DM (Data Memory) | Data Register | 16-bit/32-bit word memory |
| Recorder | Trace / Datalogger | Machine Operation Recorder |

## Routing Signals

Route to Keyence module when any of these cues are present:

### Explicit Mentions
- Keyence
- KV Series
- KV Studio
- KV-8000, KV-7000, KV-5000, KV Nano

### Terminology
- Machine Operation Recorder
- Script programming (in a PLC context with BASIC-like syntax)
- KV-X MOTION
- Symbol-based programming (in Keyence context)

## Boundary Conditions

### Script vs. Structured Text (ST)
- While Keyence Script serves the same purpose as IEC 61131-3 Structured Text, **the syntax is different**. 
- Script uses `FOR...NEXT` instead of `FOR...END_FOR`, and `IF...END IF` instead of `IF...END_IF;`. 
- If a user asks for ST code for a Keyence PLC, provide the Keyence Script equivalent.

### Mixing Vendors
If a user asks to migrate from Keyence to another vendor (or vice versa), explicitly map the concepts:
- Keyence Script ->Siemens SCL / Rockwell ST / Codesys ST
- Keyence Symbol ->Rockwell Tag / Codesys Variable
- Keyence Machine Operation Recorder ->Siemens Trace / Rockwell Trend (though Keyence's is more deeply integrated by default)
- Keyence R/DM (legacy addressing) ->Mitsubishi M/D / Omron CIO/D

---

**Last updated:** 2026-04-06
