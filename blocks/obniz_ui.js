'use strict';

goog.provide('Blockly.ObnizUI');

goog.require('Blockly.Obniz');
goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.JavaScript');
goog.require('Blockly.PXTBlockly.Extensions');


Blockly.ObnizUI.Button = Blockly.ObnizUI.Button  || {};
Blockly.ObnizUI.Button.DefaultVariableName = "button";
Blockly.ObnizUI.Button.VariablesOfTypeName = "UIButton";

Blockly.ObnizUI.Label = Blockly.ObnizUI.Label  || {};
Blockly.ObnizUI.Label.DefaultVariableName = "label";
Blockly.ObnizUI.Label.VariablesOfTypeName = "UILabel";

Blockly.ObnizUI.Slider = Blockly.ObnizUI.Slider  || {};
Blockly.ObnizUI.Slider.DefaultVariableName = "slider";
Blockly.ObnizUI.Slider.VariablesOfTypeName = "UISlider";

Blockly.ObnizUI.Image = Blockly.ObnizUI.Image  || {};
Blockly.ObnizUI.Image.DefaultVariableName = "image";
Blockly.ObnizUI.Image.VariablesOfTypeName = "UIImage";

Blockly.Obniz.Msg.OBNIZ_UI_HUE = "300";




Blockly.defineBlocksWithJsonArray([


  {
    "type": "obniz_ui_button",
    "message0":   Blockly.Msg.ja !== undefined ? " %1 を %2 で作る" :"Create %1 with %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "button",
        "variable": Blockly.ObnizUI.Button.DefaultVariableName,
        "variableTypes": [Blockly.ObnizUI.Button.VariablesOfTypeName],
        "defaultType": Blockly.ObnizUI.Button.VariablesOfTypeName,
      },
      {
        "type": "input_value",
        "name": "text",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Obniz.Msg.OBNIZ_UI_HUE,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "obniz_ui_button_click",
    "message0":  Blockly.Msg.ja !== undefined ? "%1がクリックされた" :"%1 clicked",
    "args0": [{
      "type": "field_variable",
      "name": "button",
      "variable": Blockly.ObnizUI.Button.DefaultVariableName,
      "variableTypes": [Blockly.ObnizUI.Button.VariablesOfTypeName],
      "defaultType": Blockly.ObnizUI.Button.VariablesOfTypeName,
    },
    ],
    "output" : "Boolean",
    "previousStatement": undefined,
    "nextStatement": undefined,
    "colour": Blockly.Obniz.Msg.OBNIZ_UI_HUE,
    "tooltip": "Connect to obniz id",
    "helpUrl": "",
    "outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL,
  },
  {
    "type": "obniz_ui_button_touch",
    "message0":  Blockly.Msg.ja !== undefined ? "%1が押されている" :"%1 is touching",
    "args0": [{
      "type": "field_variable",
      "name": "button",
      "variable": Blockly.ObnizUI.Button.DefaultVariableName,
      "variableTypes": [Blockly.ObnizUI.Button.VariablesOfTypeName],
      "defaultType": Blockly.ObnizUI.Button.VariablesOfTypeName,
    },
    ],
    "output" : "Boolean",
    "previousStatement": undefined,
    "nextStatement": undefined,
    "colour": Blockly.Obniz.Msg.OBNIZ_UI_HUE,
    "tooltip": "Connect to obniz id",
    "helpUrl": "",
    "outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL,
  }
]);


Blockly.Obniz.registerParts(`obnizUIButtonVariableButton`,
    Blockly.ObnizUI.Button.VariablesOfTypeName,Blockly.ObnizUI.Button.VariablesOfTypeName);





Blockly.JavaScript['obniz_ui_button'] = function(block) {
  var button = Blockly.JavaScript.variableDB_.getName(block.getField('button').getText(),
      Blockly.Variables.NAME_TYPE);
  var value_id = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `${button} = new ObnizUI.Button(${value_id});\n`;
  return code;
};
Blockly.JavaScript['obniz_ui_button_click'] = function(block) {
  var button = Blockly.JavaScript.variableDB_.getName(block.getField('button').getText(),
      Blockly.Variables.NAME_TYPE);
  var code = `${button}.isClicked()`;
  return [code, Blockly.JavaScript.ORDER_MEMBER] ;
};

