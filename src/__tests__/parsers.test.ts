const test_settings: Parsers.BasicSetting[] = [
    ["CfgPatches", ""],
    ["A3_Configurator", ""],
    ["units[]", "{}"],
    ["weapons[]", "{}"],
    ["", ""],
    ["", ""],
    ["CfgMovesFatigue", ""],
    ["StaminaDuration", "60"],
    ["StaminaRestoration", "10"]
]


test('Parse Basic Settings', () => {
    expect(Parsers.parseBasicSettings).toBeDefined();
    expect(Parsers.parseBasicSettings(test_settings)).toEqual([
        "Class CfgPatches {",
        "Class A3_Configurator {",
        "units[] = {};",
        "weapons[] = {};",
        "};};",
        "",
        "Class CfgMovesFatigue {",
        "StaminaDuration = 60;",
        "StaminaRestoration = 10;",
        "};"
    ])
})
