# Testing and Evaluations Guide

Welcome to the `plc-skill` testing and evaluations guide. This document explains how repository verification and eval case review work together to reduce regressions.

## Two Validation Layers

We use two complementary validation layers:

1. **Repository verification (`npm test`)**
   - Checks internal markdown references.
   - Checks for placeholder text left in user-facing docs.
   - Checks `package.json` and `package-lock.json` root metadata consistency.
2. **Prompt/eval case review (`evals/*.md`)**
   - Defines the expected agent behavior for generation, routing, review, debugging, and safety-boundary cases.

## Purpose of Evals

The evaluation suite acts as a lightweight regression matrix designed to maintain the high reliability and safety standards required for Industrial Control Systems (ICS) and Programmable Logic Controllers (PLCs). Specifically, the evals verify:

*   **Trigger Accuracy**: Ensuring the skill correctly activates and routes requests based on user prompts.
*   **Structure Quality**: Validating that generated logic adheres to established ICS architectural patterns (e.g., separating inputs, mapping logic, output handling).
*   **Conservative Behavior on Missing Info**: Confirming the skill refuses to guess or hallucinate critical parameters (like physical I/O pinouts or safety interlocks) and instead prompts the user for clarification.
*   **Stable Debugging**: Verifying that the skill employs methodical, step-by-step fault isolation rather than suggesting random, unverified logic changes.

## The Eval Matrix (`eval-matrix.md`)

The core of our prompt evaluation framework lives in `evals/eval-matrix.md`. This matrix categorizes our test cases across five primary domains:

1.  **Generation**: Creating new PLC code, logic blocks, and architectures from natural language prompts.
2.  **Explanation**: Breaking down and accurately describing existing logic routines or tag structures to the user.
3.  **Review**: Performing code reviews against industrial best practices, style guides, and safety standards.
4.  **Debugging**: Diagnosing faults, simulating logic execution, and proposing corrective actions for broken routines.
5.  **Routing**: Validating that specific domain queries are handed off accurately to the appropriate internal tools or sub-agents.

## Vendor-Specific Evals

Because PLC programming syntax varies drastically between manufacturers, we maintain specialized evaluation sets to protect against cross-vendor hallucination.

Found in `vendor-generation-cases.md` and `vendor-debugging-cases.md`, these tests ensure the skill correctly utilizes vendor-specific memory addressing and programming paradigms:
*   **Siemens**: Verifying proper use of Data Blocks (`DB`), instance DBs, and optimized vs. non-optimized memory access.
*   **Mitsubishi**: Ensuring correct syntax for internal relays (`M`), Data Registers (`D`), and appropriate hexadecimal/octal addressing.
*   **Rockwell Automation (Allen-Bradley)**: Validating the use of tag-based addressing (Controller-scoped vs. Program-scoped tags) and proper UDT (User-Defined Type) instantiation.
*   **Omron**: Verifying Sysmac Studio camelCase naming conventions and IEC TON format.

## Language-Specific Evals

IEC 61131-3 languages each have unique pitfalls and paradigms. Our language-specific evals ensure the skill avoids common logic errors and follows language-specific rules.

*   **Structured Text (ST)**: The primary evaluated baseline across generation, review, and debugging cases.
*   **Ladder Diagram (LD)** (`ladder-diagram-cases.md`): Focuses on visual and logic anti-patterns. A primary test is ensuring the skill generates accurate ASCII ladder art, avoids **multiple-coil syndrome** (assigning the same output coil in multiple rungs, causing unpredictable scan-cycle overwriting), and recommends ST over LD for complex string parsing tasks.
*   **Sequential Function Chart (SFC)** (`sfc-cases.md`): Tests the skill's understanding of SFC execution rules, specifically focusing on step transitions, debugging hung charts, and the accurate application of action qualifiers such as **N** (Non-stored/Null), **S** (Set/Stored), and **R** (Reset).

## Checklist for Contributors

Before submitting a Pull Request or accepting a major edit to the skill, verify both the repository checks and the relevant eval cases.

**Minimum Regression Checklist:**
- [ ] **Repository Verification**: Run `npm test` and resolve broken links, placeholder text, and package metadata drift.
- [ ] **Conservative Behavior Check**: Verify the skill still refuses to guess hardware mapping or bypass safety interlocks when information is missing.
- [ ] **Vendor Syntax Verification**: Run generation cases for at least one major vendor (Siemens, Rockwell, or Mitsubishi) to confirm addressing formats remain strictly compliant.
- [ ] **Language Anti-Pattern Check**: Validate that generated Ladder Diagram logic does not exhibit multiple-coil syndrome or unsafe latching conditions.
- [ ] **SFC Qualifier Check**: Ensure any modifications to SFC handling have not broken the definitions or usage of N, S, and R qualifiers.
- [ ] **Trigger Validation**: Run the Routing evaluation cases to ensure your changes have not hijacked unrelated queries or broken existing activation triggers.
