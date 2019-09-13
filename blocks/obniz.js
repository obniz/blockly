'use strict';

goog.provide('Blockly.Obniz');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.PXTBlockly.Extensions');
Blockly.HSV_SATURATION = 0.844;
Blockly.HSV_VALUE = 0.703;


Blockly.OBNIZ_CATEGORY_NAME = 'OBNIZ_DYNAMIC';
Blockly.Obniz.VariablesOfTypeName = "obniz";
Blockly.Obniz.DefaultVariableName = "obniz";
Blockly.Obniz.Msg = Blockly.Obniz.Msg || {};
Blockly.Obniz.Msg.OBNIZ_HUE = 190;
Blockly.Msg.OBNIZ_HUE = 190;


Blockly.Obniz.registerFunction = function(data){
  let {functionName, params, code, ja, en, output, colour} = data;
  params = params || [];
  var args = [];
  args.push(...params);

  var msg = Blockly.Msg.ja !== undefined ? ja:en;
  Blockly.defineBlocksWithJsonArray([
    {
      "type": functionName.toLowerCase(),
      "message0": msg,
      "args0": args,
      "colour":  colour,
      "tooltip": "",
      "helpUrl": "",
      "output" : output !== undefined ? output : undefined,
      "outputShape": output && output.toLowerCase() == "boolean" ? Blockly.OUTPUT_SHAPE_HEXAGONAL : undefined,
      "previousStatement":   output !== undefined  ? undefined : null,
      "nextStatement":   output !== undefined  ? undefined : null,
    }
  ]);


  Blockly.JavaScript[functionName.toLowerCase()] = function(block) {

    var results = code;
    params.forEach((el,index)=>{

      var v;
      if(el.type == "field_variable" ) {
        v = Blockly.JavaScript.variableDB_.getName(block.getField(el.name).getText(), Blockly.Variables.NAME_TYPE);
      }else if(el.type == "field_dropdown" ){
        v = block.getFieldValue(el.name);
      }else{
        v = Blockly.JavaScript.valueToCode(block, el.name, Blockly.JavaScript.ORDER_ATOMIC);
      }
      results = results.split("%"+(index+1)).join(v);
    });

    return  output ? [results,  Blockly.JavaScript.ORDER_MEMBER] : results + ";\n";
  };


};


Blockly.defineBlocksWithJsonArray([

  {
    "type": "variables_get_obniz",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      }
    ],
    "output": Blockly.Obniz.VariablesOfTypeName,    // Returns a value of "Panda"
  },