Blockly.JavaScript['obniz_ui_button_touch'] = function(block) {
  var button = Blockly.JavaScript.variableDB_.getName(block.getField('button').getText(),
      Blockly.Variables.NAME_TYPE);
  var code = `${button}.isTouching()`;
  return [code, Blockly.JavaScript.ORDER_MEMBER] ;
};




Blockly.Obniz.registerParts(`obnizUILabelVariableButton`,
    Blockly.ObnizUI.Label.VariablesOfTypeName,Blockly.ObnizUI.Label.VariablesOfTypeName);





Blockly.ObnizParts.registerObject({
  className : "UILabel",
  defaultName : "label",
  functionName: "obniz_ui_label",
  colour :Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [{
    "type": "input_value",
    "name": "text",
    "check": "String"
  }],
  code: `%1 = new ObnizUI.Label(%2)`,
  en: "Create %1 with %2",
  ja: " %1 を %2 で作る",
});

Blockly.ObnizParts.registerObject({
  className : "UILabel",
  defaultName : "label",
  functionName: "obniz_ui_label_create",
  colour :Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [],
  code: `%1 = new ObnizUI.Label('label')`,
  en: "Create %1",
  ja: " %1 を作る",
});

Blockly.ObnizParts.registerObjFunction({
  className : "UILabel",
  functionName: "obniz_ui_label_settext",
  colour :Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [ {
    "type": "input_value",
    "name": "text",
    "check": ["String","Number"]
  }],
  code: `%1.setText(%2)`,
  en: "Change %1 text to %2",
  ja: "%1で%2を表示する" ,
});


Blockly.Obniz.registerParts(`obnizUIImageVariableButton`,
    Blockly.ObnizUI.Image.VariablesOfTypeName,Blockly.ObnizUI.Image.VariablesOfTypeName);


Blockly.ObnizParts.registerObject({
  className : "UIImage",
  defaultName : "image",
  functionName: "obniz_ui_image",
  colour :Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [
    { "name" : "url",
      "type" :  "field_dropdown",
      "options":
          [
            [Blockly.Msg.ja !== undefined ?"バナナ":"banana", "/blockly/images/banana.png"],
            [Blockly.Msg.ja !== undefined ?"りんご":"apple", "/blockly/images/apple.png"],
            [Blockly.Msg.ja !== undefined ?"犬":"dog", "/blockly/images/dog.png"],
            [Blockly.Msg.ja !== undefined ?"猫":"cat", "/blockly/images/cat.png"],
            [Blockly.Msg.ja !== undefined ?"😃":"😃", "/blockly/images/smile.png"],
            [Blockly.Msg.ja !== undefined ?"😫":"😫", "/blockly/images/shock.png"],
          ]
    }],
  code: `%1 = new ObnizUI.Image('%2', '100px')`,
  en: "Create %1 with %2",
  ja: " %1 を %2 で作る",
});


Blockly.ObnizParts.registerObjFunction({
  className : "UIImage",
  functionName: "obniz_ui_image_move_x",
  colour :Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [ {
    "type": "input_value",
    "name": "x",
    "check": "Number"
  }],
  code: `%1.addX(%2)`,
  en: "%1 move to right %2 px",
  ja: "%1 を右へ %2 px 動かす" ,
});

Blockly.ObnizParts.registerObjFunction({
  className : "UIImage",
  functionName: "obniz_ui_image_move_y",
  colour :Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [ {
    "type": "input_value",
    "name": "y",
    "check": "Number"
  }],
  code: `%1.addY(%2)`,
  en: "%1 move to bottom %2 px",
  ja: "%1 を下へ %2 px 動かす" ,
});






Blockly.Obniz.registerParts(`obnizUISliderVariableButton`,
    Blockly.ObnizUI.Image.VariablesOfTypeName,Blockly.ObnizUI.Image.VariablesOfTypeName);


Blockly.ObnizParts.registerObject({
  className : "UISlider",
  defaultName : "slider",
  functionName: "obniz_ui_slider",
  colour :Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [
  ],
  code: `%1 = new ObnizUI.Slider()`,
  en: "Create %1",
  ja: " %1 を作る",
});



