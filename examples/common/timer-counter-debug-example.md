# Timer counter debug example

## User prompt

“这段 GX Works2 里的 ST 逻辑为什么定时器一直不到位，或者计数器一直不到目标值？帮我分析可能是使能条件、复位路径还是写法问题。”

## Expected skill behavior

- inspect enable condition first
- inspect reset path second
- inspect done-dependent transition logic third
- avoid assuming the timer or counter itself is faulty

## Why this example matters

This reinforces correct troubleshooting order for FX3U logic.
