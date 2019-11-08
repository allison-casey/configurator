import {Parsers} from '../infantryArmor'

test("Infantry Armor", () => {
  const data: string[][] = [
    [
      "Vest_V_Press_F",
      "Vest_Base_F",
      "",
      "Light Vest",
      "40",
      "8.0",
      "Supply80",
      "0.5",
      "8.0",
      "0.5",
      "8.0",
      "0.5",
      "8.0",
      "0.5",
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
      ""
    ]
  ];
  
  expect(Parsers.parseInfantryArmor(data)).toEqual([
    "class Vest_V_Press_F : Vest_Base_F {",
    "descriptionShort=\"Light Vest\";",
    "class ItemInfo : ItemInfo {",
    "containerClass=\"Supply80\";",
    "mass=40;",
    "class HitpointsProtectionInfo {",
    "class Body {",
    "passThrough=0.5;",
    "};",
    "class Chest {",
    "armor=8.0;",
    "passThrough=0.5;",
    "};",
    "class Diaphragm {",
    "armor=8.0;",
    "passThrough=0.5;",
    "};",
    "class Abdomen {",
    "armor=8.0;",
    "passThrough=0.5;",
    "};",
    "};",
    "};",
    "};"
  ]);
});
