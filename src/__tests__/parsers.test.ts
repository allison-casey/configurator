import { Parsers } from '../parsers'

const test_settings: Parsers.BasicSetting[] = [
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
]


test('Parse Basic Settings', () => {
    expect(Parsers.parseBasicSettings(test_settings)).toEqual([
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
    ])
})
