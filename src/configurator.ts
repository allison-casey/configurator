/// <reference path="./parsers/basic.ts" />
/// <reference path="./parsers/ammo.ts" />
/// <reference path="./parsers/infantryArmor.ts" />
/// <reference path="./parsers/infantryOptics.ts" />
/// <reference path="./parsers/infantryTypes.ts" />
/// <reference path="./parsers/infantryWeapons.ts" />
/// <reference path="./parsers/vehicleArmor.ts" />
/// <reference path="./parsers/vehicleWeapons.ts" />

const getNamedRange = (name: string, spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet) =>
  spreadsheet.getRangeByName(name).getDisplayValues();

function main() {
  const spreadsheet = SpreadsheetApp.getActive();

  const settingsBasic = getNamedRange("settingsBasic", spreadsheet);
  const settingsAmmo = getNamedRange("settingsAmmo", spreadsheet);
  const settingsInfantryArmor = getNamedRange("settingsInfantryArmor", spreadsheet);
  const settingsInfantryOptics = getNamedRange("settingsInfantryOptics", spreadsheet);
  const settingsInfantryTypes = getNamedRange("settingsInfantryTypes", spreadsheet);
  const settingsInfantryWeapons = getNamedRange("settingsInfantryWeapons", spreadsheet);
  const settingsVehicleWeapons = getNamedRange("settingsVehicleWeapons", spreadsheet);
  const settingsVehicleArmor = getNamedRange("settingsVehicleArmor", spreadsheet);


  const parsedBasic = Parsers.parseBasicSettings(settingsBasic)
  const parsedAmmo = Parsers.parseBasicSettings(settingsAmmo)
  const parsedInfantryArmor = Parsers.parseBasicSettings(settingsInfantryArmor)
  const parsedInfantryOptics = Parsers.parseBasicSettings(settingsInfantryOptics)
  const parsedInfantryTypes = Parsers.parseBasicSettings(settingsInfantryTypes)
  const parsedInfantryWeapons = Parsers.parseBasicSettings(settingsInfantryWeapons)
  const parsedVehicleWeapons = Parsers.parseBasicSettings(settingsVehicleWeapons)
  const parsedVehicleArmor = Parsers.parseBasicSettings(settingsVehicleArmor)

  Logger.log(parsedBasic)
  Logger.log(parsedAmmo)

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
