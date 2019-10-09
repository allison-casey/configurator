import { Parsers } from "../infantryArmor";

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
    "Class Vest_V_Press_F : Vest_Base_F {",
    "descriptionShort=\"Light Vest\";",
    "Class ItemInfo : ItemInfo {",
    "containerClass=\"Supply80\";",
    "mass=40;",
    "Class HitpointsProtectionInfo {",
    "Class Body {",
    "passThrough=0.5;",
    "};",
    "Class Chest {",
    "armor=8.0;",
    "passThrough=0.5;",
    "};",
    "Class Diaphragm {",
    "armor=8.0;",
    "passThrough=0.5;",
    "};",
    "Class Abdomen {",
    "armor=8.0;",
    "passThrough=0.5;",
    "};",
    "};",
    "};",
    "};"
  ]);
});
