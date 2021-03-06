import {Parsers} from '../infantryWeapons'

test("Parse Infantry Weapons", () => {
  const data: string[][] = [
    [
      "arifle_MX_F",
      "arifle_MX_Base_F",
      "MX",
      "Futuristic 6.5 mm Assault Rifle",
      "6.5 mm",
      "Assault Rifle",
      "Futuristic",
      "Standard",
      "Standard",
      "No",
      "Standard",
      "Standard",
      "Standard",
      "Standard",
      "",
      "",
      "889.2",
      "1.03",
      "1.65",
      "0.49",
      "4.2",
      "6.3",
      "Single",
      "Single",
      "0.00182",
      "0.153",
      "",
      "FullAuto",
      "FullAuto",
      "0.00442",
      "0.0772",
      "",
      "n/a",
      "Burst",
      "1.7664",
      "6.174",
      "",
      "Recoil_arifle_MX_F",
      "0.0528",
      "1.58",
      "0.422",
      "0.422",
      "0.211",
      "0.0211",
      "0.0317",
      "0.0528"
    ],
    [""],
    [
      "SMG_01_F",
      "SMG_01_Base",
      "Sting",
      "Advanced 9 mm SMG",
      "9 mm",
      "SMG",
      "Advanced",
      "Standard",
      "Standard",
      "No",
      "Standard",
      "Standard",
      "Standard",
      "Standard",
      "",
      "",
      "392.4",
      "1.38",
      "2.21",
      "0.406",
      "3.65",
      "5.47",
      "Single",
      "Single",
      "0.00392",
      "0.121",
      "",
      "FullAuto",
      "FullAuto",
      "0.00784",
      "0.0601",
      "",
      "Burst",
      "Burst",
      "3.136",
      "4.8114",
      "",
      "Recoil_SMG_01_F",
      "0.0333",
      "1.0",
      "0.267",
      "0.267",
      "0.133",
      "0.015",
      "0.0118",
      "0.0221"
    ]
  ];
  expect(Parsers.parseInfantryWeapons(data)).toEqual({
    weapons: [
      "class arifle_MX_F: arifle_MX_Base_F {",
      "initSpeed=889.2;",
      "aimTransitionSpeed=1.03;",
      "dexterity=1.65;",
      "inertia=0.49;",
      "aiDispersionCoefX=4.2;",
      "aiDispersionCoefY=6.3;",
      "recoil='Recoil_arifle_MX_F';",
      "class Single: Single {",
      "dispersion=0.00182;",
      "reloadTime=0.153;",
      "};",
      "class FullAuto: FullAuto {",
      "dispersion=0.00442;",
      "reloadTime=0.0772;",
      "};",
      "};",
      "class SMG_01_F: SMG_01_Base {",
      "initSpeed=392.4;",
      "aimTransitionSpeed=1.38;",
      "dexterity=2.21;",
      "inertia=0.406;",
      "aiDispersionCoefX=3.65;",
      "aiDispersionCoefY=5.47;",
      "recoil='Recoil_SMG_01_F';",
      "class Single: Single {",
      "dispersion=0.00392;",
      "reloadTime=0.121;",
      "};",
      "class FullAuto: FullAuto {",
      "dispersion=0.00784;",
      "reloadTime=0.0601;",
      "};",
      "class Burst: Burst {",
      "dispersion=3.136;",
      "reloadTime=4.8114;",
      "};",
      "};"
    ],
    recoils: [
      "class Recoil_arifle_MX_F: Default {",
      "muzzleOuter[]={0.0528, 1.58, 0.422, 0.422};",
      "permanent=0.211",
      "temporary=0.0211",
      "kickBack[]={0.0317, 0.0528};",
      "};",
      "class Recoil_SMG_01_F: Default {",
      "muzzleOuter[]={0.0333, 1.0, 0.267, 0.267};",
      "permanent=0.133",
      "temporary=0.015",
      "kickBack[]={0.0118, 0.0221};",
      "};"
    ]
  });
});
