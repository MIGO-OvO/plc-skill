# PLC_SKILL Optimization Backlog

**Generated**: 2026-04-07  
**Source**: Comprehensive audit (audit-2026-04-07.md)  
**Status**: Ready for execution

---

## P0 - Critical (NONE)

**No P0 issues found**. The skill is production-ready with no blocking safety, correctness, or architectural failures.

---

## P1 - High Priority (Quality & Consistency)

### P1.1: Vendor Pitfalls Content Enrichment
**Issue**: Keyence and Panasonic pitfalls files are placeholder-level  
**Impact**: Users get minimal guidance for these vendors, reducing skill value  
**Evidence**:
- `references/vendors/keyence/keyence-pitfalls-and-pro-tips.md`: 518 bytes
- `references/vendors/panasonic/panasonic-pitfalls-and-pro-tips.md`: 563 bytes
- Compare to Rockwell (2.3KB), Siemens (2.5KB), Omron (1.6KB)

**Tasks**:
- [ ] Research Keyence KV Studio common pitfalls (ladder scan order, data register usage, communication setup)
- [ ] Expand keyence-pitfalls-and-pro-tips.md to 1.5-2KB with real content
- [ ] Research Panasonic FPWIN common pitfalls (FP series quirks, timer/counter behavior)
- [ ] Expand panasonic-pitfalls-and-pro-tips.md to 1.5-2KB with real content

**Acceptance Criteria**:
- Both files ≥1.5KB
- Contains 5+ real pitfalls with explanations
- Includes 3+ pro tips specific to each vendor

**Estimated Effort**: 4-6 hours (research + writing)

---

### P1.2: Vendor Example Coverage
**Issue**: Only Mitsubishi has examples; Siemens, Rockwell, Omron have 0  
**Impact**: Users cannot see skill behavior for major vendors, reducing trust and adoption  
**Evidence**:
- `examples/vendors/mitsubishi/`: 7 examples
- `examples/vendors/siemens/`: Does not exist
- `examples/vendors/rockwell/`: Does not exist
- `examples/vendors/omron/`: Does not exist

**Tasks**:
- [ ] Create `examples/vendors/siemens/` directory
  - [ ] trigger-positive.md (TIA Portal, S7-1500, SCL generation)
  - [ ] trigger-negative.md (wrong vendor, safety, too broad)
  - [ ] motor-start-stop-example.md (FC with DB instance)
  - [ ] review-example.md (SCL code review)
  - [ ] sequence-state-machine-example.md (CASE-based sequencer)
- [ ] Create `examples/vendors/rockwell/` directory
  - [ ] trigger-positive.md (Studio 5000, CompactLogix, ST generation)
  - [ ] trigger-negative.md
  - [ ] motor-start-stop-example.md (AOI with tag-based addressing)
  - [ ] review-example.md (Logix ST code review)
  - [ ] sequence-state-machine-example.md
- [ ] Create `examples/vendors/omron/` directory
  - [ ] trigger-positive.md (Sysmac Studio, NJ series, ST generation)
  - [ ] trigger-negative.md
  - [ ] motor-start-stop-example.md (Function Block with global variables)
  - [ ] review-example.md (Sysmac ST code review)
  - [ ] sequence-state-machine-example.md

**Acceptance Criteria**:
- Each vendor has 5 examples minimum
- Examples use vendor-specific terminology and syntax
- Examples demonstrate both positive and negative triggers
- Examples include realistic I/O addresses/tags

**Estimated Effort**: 12-16 hours (3 vendors × 5 examples × 1 hour each)

---

### P1.3: Eval Vendor-Specific Coverage
**Issue**: No eval tests verify vendor-specific code generation correctness  
**Impact**: Vendor-specific regressions can slip through, generating non-compilable code  
**Evidence**:
- `evals/routing-cases.md`: Only 4 routing tests (RT1-RT4), no generation validation
- No tests verify Mitsubishi X/Y/M/D syntax
- No tests verify Rockwell tag-based addressing
- No tests verify Siemens DB/FC/FB structure

**Tasks**:
- [ ] Add `evals/vendor-generation-cases.md` with:
  - [ ] VG1: Mitsubishi FX3U motor control (verify X/Y/M/D syntax)
  - [ ] VG2: Siemens S7-1500 state machine (verify DB/FC/FB structure)
  - [ ] VG3: Rockwell CompactLogix sequence (verify tag-based addressing)
  - [ ] VG4: Omron NJ series alarm module (verify global variable syntax)
  - [ ] VG5: Cross-vendor migration (Siemens → Rockwell)
