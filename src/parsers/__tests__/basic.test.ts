import {Parsers} from '../basic'

test("Parse Basic Settings", () => {
  const test_basic_settings: Parsers.BasicSetting[] = [
    ["CfgPatches", ""],
    ["A3_Configurator", ""],
    ["units[]", "{}"],
    ["weapons[]", "{}"],
    ["A_Class", ""],
    ["something[]", "{}"],
    ["", ""],
    ["", ""],
    ["CfgMovesFatigue", ""],
    ["StaminaDuration", "60"],
    ["StaminaRestoration", "10"]
  ];
  expect(Parsers.parseBasicSettings(test_basic_settings)).toEqual([
    "class CfgPatches {",
    "class A3_Configurator {",
    "units[] = {};",
    "weapons[] = {};",
    "};",
    "class A_Class {",
    "something[] = {};",
    "};",
    "};",
    "class CfgMovesFatigue {",
    "StaminaDuration = 60;",
    "StaminaRestoration = 10;",
    "};"
  ]);
});