// Block for Panda variable setter.
  {
    "type": "variables_set_obniz",
    "message0": "%{BKY_VARIABLES_SET}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": Blockly.Obniz.VariablesOfTypeName    // Checks that the input value is of type "Panda"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
  },
  {
    "type": "obniz_connect",
    "message0":   Blockly.Msg.ja !== undefined ? " %1 を obniz id: %2 に接続する" :"Connect  %1 with obniz id: %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "obniz",
        "variable": Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      },
      {
        "type": "input_value",
        "name": "obniz_id",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Obniz.Msg.OBNIZ_HUE,
    "tooltip": "Connect to obniz id",
    "helpUrl": ""
  },
  {
    "type": "obniz_connect_access_token",
    "message0":   Blockly.Msg.ja !== undefined ? " %1 を obniz id: %2 に AccessToken %3 で接続する" :"Connect %1 with obniz id: %2, AccessToken %3",
    "args0": [
      {
        "type": "field_variable",
        "name": "obniz",
        "variable": Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      },
      {
        "type": "input_value",
        "name": "obniz_id",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "access_token",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Obniz.Msg.OBNIZ_HUE,
    "tooltip": "Connect to obniz id",
    "helpUrl": ""
  },
  {
    "type": "obniz_wait",
    "message0":  Blockly.Msg.ja !== undefined ? "%2 で %1 ms 待つ" :"Wait %1 ms on %2",
    "args0": [
      {
        "type": "input_value",
        "name": "time",
        "check": "Number"
      },
      {
        "type": "field_variable",
        "name": "obniz",
        "variable": Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Obniz.Msg.OBNIZ_HUE,
    "tooltip": "Connect to obniz id",
    "helpUrl": ""
  },
  {
    "type": "obniz_repeat",
    "message0":  Blockly.Msg.ja !== undefined ? "%1がつながってる間 繰り返す" :"repeat while %1 is online",
    "args0": [
      {
        "type": "field_variable",
        "name": "obniz",
        "variable": Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      }],
    "message1": " %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": undefined,
    "colour":  Blockly.Obniz.Msg.OBNIZ_HUE,
    "tooltip": "",
    "helpUrl": "",

  },
]);


Blockly.defineBlocksWithJsonArray([
  {
    "type": "obniz_display_clear",
    "message0": Blockly.Msg.ja !== undefined ? " %1 のディスプレイを消す" : "Clear display on %1",
    "args0": [
      {
        "type": "field_variable",
        "name": "obniz",
        "variable":  Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Obniz.Msg.OBNIZ_HUE,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "obniz_display_print",
    "message0": Blockly.Msg.ja !== undefined ? "  %2 に %1 を表示する" :  "Print %1 on %2",
    "args0": [
      {
        "type": "input_value",
        "name": "print_text",
        "check": ["String","Number"]
      },
      {
        "type": "field_variable",
        "name": "obniz",
        "variable": Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Obniz.Msg.OBNIZ_HUE,
    "tooltip": "",
    "helpUrl": ""
  }
]);


Blockly.JavaScript['string_length'] = function(block) {
  // String or array length.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['obniz_connect'] = function(block) {
  var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
      Blockly.Variables.NAME_TYPE);
  // var value_obniz = Blockly.JavaScript.valueToCode(block, 'obniz', Blockly.JavaScript.ORDER_ATOMIC);
  var value_id = Blockly.JavaScript.valueToCode(block, 'obniz_id', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `${value_obniz} = new Obniz(${value_id});\nawait ${value_obniz}.connectWait();\n`;
  return code;
};
Blockly.JavaScript['obniz_connect_access_token'] = function(block) {
  var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
      Blockly.Variables.NAME_TYPE);
  // var value_obniz = Blockly.JavaScript.valueToCode(block, 'obniz', Blockly.JavaScript.ORDER_ATOMIC);
  var value_id = Blockly.JavaScript.valueToCode(block, 'obniz_id', Blockly.JavaScript.ORDER_ATOMIC);
  var token = Blockly.JavaScript.valueToCode(block, 'access_token', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `${value_obniz} = new Obniz(${value_id}, { access_token:${token}});\nawait ${value_obniz}.connectWait();\n`;
  return code;
};

Blockly.JavaScript['obniz_wait'] = function(block) {
  var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
      Blockly.Variables.NAME_TYPE);
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `await ${value_obniz}.wait(${time});\n`;
  return code;
};


Blockly.JavaScript['obniz_display_clear'] = function(block) {
  var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
      Blockly.Variables.NAME_TYPE);

  var code = `${value_obniz}.display.clear();\n`;
  return code;
};

Blockly.JavaScript['obniz_display_print'] = function(block) {
  var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
      Blockly.Variables.NAME_TYPE);
  var value_id = Blockly.JavaScript.valueToCode(block, 'print_text', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `${value_obniz}.display.print(${value_id})\n`;
  return code;
};



Blockly.Obniz.createButtonHandler = function(typeName){
  return  (button)=> {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, typeName);
  };
}


Blockly.Obniz.variableButton = function(button) {
  Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Obniz.VariablesOfTypeName);
};

Blockly.Obniz.parts = [];
Blockly.Obniz.registerParts = function(buttonName,typeName,partsName){
  Blockly.Obniz.parts.push(
      {
        buttonName,
        typeName,
        partsName
      }
  )
  Blockly.Obniz.Msg = Blockly.Obniz.Msg || {};
  Blockly.Obniz.Msg["CREATE_BUTTON_"+partsName.toUpperCase()] =
      Blockly.Msg.ja !== undefined ? `${partsName}の作成` :`Create ${partsName} variable`;



}

Blockly.Obniz.setupToWorkspace = function(workspace,headless) {
  // workspace.registerToolboxCategoryCallback(Blockly.OBNIZ_CATEGORY_NAME,
  //     Blockly.Obniz.flyoutCategory);
  if(!headless){
    workspace.registerButtonCallback("obnizVariableButton", Blockly.Obniz.createButtonHandler( Blockly.Obniz.VariablesOfTypeName));
    for(let part of Blockly.Obniz.parts){
      workspace.registerButtonCallback(part.buttonName, Blockly.Obniz.createButtonHandler( part.typeName));
    }
    // workspace.createVariable("obniz", Blockly.Obniz.VariablesOfTypeName);

  }

};




Blockly.JavaScript['math_number_minmax'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('SLIDER'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC :
      Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};


Blockly.JavaScript['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.JavaScript.prefixLines(
        Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
            '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
      Blockly.JavaScript.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = Blockly.JavaScript.INDENT + 'return ' + returnValue + ';\n';
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.JavaScript.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = 'async function ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.JavaScript['procedures_defnoreturn'] =
    Blockly.JavaScript['procedures_defreturn'];

Blockly.JavaScript['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var code = 'await '+funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var code = 'await '+funcName + '(' + args.join(', ') + ');\n';
  return code;
};


Blockly.defineBlocksWithJsonArray([
  {
    "type": "obniz_switch",
    "message0": Blockly.Msg.ja !== undefined ? " %1 のスイッチが %2" : " %2 switch on %1",
    "args0": [
      {
        "type": "field_variable",
        "name": "obniz",
        "variable":  Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      },
      {
        "name" : "state",
        "type" :  "field_dropdown",
        "options":
            [
              [Blockly.Msg.ja !== undefined ?"押されている":"Pressed", "push"],
              [Blockly.Msg.ja !== undefined ?"右に押されている":"Pressed to right", "right"],
              [Blockly.Msg.ja !== undefined ?"左に押されている":"Pressed to left", "left"],
              [Blockly.Msg.ja !== undefined ?"押されていない":"Not pressed", "none"],
            ]
      }
    ],
    "output" : "Boolean",
    "outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL,
    "previousStatement": undefined,
    "nextStatement": undefined,
    "colour": Blockly.Obniz.Msg.OBNIZ_HUE,
    "tooltip": "",
    "helpUrl": ""
  }]
);

Blockly.JavaScript['obniz_switch'] = function(block) {
  // Numeric value.
  var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
      Blockly.Variables.NAME_TYPE);
  var state = block.getFieldValue("state");

  var code = `(await ${value_obniz}.switch.getWait() == '${state}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



Blockly.Obniz.Msg.OBNIZ_PERIPHERAL_HUE = 200;

Blockly.Obniz.createPinList = function(prefix){
  prefix = prefix || "io";
  return [
    [prefix +  "0", "0"],
    [prefix +  "1", "1"],
    [prefix +  "2", "2"],
    [prefix +  "3", "3"],
    [prefix +  "4", "4"],
    [prefix +  "5", "5"],
    [prefix +  "6", "6"],
    [prefix +  "7", "7"],
    [prefix +  "8", "8"],
    [prefix +  "9", "9"],
    [prefix + "10","10"],
    [prefix + "11","11"],
  ]
}

Blockly.defineBlocksWithJsonArray([
  {
    "type": "obniz_io_output",
    "message0": Blockly.Msg.ja !== undefined ? " %1 の %2 の出力を %3 にする" : "output %3 on %2 of %1 ",
    "args0": [
      {
        "type": "field_variable",
        "name": "obniz",
        "variable":  Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      },
      {
        "name" : "pin",
        "type" :  "field_dropdown",
        "options": Blockly.Obniz.createPinList("io"),
      },
      {
        "name" : "state",
        "type" :  "field_dropdown",
        "options": [["on","true"],["off","false"]],
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Obniz.Msg.OBNIZ_PERIPHERAL_HUE,
    "tooltip": "",
    "helpUrl": ""
  },{
    "type": "obniz_io_input",
    "message0": Blockly.Msg.ja !== undefined ? " %1 の %2 の入力値" : "input value on %2 of %1 ",
    "args0": [
      {
        "type": "field_variable",
        "name": "obniz",
        "variable":  Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      },
      {
        "name" : "pin",
        "type" :  "field_dropdown",
        "options": Blockly.Obniz.createPinList("io"),
      }
    ],
    "output" : "Boolean",
    "outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL,
    "previousStatement": undefined,
    "nextStatement": undefined,
    "colour": Blockly.Obniz.Msg.OBNIZ_PERIPHERAL_HUE,
    "tooltip": "",
    "helpUrl": ""
  },{
    "type": "obniz_ad_input",
    "message0": Blockly.Msg.ja !== undefined ? " %1 の %2 のアナログ値" : "analog value on %2 of %1 ",
    "args0": [
      {
        "type": "field_variable",
        "name": "obniz",
        "variable":  Blockly.Obniz.DefaultVariableName,
        "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
        "defaultType": Blockly.Obniz.VariablesOfTypeName,
      },
      {
        "name" : "pin",
        "type" :  "field_dropdown",
        "options": Blockly.Obniz.createPinList("ad"),
      }
    ],
    "output" : "Number",
    "previousStatement": undefined,
    "nextStatement": undefined,
    "colour": Blockly.Obniz.Msg.OBNIZ_PERIPHERAL_HUE,
    "tooltip": "",
    "helpUrl": ""
  }
  ]);

Blockly.JavaScript['obniz_io_output'] = function(block) {
  // Numeric value.
  var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
      Blockly.Variables.NAME_TYPE);
  var pin = block.getFieldValue("pin");
  var state = block.getFieldValue("state");

  var code = `${value_obniz}.io${pin}.output(${state});\n`;
  return code;
};


Blockly.JavaScript['obniz_io_input'] = function(block) {
  // Numeric value.
  var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
      Blockly.Variables.NAME_TYPE);
  var pin = block.getFieldValue("pin");

  var code = `(await ${value_obniz}.io${pin}.inputWait())`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



Blockly.JavaScript['obniz_ad_input'] = function(block) {
  // Numeric value.
  var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
      Blockly.Variables.NAME_TYPE);
  var pin = block.getFieldValue("pin");

  var code = `(await ${value_obniz}.ad${pin}.getWait())`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



