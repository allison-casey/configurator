/// <reference path="./parsers/basic.ts" />
/// <reference path="./parsers/ammo.ts" />
/// <reference path="./parsers/infantryArmor.ts" />
/// <reference path="./parsers/infantryOptics.ts" />
/// <reference path="./parsers/infantryTypes.ts" />
/// <reference path="./parsers/infantryWeapons.ts" />
/// <reference path="./parsers/vehicleArmor.ts" />
/// <reference path="./parsers/vehicleWeapons.ts" />
/// <reference path="./utils.ts" />
/// <reference path="./weaponBases.ts" />

const getNamedRange = (
  name: string,
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
) => spreadsheet.getRangeByName(name).getDisplayValues();

function main() {
  const spreadsheet = SpreadsheetApp.getActive();

  const settingsBasic = getNamedRange("settingsBasic", spreadsheet);
  const settingsAmmo = getNamedRange("settingsAmmo", spreadsheet);
  const settingsInfantryArmor = getNamedRange(
    "settingsInfantryArmor",
    spreadsheet
  );
  const settingsInfantryOptics = getNamedRange(
    "settingsInfantryOptics",
    spreadsheet
  );
  const settingsInfantryTypes = getNamedRange(
    "settingsInfantryTypes",
    spreadsheet
  );
  const settingsInfantryWeapons = getNamedRange(
    "settingsInfantryWeapons",
    spreadsheet
  );
  const settingsVehicleWeapons = getNamedRange(
    "settingsVehicleWeapons",
    spreadsheet
  );
  const settingsVehicleArmor = getNamedRange(
    "settingsVehicleArmor",
    spreadsheet
  );
  const lookupSoldierHitpoints = getNamedRange(
    "lookupSoldierHitpoints",
    spreadsheet
  );

  const parsedBasic = Parsers.parseBasicSettings(settingsBasic);
  const parsedAmmo = Parsers.parseAmmoSettings(settingsAmmo);
  const parsedInfantryArmor = Parsers.parseInfantryArmor(settingsInfantryArmor);
  const parsedInfantryOptics = Parsers.parseInfantryOptics(
    settingsInfantryOptics
  );
  const parsedInfantryTypes = Parsers.parseInfantryTypes(
    lookupSoldierHitpoints,
    settingsInfantryTypes
  );
  const parsedInfantryWeapons = Parsers.parseInfantryWeapons(
    settingsInfantryWeapons
  );
  const parsedVehicleWeapons = Parsers.parseVehicleWeapons(
    settingsVehicleWeapons
  );
  // const parsedVehicleArmor = Parsers.parseBasicSettings(settingsVehicleArmor)

  const removeDuplicates = (items: string[]) => {
    const unique: { [index: string]: boolean } = {};
    items.forEach((i: string) => {
      if (!unique[i]) unique[i] = true;
    });

    return Object.keys(unique);
  };

  const renderBaseClass = (base: string) => `class ${base};`;

  Logger.log(Bases.parsedCfgWeaponsBases);
  const output: string[] = [
    ...parsedBasic,
    ...Utils.renderClass("CfgAmmo", undefined, ...parsedAmmo),
    ...Utils.renderClass(
      "CfgRecoils",
      undefined,
      ...removeDuplicates(parsedInfantryWeapons.recoils.bases).map(
        renderBaseClass
      ),
      ...parsedInfantryWeapons.recoils.classes
    ),
    ...Utils.renderClass(
      "CfgWeapons",
      undefined,
      ...removeDuplicates([
        ...parsedInfantryWeapons.weapons.bases,
        ...parsedInfantryOptics.bases,
        ...parsedVehicleWeapons.bases,
      ])
        .filter(
          x => Bases.parsedCfgWeaponsBases.definedClasses.indexOf(x) == -1 &&
            ["Mode_SemiAuto", "Mode_Burst", "Mode_FullAuto"].indexOf(x) == -1 
        )
        .map(renderBaseClass),
      ...Bases.parsedCfgWeaponsBases.classes,
      ...parsedInfantryWeapons.weapons.classes,
      ...parsedInfantryOptics.classes,
      ...parsedVehicleWeapons.classes
    ),
    ...Utils.renderClass(
      "CfgVehicles",
      undefined,
      ...removeDuplicates([
        ...parsedInfantryArmor.bases,
        ...parsedInfantryTypes.bases
      ]).map(renderBaseClass),
      ...parsedInfantryArmor.classes,
      ...parsedInfantryTypes.classes
    )
  ];

  const outputSheet = spreadsheet.getSheetByName("Output");
  const outputRange = outputSheet.getRange(1, 1, output.length);

  const data: string[][] = output.map(row => [row]);

  outputRange.setValues(data);

  // const parsedSettingsBasic = Parsers.parseBasicSettings(
  //   settingsBasic as Parsers.BasicSetting[]
  // );

  // const parsedSettingsAmmo = Parsers.parseAmmoSettings(
  //   settingsAmmo as Parsers.AmmoSetting[]
  // );

  // const outputSheet = spreadsheet.getSheetByName("Output");
  // const outputRange = outputSheet.getRange(1, 1, parsedSettingsAmmo.length);

  // const data = [];
  // for (let setting of parsedSettingsAmmo) {
  //   data.push([setting]);
  // }
  // outputRange.setValues(data);
}