Blockly.ObnizParts.registerObjFunction({
  className : "UISlider",
  functionName: "obniz_ui_slider_is_changed",
  colour :Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [ ],
  output : "Boolean",
  code: `%1.isChanged()`,
  en: "value of %1 is changed",
  ja: "%1 が変化した" ,
});


Blockly.ObnizParts.registerObjFunction({
  className : "UISlider",
  functionName: "obniz_ui_slider_get_value",
  colour :Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [ ],
  output : "Number",
  code: `%1.getValue()`,
  en: "value of %1",
  ja: "%1 の値" ,
});



Blockly.Obniz.Msg.OBNIZ_AI_HUE = 330;




Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_classify",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  output : "Boolean",
  params: [
    { "name" : "text",
      "type" :  "field_dropdown",
      "options":
          [
            [Blockly.Msg.ja !== undefined ?"バナナ":"banana", "banana"],
            [Blockly.Msg.ja !== undefined ?"レモン":"lemon", "lemon"],
            [Blockly.Msg.ja !== undefined ?"ボールペン":"ballpoint", "ballpoint"],
            [Blockly.Msg.ja !== undefined ?"フライパン":"frying pan", "frying_pan"],
            [Blockly.Msg.ja !== undefined ?"ジャック・オー・ランタン":"jack-o", "jack-o"],
          ]
    }],
  code :  `(await _ai.classify()).includes('%1')`,
  en:"Camera detect %1",
  ja:" カメラに %1 が写っている" ,
});

Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_weather",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  params: [
    {
      "type": "input_value",
      "name": "locale",
      "check": "String"
    },
    { "name" : "weather",
      "type" :  "field_dropdown",
      "options":
          [
            [Blockly.Msg.ja !== undefined ?"晴れ":"sunny", "sunny"],
            [Blockly.Msg.ja !== undefined ?"曇り":"cloudy", "cloudy"],
            [Blockly.Msg.ja !== undefined ?"雨":"rain", "rain"],
            [Blockly.Msg.ja !== undefined ?"雪":"snow", "snow"],
          ]
    }],
  code :  `_ai.%2.includes( await _ai.getWeather(%1) )`,
  en:"The weather of %1 is %2",
  ja:" %1 の天気は %2 である" ,
  output : "Boolean"
});


Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_say",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  params: [{
    "type": "input_value",
    "name": "text",
    "check": "String"
  }],
  code : `await _ai.say(%1)`,
  en:"Say %1",
  ja:"%1と言う" ,
});

Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_camera_start",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  params: [],
  code : `await _ai.startCamWait()`,
  en:"Ready camera",
  ja:"カメラを準備する" ,
});


Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_face",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  params: [],
  output : "Boolean",
  code : `_ai.isFaceInside()`,
  en:"Camera detect face ",
  ja:"カメラに顔が写っている" ,
});


Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_faceposition",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  params: [],
  output : "Number",
  code : `_ai.positionOfFace()`,
  en:"Face position",
  ja:"顔の位置" ,
});


Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_facedistance",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  params: [],
  output : "Number",
  code : `_ai.distanceOfFace()`,
  en:"Face distance",
  ja:"顔との距離",
});


Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_line",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  params: [],
  output : "Number",
  code : `_ai.positionOfWhiteline()`,
  en:"position of white line in camera",
  ja: "カメラに写った白いラインの位置" ,
});






Blockly.defineBlocksWithJsonArray([
  {
    "type": "obniz_util_repeat",
    "message0":  Blockly.Msg.ja !== undefined ? "ずっと" :"repeat",
    "args0": [],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": undefined,
    "colour": "%{BKY_LOOPS_HUE}",
    "tooltip": "",
    "helpUrl": "",

  },
  {
    "type": "obniz_util_repeat_while",
    "message0":  Blockly.Msg.ja !== undefined ? "%1 の間 繰り返す" :"repeat while %1",
    "args0": [

      {
        "type": "input_value",
        "name": "BOOL",
        "check": "Boolean"
      }
    ],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "helpUrl": "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}"
  },
  {
    "type": "obniz_util_repeat_num",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check" : "Number",
      "value": 10,
      "min": 0,
      "precision": 1
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  },
]);



