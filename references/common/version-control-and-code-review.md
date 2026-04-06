# Version Control and Code Review for PLC Projects

This document provides guidance for managing PLC code in version control systems (Git, SVN) and conducting effective code reviews on text-based exports.

## The Challenge: Binary Project Files

Most PLC IDEs store projects in proprietary binary formats:
- Siemens TIA Portal: `.ap1X` (zipped XML, but complex)
- Rockwell Studio 5000: `.ACD` (binary)
- Codesys/Beckhoff: `.project` (XML, but with binary blobs)
- Omron Sysmac Studio: `.smc` (binary)

**Problem:** Git/SVN can't show meaningful diffs of binary files. You can't see "what changed" between commits.

## Solution 1: Export to Text Format for Version Control

### Siemens TIA Portal

**Export Strategy:**
1. Export all SCL code as `.scl` text files
2. Export global DB as `.db` files
3. Export I/O configuration as XML

**Git Repository Structure:**
```
project/
├── src/
│   ├── FBs/
│   │   ├── FB_MotorControl.scl
│   │   ├── FB_ValveControl.scl
│   ├── FCs/
│   │   ├── FC_ScaleAnalog.scl
│   ├── DBs/
│   │   ├── DB_GlobalData.db
│   ├── OBs/
│   │   ├── OB1_Main.scl
├── hardware/
│   ├── IO_Configuration.xml
├── docs/
│   ├── IO_List.xlsx
│   ├── Alarm_List.xlsx
└── README.md
```

**Workflow:**
1. Make changes in TIA Portal
2. Export modified blocks to `src/` folder
3. `git add`, `git commit`, `git push`

**Limitation:** You still need the binary `.ap1X` file to actually download to the PLC. The text exports are for version control and review only.

### Rockwell Studio 5000

**Export Strategy:**
1. Export tags as `.L5X` (XML)
2. Export AOIs as `.L5X`
3. Export routines as `.L5X` or copy ST code to `.st` files

**Git Repository Structure:**
```
project/
├── tags/
│   ├── Controller_Tags.L5X
│   ├── Program_Main_Tags.L5X
├── AOIs/
│   ├── AOI_MotorControl.L5X
├── routines/
│   ├── Main_Routine.L5X
│   ├── Sequence_Logic.st  (ST code only)
└── README.md
```

### Codesys / Beckhoff TwinCAT

**Export Strategy:**
1. Use PLCopen XML export for POUs
2. Export GVLs (Global Variable Lists) as XML
3. TwinCAT: Use the built-in Git integration (TwinCAT 3.1.4024+)

**Git Repository Structure:**
```
project/
├── POUs/
│   ├── FB_Motor.xml
│   ├── PRG_Main.xml
├── GVLs/
│   ├── GVL_Inputs.xml
│   ├── GVL_Outputs.xml
└── README.md
```

**TwinCAT Pro Tip:** TwinCAT 3.1.4024+ has native Git integration. Enable it in the solution settings, and TwinCAT will automatically track changes to POUs, DUTs, and GVLs as text files.

## Solution 2: Conducting Code Reviews on Text Diffs

### Example: Reviewing a Git Diff

**Scenario:** A colleague modified `FB_MotorControl.scl` and committed the change. You want to review it.

**Git Diff Output:**
```diff
diff --git a/src/FBs/FB_MotorControl.scl b/src/FBs/FB_MotorControl.scl
index 1234567..abcdefg 100644
--- a/src/FBs/FB_MotorControl.scl
+++ b/src/FBs/FB_MotorControl.scl
@@ -15,7 +15,8 @@ BEGIN
    CASE statState OF
       0:  // Idle
          bRunning := FALSE;
-         IF bStart AND NOT bFault THEN
+         // Added interlock: Check air pressure before starting
+         IF bStart AND NOT bFault AND bAirPressureOk THEN
             statState := 1;
          END_IF;
```

### Code Review Checklist for PLC Diffs

When reviewing a diff, check for:

#### 1. **Logic Safety**
- [ ] Are all interlocks still present?
- [ ] Was a safety condition accidentally removed?
- [ ] Are there new conditions that could cause unexpected stops?

**Example Issue:**
```diff
- IF bStart AND NOT bFault AND bGuardClosed THEN
+ IF bStart AND NOT bFault THEN  // DANGER! Guard interlock removed!
```

#### 2. **State Machine Integrity**
- [ ] Are all state transitions still valid?
- [ ] Can the state machine get stuck in a state?
- [ ] Are there new states without proper exit conditions?

**Example Issue:**
```diff
  CASE statState OF
     0: // Idle
        IF bStart THEN statState := 1; END_IF;
     1: // Running
-       IF bStop THEN statState := 0; END_IF;
+       // Removed stop transition - now stuck in Running!
```

