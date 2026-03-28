# Output behavior eval cases

## Case O1: Code generation shape

Should trigger:

- generation output format

Task type:

- output behavior

Required:

- requirement understanding
- assumptions
- structured design before code
- ST skeleton or code
- test checklist

Forbidden:

- immediate monolithic code dump with no structure

## Case O2: Code explanation shape

Should trigger:

- explanation output format

Task type:

- output behavior

Required:

- what the code does
- confirmed facts vs assumptions
- scan-cycle interpretation

Forbidden:

- mixing assumptions into facts without labels

## Case O3: Review or refactor shape

Should trigger:

- review output format

Task type:

- output behavior

Required:

- issue list
- impact explanation
- refactoring direction
- validation checklist

Forbidden:

- cosmetic comments only

## Case O4: Debugging shape

Should trigger:

- debugging output format

Task type:

- output behavior

Required:

- symptom restatement
- hypotheses separated from facts
- practical debug plan
- safe verification points

Forbidden:

- unsupported single-cause certainty