Blockly.JavaScript['obniz_util_repeat'] = function(block) {
// Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
      until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
          Blockly.JavaScript.ORDER_NONE) || 'true';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\nawait ObnizUI.Util.wait(0);\n' + branch + '}\n';
};

Blockly.JavaScript['obniz_util_repeat_while'] = Blockly.JavaScript['obniz_util_repeat'];

Blockly.JavaScript['obniz_util_repeat_num'] = function(block){
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\nawait ObnizUI.Util.wait(0);\n' +
      branch + '}\n';
  return code;
}




Blockly.Obniz.registerFunction({
  functionName: "obniz_debug_text",
  colour : Blockly.Obniz.Msg.OBNIZ_UI_HUE,
  params: [{
    "type": "input_value",
    "name": "text",
    "check": ["String","Number"]
  }],
  code : `console.log(%1)`,
  en:"Print %1 on console",
  ja:"%1 を コンソールに表示する" ,
});


Blockly.Obniz.registerFunction({
  functionName: "obniz_util_wait",
  colour : "%{BKY_LOOPS_HUE}",
  params: [{
      "type": "input_value",
      "name": "time",
      "check": "Number",
      "value" : 500
  }],
  code : `await ObnizUI.Util.wait(%1)`,
  en:"Wait %1 ms",
  ja:"%1 ms 待つ" ,
});




Blockly.Obniz.registerFunction({
  functionName: "obniz_util_save",
  colour : Blockly.ObnizParts["IoTHomeKit"].HUE,
  params: [
      {name : "key", type :  "input_value", check : "String"},
    {name : "value", type :  "input_value", check : "Array"}
    ],
  code : `await ObnizUI.Util.saveToStorage(%1,%2)`,
  en:"Save signal %2 as %1 on cloud system",
  ja:"クラウドに赤外線信号 %2 を %1 として保存する",
});


Blockly.Obniz.registerFunction({
  functionName: "obniz_util_load",
  colour : Blockly.ObnizParts["IoTHomeKit"].HUE,
  output: "Array",
  params: [{name : "key", type :  "input_value", check : "String"}],
  code : `await ObnizUI.Util.loadFromStorage(%1)`,
  en:"Load signal %1 from cloud system",
  ja:"赤外線信号 %1 をクラウドからロードする",
});






Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_play_audio",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  params: [
    { "name" : "frequency",
      "type" :  "field_dropdown",
      "options":
          [
            [Blockly.Msg.ja !== undefined ?"真ん中のド":"Middle C",   "262"],
            [Blockly.Msg.ja !== undefined ?"真ん中のレ":"Middle D",   "294"],
            [Blockly.Msg.ja !== undefined ?"真ん中のミ":"Middle E",   "330"],
            [Blockly.Msg.ja !== undefined ?"真ん中のファ":"Middle F", "349"],
            [Blockly.Msg.ja !== undefined ?"真ん中のソ":"Middle G",   "392"],
            [Blockly.Msg.ja !== undefined ?"真ん中のラ":"Middle A",   "440"],
            [Blockly.Msg.ja !== undefined ?"真ん中のシ":"Middle B",   "494"],
            [Blockly.Msg.ja !== undefined ?"高いド":"High C", "523"],
          ]
    },
    {
      "type": "input_value",
      "name": "beat",
      "check": "Number",
    }],
  code : `await _ai.playAudio(%1,%2 * 500)`,
  en:"play tone %1 for %2 beat",
  ja:"%1 の音を %2 拍 鳴らす" ,
});


Blockly.Obniz.registerFunction({
  functionName: "obniz_ai_play_audio_hz",
  colour :Blockly.Obniz.Msg.OBNIZ_AI_HUE,
  params: [
    {
      "type": "input_value",
      "name": "frequency",
      "check": "Number",
    },
    {
      "type": "input_value",
      "name": "beat",
      "check": "Number",
    }],
  code : `await _ai.playAudio(%1,%2 * 500)`,
  en:"play audio %1 Hz for %2 beat",
  ja:"%1 Hz の音を %2 拍 鳴らす" ,
});