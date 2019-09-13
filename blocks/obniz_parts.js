'use strict';

goog.provide('Blockly.ObnizParts');

goog.require('Blockly.Obniz');
goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.JavaScript');
goog.require('Blockly.PXTBlockly.Extensions');

Blockly.Msg.OBNIZ_PARTS_LED_HUE = 100;
Blockly.ObnizParts = Blockly.ObnizParts || {};


Blockly.ObnizParts.registerObject = function (data) {


  let {className, defaultName} = data;
  Blockly.ObnizParts[className] =  Blockly.ObnizParts[className] || {};
  Blockly.ObnizParts[className].DefaultVariableName = defaultName;
  Blockly.ObnizParts[className].VariablesOfTypeName = className;
  Blockly.ObnizParts.registerObjFunction(data);

  Blockly.Obniz.registerParts(`obniz${className.charAt(0).toUpperCase() + className.slice(1)}VariableButton`,
      Blockly.ObnizParts[className].VariablesOfTypeName,className);

};

Blockly.ObnizParts.registerObjFunction = function (data) {

  let {className} = data;
  data.params.unshift({
    "type": "field_variable",
    "name": className,
    "variable": Blockly.ObnizParts[className].DefaultVariableName,
    "variableTypes": [Blockly.ObnizParts[className].VariablesOfTypeName],
    "defaultType": Blockly.ObnizParts[className].VariablesOfTypeName,
  });

  Blockly.Obniz.registerFunction(data);

};

Blockly.ObnizParts.registerWiredFunction = function (partsName, hue, params, codeFunction) {

  Blockly.ObnizParts[partsName] = Blockly.ObnizParts[partsName] || {};
  Blockly.ObnizParts[partsName].DefaultVariableName = partsName.toLowerCase();
  Blockly.ObnizParts[partsName].VariablesOfTypeName = partsName.toLowerCase();
  Blockly.ObnizParts[partsName].HUE = hue;
  Blockly.Obniz.Msg["OBNIZ_PARTS_"+partsName.toUpperCase() +"_HUE"] = hue;

  params = params.map((el,index)=>{
    return {
      name : el.name,
      type : el.type || "input_value",
      check :  el.check|| "Number",
      value: index,
    }
  });

  var paramMessage = params.map((el,index)=>{
    return `${el.name}:%${index+1}`
  }).join(" ");
  var message0 =  Blockly.Msg.ja !== undefined ?
      `%2 に %1 を接続する`:`%1 wired on %2`;


  var args = [];
  args.push({
    "type": "field_variable",
    "name": partsName,
    "variable": Blockly.ObnizParts[partsName].DefaultVariableName,
    "variableTypes": [Blockly.ObnizParts[partsName].VariablesOfTypeName],
    "defaultType": Blockly.ObnizParts[partsName].VariablesOfTypeName,
  });

  args.push({
    "type": "field_variable",
    "name": "obniz",
    "variable": Blockly.Obniz.DefaultVariableName,
    "variableTypes": [Blockly.Obniz.VariablesOfTypeName],
    "defaultType": Blockly.Obniz.VariablesOfTypeName,
  });

  // args.push(...params);
  Blockly.defineBlocksWithJsonArray([
    {
      "type": `obniz_parts_${partsName.toLowerCase()}_wired`,
      "message0":message0,
      "args0": args,
      "message1":  paramMessage ,
      "args1": params,
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour":  Blockly.ObnizParts[partsName].HUE ,
      "tooltip": "",
      "helpUrl": ""
    }]);


  Blockly.Obniz.registerParts(`obniz${partsName.charAt(0).toUpperCase() + partsName.slice(1)}VariableButton`,
      Blockly.ObnizParts[partsName].VariablesOfTypeName,partsName);



  Blockly.JavaScript[`obniz_parts_${partsName.toLowerCase()}_wired`] = codeFunction || function(block) {
    var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
        Blockly.Variables.NAME_TYPE);
    var value = Blockly.JavaScript.variableDB_.getName(block.getField(partsName).getText(),
        Blockly.Variables.NAME_TYPE);

    var wiredParams = [];
    params.forEach((el,index)=>{
      var  v = Blockly.JavaScript.valueToCode(block, el.name, Blockly.JavaScript.ORDER_ATOMIC);
      wiredParams.push(`"${el.name}":${v}`)
    });

    var code = `${value} = ${value_obniz}.wired("${partsName}",{${wiredParams.join(", ")}});\n`;
    return code;
  };

};


