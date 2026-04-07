---
trigger: "recipe management", "parameter set", "load recipe", "process recipe"
use-case: "A reusable skeleton for validating, loading, and applying named parameter sets without mixing recipe transfer logic into runtime control logic."
requirements: "A PLC environment with arrays/structs or equivalent recipe storage abstractions."
---

# Recipe Management Template

## Purpose

Use this template when the system needs explicit recipe selection, validation, apply, and status feedback behavior.

## Suitable for

- product parameter sets
- machine setup presets
- operator-selected batch parameters

## Suggested structure

- requested recipe identifier
- validation step
- staged apply action
- active recipe status
- reject / fault path

## Skeleton

```iecst
IF bLoadRecipeReq THEN
    bRecipeLoadBusy := TRUE;
    bRecipeLoadDone := FALSE;
    bRecipeLoadError := FALSE;

    IF iRecipeReq >= 0 AND iRecipeReq < iRecipeCount THEN
        stRecipeCandidate := astRecipes[iRecipeReq];

        IF stRecipeCandidate.bEnabled THEN
            stRecipeActive := stRecipeCandidate;
            iActiveRecipe := iRecipeReq;
            bRecipeLoadDone := TRUE;
        ELSE
            bRecipeLoadError := TRUE;
        END_IF;
    ELSE
        bRecipeLoadError := TRUE;
    END_IF;

    bRecipeLoadBusy := FALSE;
END_IF;
```

## Notes

- Validate the requested recipe before copying it into the active set.
- Keep "requested recipe", "candidate recipe", and "active recipe" separate.
- If recipe application must be synchronized with machine state, gate the final apply step with explicit permissives.
