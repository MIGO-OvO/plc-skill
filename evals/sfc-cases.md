# Sequential Function Chart (SFC) Evaluation Cases

This file contains evaluation cases to test the AI's proficiency with IEC 61131-3 Sequential Function Charts (SFC), including state progression, transitions, and action qualifiers.

## Case SFC1: Generation - 3-Step Sequence

**Category:** Generation
**Objective:** Verify the AI can construct a valid SFC, clearly delineating steps, transitions, and appropriately applying IEC action qualifiers.

**Prompt:**
> Create a 3-step SFC for a tank filling sequence. 
> - Step 1 (Init): Wait for a `Start_Button`.
> - Step 2 (Fill): Turn on `Fill_Valve` only while in this step (N qualifier), and wait for `Level_High`.
> - Step 3 (Heat): Turn on `Heater` so it stays on even if we leave the step (S qualifier). Wait for `Temp_OK`. Once temp is OK, turn the heater off (R qualifier) and transition back to Step 1.
> Map out the steps, transitions, and actions clearly.

**Expected AI Behavior:**
- The AI should explicitly map out Initial Step 1, Step 2, and Step 3.
- It must correctly list the transitions: `T1 (Start_Button)`, `T2 (Level_High)`, and `T3 (Temp_OK)`.
- It must correctly apply the action blocks:
  - Step 2 Action: `N` qualifier for `Fill_Valve`.
  - Step 3 Action: `S` qualifier for `Heater`.
  - Step 3 (or Transition 3 / Step 1 entry) Action: `R` qualifier for `Heater`.

## Case SFC2: Review - Missing Transition Condition

**Category:** Review
**Objective:** Test the AI's ability to debug logical flow errors in SFCs, specifically charts that hang due to missing or perpetually false transitions.

**Prompt:**
> Review this SFC snippet design:
> `Step_1` -> `Transition_1 (Sensor == True)` -> `Step_2` -> `Transition_2 ()` -> `Step_3`.
> The process stalls at `Step_2` and never reaches `Step_3`. The transition logic for Transition 2 was left blank in the program. What is the impact of this on the PLC scan, and how do we fix it?

**Expected AI Behavior:**
- The AI must identify that an empty or missing transition condition defaults to FALSE in most PLC environments.
- It should explain that the SFC is "hung" or stuck in `Step_2` because the chart cannot progress without a valid `TRUE` condition at `Transition_2`.
- The fix should be to define a valid boolean expression or tag for `Transition_2` (or force it to TRUE if an immediate pass-through is desired).

## Case SFC3: Explanation - Action Qualifiers (N vs S)

**Category:** Explanation
**Objective:** Ensure the AI accurately explains IEC 61131-3 SFC standards, specifically the nuances between different action qualifiers.

**Prompt:**
> Explain the difference between the 'N' (Non-stored) and 'S' (Stored/Set) action qualifiers in an SFC. Give a practical manufacturing example of when to use each.

**Expected AI Behavior:**
- **N (Non-stored):** The action is active *only* as long as the step is active. Once the step transitions, the action goes false.
  - *Example:* Opening a fill valve while a tank is actively in a "Filling" step.
- **S (Stored/Set):** The action turns true when the step becomes active and *remains true* even after the SFC progresses to subsequent steps. It must be explicitly turned off later using an 'R' (Reset) qualifier.
  - *Example:* Starting a conveyor belt that needs to keep running across multiple subsequent steps (e.g., scanning, weighing, labeling) until a specific "Stop Conveyor" step is reached.