Blockly.ObnizParts.registerFunction = function(data){
  let {partsName,functionName, params, code, ja, en, output,mutator} = data;
  params = params || [];
  var args = [];
  args.push({
    "type": "field_variable",
    "name": partsName,
    "variable": Blockly.ObnizParts[partsName].DefaultVariableName,
    "variableTypes": [Blockly.ObnizParts[partsName].VariablesOfTypeName],
    "defaultType": Blockly.ObnizParts[partsName].VariablesOfTypeName,
  });

  args.push(...params);

  Blockly.Obniz.registerFunction({
    functionName : `obniz_parts_${partsName.toLowerCase()}_${functionName.toLowerCase()}`,
    params  :args,
    code, ja, en, output,
    colour : Blockly.ObnizParts[partsName].HUE
  })

}


Blockly.ObnizParts.registerWiredFunction("uart",
    Blockly.Obniz.Msg.OBNIZ_PERIPHERAL_HUE,
    [{name:"rx"},{name:"tx"},{name:"baud"}],
    function(block) {
      var value_obniz = Blockly.JavaScript.variableDB_.getName(block.getField('obniz').getText(),
          Blockly.Variables.NAME_TYPE);
      var value = Blockly.JavaScript.variableDB_.getName(block.getField('uart').getText(),
          Blockly.Variables.NAME_TYPE);

      var rx = Blockly.JavaScript.valueToCode(block, "rx", Blockly.JavaScript.ORDER_ATOMIC);
      var tx = Blockly.JavaScript.valueToCode(block, "tx", Blockly.JavaScript.ORDER_ATOMIC);
      var baud = Blockly.JavaScript.valueToCode(block, "baud", Blockly.JavaScript.ORDER_ATOMIC);

      var code = `${value} = ${value_obniz}.getFreeUart();\nuart.start({rx: ${rx}, tx: ${tx}, baud:${baud}});\n`;
      return code;
    });

Blockly.ObnizParts.registerFunction({
  partsName: "uart",
  functionName: "send_string",
  params: [{name : "text", type :  "input_value", check : "String"}],
  code : "%1.send([ ...%2].map(e=>e.charCodeAt(0)))",
  en:"%1 send text %2",
  ja:"%1 で文字 %2 を送る",
});

Blockly.ObnizParts.registerFunction({
  partsName: "uart",
  functionName: "send_number",
  params: [{name : "num", type :  "input_value", check : "Number"}],
  code :   "%1.send([%2])",
  en:"%1 send %2",
  ja:"%1 で数字 %2 を送る",
});

Blockly.ObnizParts.registerFunction({
  partsName: "uart",
  output : "Boolean",
  functionName: "is_data_exists",
  code :   "%1.isDataExists()",
  en:"%1 data exists",
  ja:"%1 がデータを受信している",
});

Blockly.ObnizParts.registerFunction({
  partsName: "uart",
  output : "String",
  functionName: "read_text",
  code :   "%1.readText()",
  en:"text received by %1",
  ja:"%1 が受信した文字",
});
Blockly.ObnizParts.registerFunction({
  partsName: "uart",
  output : "Number",
  functionName: "read_number",
  code :   "%1.received.shift()",
  en:"text received by %1",
  ja:"%1 が受信した数字",
});



Blockly.ObnizParts.registerWiredFunction("LED",58,[
    {"name": "anode"},
    {"name": "cathode"}
    ]);

Blockly.ObnizParts.registerFunction({
  partsName: "LED",
  functionName: "on",
  params: [],
  code : "%1.on()",
  en:"Turn on %1",
  ja:"%1を光らせる",
});


Blockly.ObnizParts.registerFunction({
  partsName: "LED",
  functionName: "off",
  params: [],
  code : "%1.off()",
  en:"Turn off %1",
  ja:"%1を消す",
});



Blockly.ObnizParts.registerFunction({
  partsName: "LED",
  functionName: "blink",
  params: [ {name : "time", type :  "input_value", check :  "Number"}],
  code : "%1.blink(%2)",
  en:"Blink %2 ms on %1",
  ja:"%1を %2 ms間隔で点滅させる",
});




Blockly.ObnizParts.registerWiredFunction("DCMotor",345,[
  {"name": "forward"},
  {"name": "back"}
]);

Blockly.ObnizParts.registerFunction({
  partsName: "DCMotor",
  functionName: "move",
  params: [ {name : "direction", type :  "field_dropdown", options: [["forward", "true"], ["back", "false"]]}],
  code : "%1.move(%2)",
  en:"%1 move to %2",
  ja:"%1を%2へ回転させる",
});

