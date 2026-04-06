# Keyence (KV Series) - Pitfalls and Pro Tips

This document captures real-world gotchas, workarounds, and battle-tested tricks specific to Keyence KV PLCs.

## Pitfall 1: Script vs. Ladder Execution Order
**Problem:** If you mix Ladder and Script in the same program, the execution order can be confusing.

**Pro Tip:** 
- Use Ladder for discrete logic and interlocks.
- Use Script for complex math and data processing.
- Keep them in separate POUs (Program Organization Units) with clear execution order.
