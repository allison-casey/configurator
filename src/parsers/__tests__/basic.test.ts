import {Parsers} from '../basic'

test("Parse Basic Settings", () => {
  const test_basic_settings: Parsers.BasicSetting[] = [
    ["CfgPatches", ""],
    ["A3_Configurator", ""],
    ["units[]", "{}"],
    ["weapons[]", "{}"],
    ["", ""],
    ["", ""],
    ["CfgMovesFatigue", ""],
    ["StaminaDuration", "60"],
    ["StaminaRestoration", "10"],
    ["", ""],
    ["CfgImprecision", ""],
    ["Primary", ""],
    ["horizontalRadius", "0.04"],
    ["", ""],
    ["Secondary", ""],
    ["verticalRadius", "0.5"],
    ["", ""],
    ["", ""]
  ];
  expect(Parsers.parseBasicSettings(test_basic_settings)).toEqual([
    "class CfgPatches {",
    "class A3_Configurator {",
    "units[]={};",
    "weapons[]={};",
    "};",
    "};",
    "class CfgMovesFatigue {",
    "StaminaDuration=60;",
    "StaminaRestoration=10;",
    "};",
    "class CfgImprecision {",
    "class Primary {",
    "horizontalRadius=0.04;",
    "};",
    "class Secondary {",
    "verticalRadius=0.5;",
    "};",
    "};"
  ]);
});