Blockly.ObnizParts.registerFunction({
  partsName: "DCMotor",
  functionName: "stop",
  params: [],
  code : "%1.stop()",
  en:"%1 stop",
  ja:"%1を止める",
});

Blockly.ObnizParts.registerFunction({
  partsName: "DCMotor",
  functionName: "power",
  params: [ {name : "power", type :  "input_value", check :  "Number", "min": 0, "value": 50, "max": 100, "step": 1}],
  code : "%1.power(%2)",
  en:"Set power of %1 to %2 %",
  ja:"%1 のパワーを %2 %に設定する",
  mutator: "math_number_minmax_mutator",
});



Blockly.ObnizParts.registerWiredFunction("ServoMotor",345,[
  {"name": "signal"},
  {"name": "vcc"},
  {"name": "gnd"},
]);

Blockly.ObnizParts.registerFunction({
  partsName: "ServoMotor",
  functionName: "angle",
  params: [ {name : "angle", type :  "input_value", check :  "Number", "min": 0, "value": 90, "max": 180, "precision": 1}],
  code : "%1.angle(%2)",
  en:"Set angle of %1 to %2 degree",
  ja:"%1 の角度を %2 度に設定する",
});


Blockly.ObnizParts.registerWiredFunction("GP2Y0A21YK0F",203,[
  {"name": "vcc"},
  {"name": "gnd"},
  {"name": "signal"},
]);


Blockly.ObnizParts.registerFunction({
  partsName: "GP2Y0A21YK0F",
  functionName: "distance",
  output: "Number",
  params: [],
  code : "await %1.getWait()",
  en:"distance(mm) measured by %1 ",
  ja:"%1 の計測距離(mm)",
});


Blockly.ObnizParts.registerWiredFunction("KXR94-2050",203,[
  {"name": "vcc"},
  {"name": "gnd"},
  {"name": "x"},
  {"name": "y"},
  {"name": "z"},
  {"name": "enable"},
  {"name": "self_test"},
]);


Blockly.ObnizParts.registerFunction({
  partsName: "KXR94-2050",
  functionName: "acceleration",
  output: "Number",
  params: [ {
    "name" : "direction",
    "type" :  "field_dropdown",
    "options":
        [
          [Blockly.Msg.ja !== undefined ?"X軸":"X", "x"],
          [Blockly.Msg.ja !== undefined ?"Y軸":"Y", "y"],
          [Blockly.Msg.ja !== undefined ?"Z軸":"Z", "z"],
        ]
  }],
  code : "(await %1.getWait()).%2",
  en:"acceleration %2(G) measured by %1 ",
  ja:"%1 の加速度 %2(G)",
});


Blockly.ObnizParts.registerWiredFunction("Button",203,[
  {"name": "signal"},
  {"name": "gnd"},
]);


Blockly.ObnizParts.registerFunction({
  partsName: "Button",
  functionName: "pressed",
  output: "Boolean",
  params: [],
  code : "(await button.isPressedWait())",
  en:"%1 is pressed",
  ja:"%1 が押されている",
});



Blockly.ObnizParts.registerWiredFunction("IoTHomeKit",180,[]);

Blockly.ObnizParts.registerFunction({
  partsName: "IoTHomeKit",
  functionName: "whether",
  output: "String",
  params: [{name : "locale", type :  "input_value", check : "String"}],
  code : "await %1.getWeather(%2)",
  en:"Get whether of %1 ",
  ja:"%1 の天気",
});

Blockly.ObnizParts.registerFunction({
  partsName: "IoTHomeKit",
  functionName: "distance",
  output: "Number",
  params: [],
  code : "%1.getDistance()",
  en:"distance(mm) measured by %1 ",
  ja:"%1 の計測距離(mm)",
});



Blockly.ObnizParts.registerFunction({
  partsName: "IoTHomeKit",
  functionName: "flag",
  params: [ {name : "flag", type :  "field_dropdown",
    options: [[Blockly.Msg.ja !== undefined ?"上げる":"up", "up"], [Blockly.Msg.ja !== undefined ?"下げる":"down", "down"]]}],
  code : "%1.flag('%2')",
  en:"Put %2 the flag on %1",
  ja:"%1の旗を%2",
});

