# Adding New Vendors (Extension Guide)

The PLC Skill is designed to be extensible. When a new PLC manufacturer or software platform needs to be supported, you must add its specific rules, syntax, and behaviors to the Vendor Layer. 

Follow this step-by-step guide to integrate a new vendor into the repository.

## Step 1: Define the Recognition Signals

You must first teach the skill how to recognize when a user is asking for this vendor.

1. **Update `references/vendors/vendor-recognition-signals.md`**
   - Add the keywords, software names, hardware families, and memory terminology associated with the new vendor (e.g., for Omron: "Sysmac Studio", "NJ/NX", "CJ2", "W area").
2. **Update `references/vendors/vendor-routing.md`**
   - Map the newly created vendor files to the router so they are correctly injected into the context window when the vendor is detected.

## Step 2: Create the Core Knowledge Files

For every new vendor, create a new directory under `references/vendors/[vendor-name]/` and populate it with the following required files:

- [ ] **`[vendor]-overview.md`**
  - Details the core philosophy, primary software environments, and overall capabilities of the platform.
- [ ] **`[vendor]-rules.md`**
  - Defines the specific memory mapping architecture, tag scopes (global vs. local), data type variations, and syntax rules.
- [ ] **`[vendor]-pitfalls-and-pro-tips.md`**
  - Documents real-world gotchas (e.g., ladder scan order, timer resolutions, data register overlaps), IDE quirks, common compilation errors, and specific pro tips (e.g., using Delta's API instructions or Schneider's DFBs).
- [ ] **`[vendor]-cheatsheet.md`**
  - A quick-reference guide (2-3KB) for commonly used instructions, data type conversions, standard timers/counters, and memory addressing formats (e.g., Siemens `DB` vs Mitsubishi `D` vs Rockwell tags).
- [ ] **`official-doc-index.md`**
  - An index of official manuals (hardware, programming, instructions) with download links or references to the `docs/PLC_SKILL_KB/` directory.

### Deep-Dive Architectural Notes (Optional but Recommended)
For complex platforms (like Omron Sysmac or Beckhoff TwinCAT), consider adding deep-dive notes explaining their specific project structuring, task allocation, or OOP paradigms.

## Step 3: Provide Examples

The LLM relies heavily on few-shot examples to understand the specific "flavor" of the vendor's code. These examples must use realistic I/O addresses and vendor-specific terminology.

- [ ] **Add examples to `examples/vendors/[vendor]/`**
  - **`trigger-positive.md`**: A user prompt that successfully identifies the vendor and the expected agent behavior.
  - **`motor-start-stop-example.md`**: A basic example demonstrating standard blocks, local variable scoping, and instantiation.
  - **`sequence-state-machine-example.md`**: An advanced example demonstrating proper state flow and scan-cycle principles within the vendor's syntax (e.g., using `ENUMs` in Omron or `DINTs` in Rockwell).

## Step 4: Add Evaluation Cases

To ensure the skill correctly supports the new vendor and to prevent future regressions (cross-vendor hallucination), add specific test cases to the evaluation suite.

- [ ] **Update `evals/vendor-generation-cases.md`**
  - Add prompts and expected outputs that explicitly test the new vendor's unique syntax, ensuring it does not use tag-based addressing when absolute addressing is required, or vice versa.
- [ ] **Update `evals/vendor-debugging-cases.md`**
  - Add debugging scenarios that test the agent's ability to diagnose platform-specific faults, memory overlap issues, or compilation errors unique to that vendor.

## Important Considerations

*   **No Duplication:** Do not duplicate common PLC patterns (like start/stop logic or basic state machines) in the vendor directories if they already exist in `references/common/`. Use Vendor files strictly to *override* or specialize these concepts for the platform.
*   **Maintain the Boundary:** Never embed vendor-specific syntax rules inside the `references/common/` layer. The Common Layer may mention vendors only for contrast or routing.