- [ ] Add `evals/vendor-debugging-cases.md` with:
  - [ ] VD1: Mitsubishi scan time issue
  - [ ] VD2: Siemens optimized block access problem
  - [ ] VD3: Rockwell tag scope conflict
- [ ] Update `evals/eval-matrix.md` to include new cases

**Acceptance Criteria**:
- 8 new vendor-specific test cases
- Each case has clear pass/fail criteria
- Cases cover all Tier 1 vendors (Mitsubishi, Siemens, Rockwell)

**Estimated Effort**: 6-8 hours

---

### P1.4: Template Analog/Process Control Gap
**Issue**: No templates for analog I/O, PID, edge detection (common industrial patterns)  
**Impact**: Users get no guidance for 30-40% of typical industrial control scenarios  
**Evidence**:
- `templates/common/`: 10 templates, all discrete/sequential control
- No analog scaling template (4-20mA, raw-to-engineering units)
- No PID control template
- No edge detection template (R_TRIG/F_TRIG)

**Tasks**:
- [ ] Create `templates/common/analog-scaling-template.md`
  - Raw-to-engineering unit conversion
  - 4-20mA scaling with fault detection
  - High/low limit checking
- [ ] Create `templates/common/edge-detection-template.md`
  - Rising edge (R_TRIG) pattern
  - Falling edge (F_TRIG) pattern
  - Pulse detection
- [ ] Create `templates/common/debounce-filter-template.md`
  - Digital input debouncing
  - Analog signal filtering (moving average)
  - Noise rejection patterns
- [ ] Create `templates/common/pid-control-template.md`
  - Basic PID structure
  - Anti-windup logic
  - Manual/Auto mode switching
- [ ] Update `templates/common/template-map.md` to reference new templates

**Acceptance Criteria**:
- 4 new templates covering analog/process control
- Each template includes ST code example
- Templates follow same structure as existing templates
- template-map.md updated with routing logic

**Estimated Effort**: 8-10 hours

---

### P1.5: Schneider/Delta Pitfalls Enrichment
**Issue**: Schneider and Delta pitfalls files have thin content (<1KB)  
**Impact**: Users get less guidance than for other vendors  
**Evidence**:
- `references/vendors/schneider/schneider-pitfalls-and-pro-tips.md`: 874 bytes
- `references/vendors/delta/delta-pitfalls-and-pro-tips.md`: 1,034 bytes
- Compare to Rockwell (2.3KB), Siemens (2.5KB)

**Tasks**:
- [ ] Research Schneider EcoStruxure/Unity Pro common pitfalls
- [ ] Expand schneider-pitfalls-and-pro-tips.md to 1.5-2KB
- [ ] Research Delta WPLSoft/ISPSoft common pitfalls
- [ ] Expand delta-pitfalls-and-pro-tips.md to 1.5-2KB

**Acceptance Criteria**:
- Both files ≥1.5KB
- Contains 5+ real pitfalls with explanations
- Includes 3+ pro tips specific to each vendor

**Estimated Effort**: 4-6 hours

---

## P2 - Medium Priority (Enrichment)

### P2.1: Vendor Cheatsheet Coverage
**Issue**: Only 3/10 vendors have cheatsheets  
**Impact**: Users lack quick reference for 7 vendors  
**Evidence**:
- Have cheatsheets: Beckhoff, Omron, Rockwell
- Missing: Siemens, Mitsubishi, Schneider, Delta, Codesys, Keyence, Panasonic

**Tasks**:
- [ ] Create cheatsheets for 7 vendors (2-3KB each)
  - Memory addressing quick reference
  - Common instruction syntax
  - Data type reference
  - Timer/counter syntax

**Acceptance Criteria**:
- All 10 vendors have cheatsheets
- Cheatsheets follow consistent format
- Each ≥2KB with practical quick-reference content

**Estimated Effort**: 10-14 hours

---

### P2.2: Vendor Template Population
**Issue**: templates/vendors/ is essentially empty  
**Impact**: No vendor-specific code generation templates despite layered architecture  
**Evidence**:
- `templates/vendors/mitsubishi/`: Directory exists but empty
- No other vendor directories

