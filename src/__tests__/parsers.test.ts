import { Parsers } from "../parsers";

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

test("Parse Ammo Settings", () => {
  const settings: Parsers.AmmoSetting[] = [
    [
      "B_19mm_HE",
      "BulletBase",
      "Autocannon",
      "",
      "20.0",
      "6.0",
      "2.0",
      "0.8",
      "",
      "16",
      "40",
      "10",
      "14",
      "",
      "",
      "",
      ""
    ],
      [
        "B_30mm_APFSDS",
        "B_30mm_AP",
        "Autocannon",
        "",
        "120.0",
        "8.0",
        "0.2",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ]
  ];
    expect(Parsers.parseAmmoSettings(settings)).toEqual([
        "Class CfgAmmo {",
        "Class B_19mm_HE : BulletBase {",
        "hit = 20.0;",
        "indirectHit = 6.0;",
        "indirectHitRange = 2.0;",
        "explosive = 0.8;",
        "dangerRadiusBulletClose = 16;",
        "dangerRadiusHit = 40;",
        "suppressionRadiusBulletClose = 10;",
        "suppressionRadiusHit = 14;",
        "};",
        "Class B_30mm_APFSDS : B_30mm_AP {",
        "hit = 120.0;",
        "indirectHit = 8.0;",
        "indirectHitRange = 0.2;",
        "};",
        "};"
    ])
});
