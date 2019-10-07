import { Parsers } from "../basic";

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
    "Class CfgPatches {",
    "Class A3_Configurator {",
    "units[] = {};",
    "weapons[] = {};",
    "};",
    "Class A_Class {",
    "something[] = {};",
    "};",
    "};",
    "Class CfgMovesFatigue {",
    "StaminaDuration = 60;",
    "StaminaRestoration = 10;",
    "};"
  ]);
});

