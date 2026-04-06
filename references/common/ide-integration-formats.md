# IDE Integration and Export Formats

This document defines how to generate PLC code in formats that can be directly imported into vendor-specific IDEs, minimizing manual copy-paste work.

## Goal

When generating PLC code, provide output in a format that:
1. Can be directly imported or pasted into the target IDE
2. Includes proper variable declarations and interfaces
3. Preserves structure and comments
4. Minimizes manual editing after import

## Vendor-Specific Export Formats

### Siemens TIA Portal

#### SCL (Structured Text) Export Format
TIA Portal can import SCL code as external source files.

**Rules:**
- Include complete FB/FC interface declarations
- Use proper SCL syntax with `BEGIN` and `END_FUNCTION_BLOCK`
- Declare all variables in the header section
- Use `//` for comments (not `(*...*)`)

**Example Output:**
```scl
FUNCTION_BLOCK "FB_MotorControl"
{ S7_Optimized_Access := 'TRUE' }
VERSION : 0.1
   VAR_INPUT 
      bStart : Bool;
      bStop : Bool;
      rSpeedSetpoint : Real;
   END_VAR

   VAR_OUTPUT 
      bRunning : Bool;
      bFault : Bool;
      rActualSpeed : Real;
   END_VAR

   VAR 
      statState : Int;
      statTimer : TON;
   END_VAR

BEGIN
   // State machine logic
   CASE statState OF
      0:  // Idle
         bRunning := FALSE;
         IF bStart AND NOT bFault THEN
            statState := 1;
         END_IF;
      
      1:  // Running
         bRunning := TRUE;
         rActualSpeed := rSpeedSetpoint;
         IF bStop THEN
            statState := 0;
         END_IF;
   END_CASE;
END_FUNCTION_BLOCK
```

**Import Instructions:**
1. Save the code as `FB_MotorControl.scl`
2. In TIA Portal: Project tree → External source files → Add new external file
3. Right-click the file → Generate blocks from source

### Rockwell Studio 5000

#### L5X (Logix XML) Format
Studio 5000 uses L5X XML format for import/export.

**Rules:**
- Generate valid L5X XML structure
- Include proper RSLogix5000Content header
- Define all tags in the `<Tags>` section
- Define AOIs with complete parameter lists

**Example Output (Tag Definition):**
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<RSLogix5000Content SchemaRevision="1.0" SoftwareRevision="32.00">
  <Controller Use="Target" Name="MainController">
    <Tags>
      <Tag Name="Motor1_Start" TagType="Base" DataType="BOOL" Radix="Decimal" Constant="false" ExternalAccess="Read/Write">
        <Description>Motor 1 Start Command</Description>
      </Tag>
      <Tag Name="Motor1_Running" TagType="Base" DataType="BOOL" Radix="Decimal" Constant="false" ExternalAccess="Read/Write">
        <Description>Motor 1 Running Status</Description>
      </Tag>
      <Tag Name="ConveyorSpeed" TagType="Base" DataType="REAL" Radix="Float" Constant="false" ExternalAccess="Read/Write">
        <Description>Conveyor Speed Setpoint (m/min)</Description>
      </Tag>
    </Tags>
  </Controller>
</RSLogix5000Content>
```

**Import Instructions:**
1. Save as `Tags_Export.L5X`
2. In Studio 5000: File → Import → Browse to L5X file
3. Select which tags to import

#### Structured Text (ST) for AOI
For Add-On Instructions, provide ST code with proper parameter declarations.

**Example Output:**
```st
// Add-On Instruction: AOI_ValveControl
// Parameters:
//   Input: bOpen (BOOL), bClose (BOOL)
//   Output: bValveOpen (BOOL), bValveClosed (BOOL)
//   InOut: None

// Logic:
IF bOpen AND NOT bClose THEN
    bValveOpen := TRUE;
    bValveClosed := FALSE;
ELSIF bClose AND NOT bOpen THEN
    bValveOpen := FALSE;
    bValveClosed := TRUE;
END_IF;
```

**Import Instructions:**
1. Manually create the AOI in Studio 5000 first (define parameters)
2. Copy the logic section into the AOI's ST editor

### Codesys / Beckhoff TwinCAT / Omron Sysmac

#### PLCopen XML Format
These platforms support PLCopen XML for portable code exchange.

**Rules:**
- Use PLCopen XML schema
- Include POU definitions with complete interfaces
- Preserve data types and structures

**Example Output:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<project xmlns="http://www.plcopen.org/xml/tc6_0200">
  <fileHeader companyName="User" productName="PLC" productVersion="1.0"/>
  <contentHeader name="MotorControl">
    <coordinateInfo>
      <fbd><scaling x="1" y="1"/></fbd>
      <ld><scaling x="1" y="1"/></ld>
      <sfc><scaling x="1" y="1"/></sfc>
    </coordinateInfo>
  </contentHeader>
  <types>
    <dataTypes/>
    <pous>
      <pou name="FB_Motor" pouType="functionBlock">
        <interface>
          <inputVars>
            <variable name="bStart"><type><BOOL/></type></variable>
            <variable name="bStop"><type><BOOL/></type></variable>
          </inputVars>
          <outputVars>
            <variable name="bRunning"><type><BOOL/></type></variable>
          </outputVars>
        </interface>
        <body>
          <ST>
            <xhtml xmlns="http://www.w3.org/1999/xhtml">
IF bStart THEN
    bRunning := TRUE;
END_IF;
IF bStop THEN
    bRunning := FALSE;
END_IF;
            </xhtml>
          </ST>
        </body>
      </pou>
    </pous>
  </types>
</project>
```

**Import Instructions:**
1. Save as `MotorControl.xml`
2. In Codesys/TwinCAT: Project → Import PLCopen XML
3. Select the file and choose which POUs to import

### Delta ISPSoft

#### CSV Tag Export
ISPSoft supports CSV import for tag definitions.

**Example Output:**
```csv
Name,Type,Address,Initial Value,Comment
Motor1_Start,BOOL,M0,,Motor 1 Start Command
Motor1_Stop,BOOL,M1,,Motor 1 Stop Command
Motor1_Running,BOOL,M10,,Motor 1 Running Status
ConveyorSpeed,INT,D100,0,Conveyor Speed (0-1000)
```

**Import Instructions:**
1. Save as `Tags.csv`
2. In ISPSoft: Edit → Import → Device List
3. Select CSV file and map columns

## Best Practices

### When Generating Code for Import

1. **Always include complete interface declarations** - Don't assume the user will manually add VAR_INPUT/VAR_OUTPUT
2. **Use vendor-specific syntax** - Don't mix Codesys syntax into Siemens code
3. **Include comments** - Explain non-obvious logic
4. **Provide import instructions** - Tell the user exactly how to import the generated file
5. **Validate syntax** - Ensure the code will compile without errors

### When User Requests "Code for [Vendor]"

1. Ask: "Do you want plain ST code, or an importable format (SCL/L5X/PLCopen XML)?"
2. If they want importable format, generate the appropriate wrapper
3. Always provide the file extension (e.g., `.scl`, `.L5X`, `.xml`)

---
**References:**
- Siemens TIA Portal: External Source Files documentation
- Rockwell: Logix5000 Import/Export Reference Manual
- PLCopen: Technical Committee 6 XML Schemas