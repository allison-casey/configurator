import {Parsers} from '../vehicleArmor'

test("Vehicle Armor", () => {
  const data: string[][] = [
    [
      "APC_Tracked_01_base_F",
      "Tank_F",
      "",
      "",
      "ViewPilot: ViewPilot",
      "0.25",
      "0.9",
      "1.25",
      "",
      "ViewOptics: ViewOptics",
      "0.23",
      "0.35",
      "0.35",
      "500",
      "6",
      "0.08",
      "0.9999",
      "0.00547",
      "",
      "1.6",
      "1",
      "0.2",
      "0.2",
      "0.1",
      "0.5",
      "0.1",
      "1",
      "0.5",
      "0.3",
      "0.1",
      "0.6",
      "",
      "-650",
      "0",
      "0.0738462",
      "0.8",
      "",
      "",
      "",
      "",
      "",
      "MainTurret: MainTurret",
      "",
      "ViewGunner: ViewGunner",
      "0.25",
      "0.9",
      "1.25",
      "",
      "ViewOptics: RCWSOptics",
      "",
      "",
      "",
      "-250",
      "0",
      "0.03",
      "0.2",
      "-250",
      "0",
      "0.03",
      "0.2",
      "CommanderOptics: CommanderOptics",
      "",
      "FALSE",
      "ViewGunner: ViewCargo",
      "0.25",
      "0.9",
      "1.25",
      "",
      "ViewOptics: ViewOptics",
      "0.034",
      "0.31",
      "0.31",
      "0.1",
      "0",
      "0.1",
      "1",
      "0.1",
      "0",
      "0.1",
      "1"
    ],
    [
      "APC_Tracked_01_base_F",
      "Tank_F",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "500",
      "6",
      "0.08",
      "0.9999",
      "0.00547",
      "",
      "1.6",
      "1",
      "0.2",
      "0.2",
      "0.1",
      "0.5",
      "0.1",
      "1",
      "0.5",
      "0.3",
      "0.1",
      "0.6",
      "",
      "-650",
      "0",
      "0.0738462",
      "0.8",
      "",
      "",
      "",
      "",
      "",
      "MainTurret: MainTurret",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "-250",
      "0",
      "0.03",
      "0.2",
      "-250",
      "0",
      "0.03",
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
      "",
      "",
      "",
      "0.1",
      "0",
      "0.1",
      "1",
      "0.1",
      "0",
      "0.1",
      "1"
    ]
  ];
  expect(Parsers.parseVehicleArmor(data)).toEqual([
    "class APC_Tracked_01_base_F : Tank_F {",
    "armor=500;",
    "armorStructural=6;",
    "armorLights=0.08;",
    "crewExplosionProtection=0.9999;",
    "damageResistance=0.00547;",
    "class HitPoints : HitPoints {",
    "class HitHull : HitHull {",
    "armor=1.6;",
    "passThrough=1;",
    "minimalHit=0.2;",
    "explosionShielding=0.2;",
    "};",
    "class HitEngine : HitEngine {",
    "armor=0.1;",
    "passThrough=0.5;",
    "minimalHit=0.1;",
    "explosionShielding=1;",
    "};",
    "class HitFuel : HitFuel {",
    "armor=0.5;",
    "passThrough=0.3;",
    "minimalHit=0.1;",
    "explosionShielding=0.6;",
    "};",
    "};",
    "};"
  ]);
});