Blockly.ObnizParts.registerFunction({
  partsName: "IoTHomeKit",
  functionName: "proximity",
  params: [ {name : "flag", type :  "field_dropdown",
    options:
        [
          [Blockly.Msg.ja !== undefined ?"間近":"immidiate", "immidiate"],
          [Blockly.Msg.ja !== undefined ?"近く":"near", "near"],
          [Blockly.Msg.ja !== undefined ?"遠く":"far", "far"],
        ]}],
  output : "Boolean",
  code : "(%1.getProximity() == '%2')",
  en:"%1 detect something %2",
  ja:"%1の %2 に物がある",
});

Blockly.ObnizParts.registerFunction({
  partsName: "IoTHomeKit",
  functionName: "save",
  params: [
    {name : "key", type :  "input_value", check : "String"},
    {name : "value", type :  "input_value", check : "Array"}],
  code : "(await %1.saveToStorage(%2,%3))",
  en:"Save signal %3 as %2 to %1",
  ja:"%1 に赤外線信号 %3 を %2 として保存する",
});

Blockly.ObnizParts.registerFunction({
  partsName: "IoTHomeKit",
  functionName: "load",
  params: [
    {name : "key", type :  "input_value", check : "String"}],
  output : "Array",
  code : "(await %1.loadFromStorage(%2))",
  en:"Load signal %2 from %1",
  ja:"%1 から赤外線信号 %2 をロードする",
});

Blockly.ObnizParts.registerFunction({
  partsName: "IoTHomeKit",
  functionName: "get_ir",
  params: [],
  output : "Array",
  code : "(await %1.getIrWait())",
  en:"Receive ir signal with %1",
  ja:"%1 で赤外線を受信する",
});

Blockly.ObnizParts.registerFunction({
  partsName: "IoTHomeKit",
  functionName: "send_ir",
  params: [{name : "key", type :  "input_value", check : "Array"}],
  code : "%1.irSend(%2)",
  en:"Send ir signal %2 with %1",
  ja:"%1 から %2 の赤外線を送信する",
});


Blockly.ObnizParts.registerWiredFunction("AIRobotKit",180,[]);

Blockly.ObnizParts.registerFunction({
  partsName: "AIRobotKit",
  functionName: "move",
  params: [ {name : "flag", type :  "field_dropdown",
    options:
        [
          [Blockly.Msg.ja !== undefined ?"前":"forward", "forward"],
          [Blockly.Msg.ja !== undefined ?"後ろ":"back", "back"],
        ]}],
  code : "%1.move('%2')",
  en:"%1 move to %2 ",
  ja:"%1 を %2 へ動かす",
});

Blockly.ObnizParts.registerFunction({
  partsName: "AIRobotKit",
  functionName: "turn",
  params: [ {name : "flag", type :  "field_dropdown",
    options:
        [
          [Blockly.Msg.ja !== undefined ?"右":"right", "right"],
          [Blockly.Msg.ja !== undefined ?"左":"left", "left"],
        ]}],
  code : "%1.turn('%2')",
  en:"%1 turn to %2 ",
  ja:"%1 が %2 へ向く",
});

Blockly.ObnizParts.registerFunction({
  partsName: "AIRobotKit",
  functionName: "motor",
  params: [
    {name : "leftpower", type :  "input_value", check :  "Number", "min": -100, "value": 60, "max": 100},
    {name : "rightpower", type :  "input_value", check :  "Number", "min": -100, "value": 60, "max": 100}
  ],
  code : "%1.move(%2, %3)",
  en:"%1 rotate motors left %2 right %3",
  ja:"%1 が 左モーター回転 %2 右モーター回転 %3",
});


Blockly.ObnizParts.registerFunction({
  partsName: "AIRobotKit",
  functionName: "stop",
  params: [ ],
  code : "%1.stop()",
  en:"Stop %1",
  ja:"%1 を 止める",
});


Blockly.ObnizParts.registerFunction({
  partsName: "AIRobotKit",
  functionName: "proximity",
  params: [ {name : "flag", type :  "field_dropdown",
    options:
        [
          [Blockly.Msg.ja !== undefined ?"間近":"immidiate", "immidiate"],
          [Blockly.Msg.ja !== undefined ?"近く":"near", "near"],
          [Blockly.Msg.ja !== undefined ?"遠く":"far", "far"],
        ]}],
  output : "Boolean",
  code : "(%1.getProximity() == '%2')",
  en:"%1 detect something %2",
  ja:"%1の %2 に物がある",
});



Blockly.ObnizParts.registerFunction({
  partsName: "AIRobotKit",
  functionName: "distance",
  output: "Number",
  params: [],
  code : "%1.getDistance()",
  en:"distance(mm) measured by %1 ",
  ja:"%1 の計測距離(mm)",
});
