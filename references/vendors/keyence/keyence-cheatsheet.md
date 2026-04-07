# Keyence (KV Studio / KV Series) Cheatsheet

## Memory Areas
Keyence relies heavily on literal device addressing within KV Studio.

| Device | Name | Description |
| :--- | :--- | :--- |
| **R** | Relay (I/O) | External I/O and standard bit memory (e.g., `R000`, `R500`) |
| **MR** | Internal Relay | Internal bit memory, specifically for program usage |
| **LR** | Latch Relay | Battery-backed bit memory (retains state on power cycle/loss) |
| **CR** | Control Relay | Special system relays (e.g., `CR2002` = Always ON, `CR2003` = First Scan) |
| **T** | Timer | Timer contact flag and current elapsed value |
| **C** | Counter | Counter contact flag and current count value |
| **DM** | Data Memory | Standard 16-bit data register (e.g., `DM0` to `DM65535`) |
| **EM** | Extended Memory| Additional 16-bit data banks, requires bank specification |

## Data Types / Suffixes
KV Studio instructions append suffixes to denote the data width being evaluated.
| Suffix | Size | Example Use |
| :--- | :--- | :--- |
| **.B** | Bit / Byte | `MOV.B` (Moves 8-bit data) |
| **.W** | Word (16-bit) | `MOV.W` or simply `MOV` (Default 16-bit move) |
| **.D** | Double (32-bit)| `MOV.D` (Moves 32-bit data utilizing `DM0` and `DM1`) |
| **.L** | Long / Float | Floating-point operations or 64-bit integer context |

## Specific Instruction Formats
Keyence instructions generally follow an `[Instruction] [Source] [Destination]` or `[Instruction] [Source1] [Source2] [Destination]` format.

- **`MOV` / `MOV.D` (Move Data):** 
  - Example: `MOV #100 DM0` (Moves decimal 100 into DM0). 
  - *Constants:* Hex uses `$`, Decimal uses `#`.
- **`WAND` / `WAND.D` (Word AND):** 
  - Logical AND operation on words.
  - Example: `WAND DM100 #$00FF DM102` (Masks upper byte of DM100, stores result in DM102).
- **`SFT` (Shift Register):**
  - Shifts bits sequentially through a defined range of relays.
  - Requires three inputs: Data input, Clock input (trigger), and Reset input.
- **`RES` / `SET`:** 
  - Bit-level Set and Reset commands. 
  - Can specify ranges to bulk-reset at once using `RES [Start] [End]`.