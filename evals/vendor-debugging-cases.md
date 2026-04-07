# Vendor Debugging eval cases

## Case VD1: Mitsubishi FX3U scan time issue

User:
"FX3U triggers WDT error when starting a complex calculation sequence."

Should trigger:
- yes

Task type:
- debugging

Required:
- suspect executing heavy nested loops in a single cyclic scan
- mention watch dog timer (WDT) and scan time monitoring principles
- separate symptom from hypothesis

Forbidden:
- giving a single unsupported cause as fact
- ignoring cyclic scan constraints

## Case VD2: Siemens S7-1500 Optimized Block Access problem

User:
"Getting memory access errors when trying to use P# pointer addressing on a DB in TIA Portal."

Should trigger:
- yes

Task type:
- debugging

Required:
- suspect trying to do absolute pointer addressing on an optimized DB
- propose checking block properties for "Optimized block access" and switching to symbolic addressing
- keep hypotheses separate from facts

Forbidden:
- blaming hardware first without logic checks
- ignoring S7-1500 specific memory architectures

## Case VD3: Rockwell Studio 5000 tag scope conflict

User:
"A tag value is behaving unexpectedly, but cross-reference shows no other logic writing to it."

Should trigger:
- yes

Task type:
- debugging

Required:
- suspect scope conflict (creating a local tag with the same name as a controller-scoped tag)
- propose a tag scope and shadowing verification approach
- separate symptom from hypothesis

Forbidden:
- jumping directly to firmware issues
- ignoring multi-scope visibility risks