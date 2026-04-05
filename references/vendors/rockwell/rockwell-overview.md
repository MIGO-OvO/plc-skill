# Rockwell overview

Use this module when the request is clearly in the Rockwell ecosystem.

## Current state

This module contains essential rules for addressing, project structure, and specific software quirks for the Studio 5000 Logix Designer (ControlLogix, CompactLogix) ecosystem.

## Reference Priority

When a Rockwell context is confirmed, read this file in addition to the common PLC rules:

1. `references/vendors/rockwell/rockwell-cheatsheet.md`

## Key Focus Areas

- Transitioning from legacy fixed addressing to **Tag-Based Memory**.
- Understanding the hierarchy: **Task -> Program -> Routine** (and the requirement of `JSR`).
- Navigating the critical limitation of **AOIs (Add-On Instructions)** regarding online editing.
- Working with Rockwell's specific `TIMER` structures (`.PRE`, `.ACC`, `.DN`, `.TT`).