**Tasks**:
- [ ] Create vendor-specific templates for Tier 1 vendors:
  - [ ] Mitsubishi: FX3U-specific patterns (device memory usage, GX Works2 structure)
  - [ ] Siemens: TIA Portal patterns (DB/FC/FB organization, SCL idioms)
  - [ ] Rockwell: Studio 5000 patterns (AOI structure, tag-based addressing)

**Acceptance Criteria**:
- Each Tier 1 vendor has 3-5 vendor-specific templates
- Templates demonstrate vendor-specific best practices
- Templates align with vendor rules in references/vendors/

**Estimated Effort**: 12-16 hours

---

### P2.3: Eval Language Coverage
**Issue**: Only ST tested; no LD, SFC, or FBD eval cases  
**Impact**: Regressions in non-ST languages can slip through  
**Evidence**:
- All 31 eval cases are ST-focused
- `references/common/` has ld-style-guide.md, fbd-style-guide.md but no evals

**Tasks**:
- [ ] Add `evals/ladder-diagram-cases.md` with 3-4 LD generation/review cases
- [ ] Add `evals/sfc-cases.md` with 2-3 SFC generation cases
- [ ] Update `evals/eval-matrix.md`

**Acceptance Criteria**:
- 5-7 new language-specific test cases
- Cases cover LD and SFC (FBD optional)
- Clear pass/fail criteria for each

**Estimated Effort**: 4-6 hours

---

### P2.4: docs/PLC_SKILL_KB Expansion
**Issue**: Only Mitsubishi has formal documentation in KB  
**Impact**: Other vendors lack official manual references  
**Evidence**:
- `docs/PLC_SKILL_KB/01_vendor_mitsubishi/`: 9 PDFs
- No other vendor directories

**Tasks**:
- [ ] Follow vendor-enrichment-plan.md to add Siemens, Rockwell, Omron documentation
- [ ] Create directory structure for each vendor
- [ ] Index official manuals in manifest.md

**Acceptance Criteria**:
- Siemens, Rockwell, Omron have formal documentation directories
- Each has 3-5 key manuals (programming, hardware, instruction reference)
- manifest.md updated with new entries

**Estimated Effort**: 20-30 hours (research + acquisition + indexing)

---

## P3 - Low Priority (Nice to Have)

### P3.1: Specialized Vendor Files
**Issue**: Only Tier 1 vendors have deep-dive files  
**Tasks**:
- [ ] Add Omron Sysmac Studio project patterns file
- [ ] Add Beckhoff TwinCAT task configuration file

**Estimated Effort**: 6-8 hours

---

### P3.2: Advanced Templates
**Issue**: No templates for motion, recipes, data logging  
**Tasks**:
- [ ] Create motion-control-template.md
- [ ] Create recipe-management-template.md
- [ ] Create data-logging-template.md

**Estimated Effort**: 8-12 hours

---

### P3.3: Complex Eval Scenarios
**Issue**: No tests for multi-module review, performance optimization  
**Tasks**:
- [ ] Add complex state machine with fault recovery test
- [ ] Add multi-module program organization test
- [ ] Add scan-cycle optimization test

**Estimated Effort**: 4-6 hours

---

## Execution Strategy

### Wave 1 (P1.1, P1.4) - Foundation
**Focus**: Fill critical content gaps (pitfalls, templates)  
**Effort**: 12-16 hours  
**Parallel**: Can execute simultaneously

### Wave 2 (P1.2, P1.3) - Vendor Coverage
**Focus**: Add vendor examples and evals  
**Effort**: 18-24 hours  
**Parallel**: Can execute simultaneously

### Wave 3 (P1.5, P2.1, P2.2) - Consistency
**Focus**: Enrich remaining vendors, add cheatsheets and templates  
**Effort**: 26-36 hours  
**Parallel**: Can execute simultaneously

### Wave 4 (P2.3, P2.4) - Advanced Coverage
**Focus**: Language coverage, formal documentation  
**Effort**: 24-36 hours  
**Sequential**: P2.4 requires significant research

### Wave 5 (P3.*) - Polish
**Focus**: Nice-to-have enhancements  
**Effort**: 18-26 hours  
**Optional**: Execute based on available resources

---

## Total Estimated Effort

- **P1 (High Priority)**: 34-46 hours
- **P2 (Medium Priority)**: 46-66 hours
- **P3 (Low Priority)**: 18-26 hours
- **Total**: 98-138 hours

---

## Next Steps

1. Review and approve backlog
2. Prioritize waves based on available resources
3. Execute Wave 1 (P1.1, P1.4) in parallel
4. Verify results and proceed to Wave 2