#### 3. **Variable Initialization**
- [ ] Are new variables initialized on first scan?
- [ ] Are retained variables handled correctly?

**Example Issue:**
```diff
+ VAR
+    newCounter : INT;  // Not initialized! Could start at random value.
+ END_VAR
```

**Fix:**
```diff
+ IF FirstScan THEN
+    newCounter := 0;
+ END_IF;
```

#### 4. **Array Bounds**
- [ ] Are array indices validated before access?
- [ ] Did the array size change? Are all accesses still valid?

**Example Issue:**
```diff
- DataArray : ARRAY[0..99] OF INT;
+ DataArray : ARRAY[0..49] OF INT;  // Array shrunk!

  // Elsewhere in code:
  Value := DataArray[75];  // Now out of bounds!
```

#### 5. **Timing and Scan Cycle Impact**
- [ ] Did the change add heavy calculations to a fast task?
- [ ] Are there new loops that could cause watchdog timeouts?

**Example Issue:**
```diff
+ FOR i := 0 TO 10000 DO  // 10,000 iterations in a 10ms task?
+    Sum := Sum + DataArray[i];
+ END_FOR;
```

#### 6. **HMI/SCADA Interface Changes**
- [ ] Did variable names change? (HMI tags may break)
- [ ] Did data types change? (e.g., INT → REAL)
- [ ] Are handshake signals still correct?

**Example Issue:**
```diff
- HMI_Command.Sts_Done : BOOL;
+ HMI_Command.Sts_Complete : BOOL;  // HMI still reads Sts_Done!
```

### AI-Assisted Code Review Prompt

When asking an AI to review a PLC code diff, provide context:

**Good Prompt:**
```
Review this Siemens SCL diff for FB_MotorControl. This FB controls a 3-phase motor with safety interlocks (E-Stop, Guard Door, Overload). The motor is used in a conveyor system. Check for:
1. Safety interlock integrity
2. State machine logic errors
3. Potential runtime faults

[Paste diff here]
```

**Bad Prompt:**
```
Review this code.
[Paste diff here]
```

## Solution 3: Automated Checks with Git Hooks

### Pre-Commit Hook: Syntax Validation

Create a Git pre-commit hook that validates exported code before allowing a commit.

**Example (for Siemens SCL):**
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Validating SCL syntax..."

for file in $(git diff --cached --name-only | grep '\.scl$'); do
    # Check for common syntax errors
    if grep -q "END_IF" "$file" && ! grep -q "IF.*THEN" "$file"; then
        echo "ERROR: $file has END_IF without matching IF"
        exit 1
    fi
    
    # Check for unbalanced BEGIN/END
    begin_count=$(grep -c "^BEGIN" "$file")
    end_count=$(grep -c "^END_FUNCTION_BLOCK\|^END_FUNCTION" "$file")
    if [ "$begin_count" -ne "$end_count" ]; then
        echo "ERROR: $file has unbalanced BEGIN/END"
        exit 1
    fi
done

echo "Syntax validation passed."
```

### Post-Commit Hook: Generate Change Log

Automatically generate a human-readable change log from the commit.

**Example:**
```bash
#!/bin/bash
# .git/hooks/post-commit

git log -1 --pretty=format:"Commit: %h%nAuthor: %an%nDate: %ad%nMessage: %s%n" >> CHANGELOG.txt
git diff HEAD~1 HEAD --stat >> CHANGELOG.txt
echo "---" >> CHANGELOG.txt
```

## Best Practices Summary

1. **Export to text format regularly** - After every significant change, export to text and commit to Git
2. **Use meaningful commit messages** - "Fixed motor interlock" is better than "Updated FB"
3. **Review diffs before merging** - Never merge without reviewing the actual code changes
4. **Tag releases** - Use Git tags to mark versions deployed to production (e.g., `v1.2.3-production`)
5. **Branch for features** - Use feature branches for major changes, merge to `main` after review
6. **Document breaking changes** - If a change affects HMI or other systems, document it in the commit message

## Example Git Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/add-air-pressure-interlock

# 2. Make changes in TIA Portal / Studio 5000 / etc.

# 3. Export modified blocks to text
# (Manual step in IDE)

# 4. Stage and commit
git add src/FBs/FB_MotorControl.scl
git commit -m "Add air pressure interlock to motor start condition

- Added bAirPressureOk input to FB_MotorControl
- Motor will not start if air pressure is low
- Tested on simulator, ready for review"

# 5. Push to remote
git push origin feature/add-air-pressure-interlock

# 6. Create Pull Request (on GitHub/GitLab/Bitbucket)
# 7. Colleague reviews the diff
# 8. Merge to main after approval
```

---

**References:**
- Git documentation: https://git-scm.com/doc
- TwinCAT Git integration: Beckhoff Information System
- PLCopen XML specification for portable code exchange