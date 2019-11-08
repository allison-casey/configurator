/// <reference path="./parsers/basic.ts" />
/// <reference path="./parsers/ammo.ts" />
/// <reference path="./parsers/infantryArmor.ts" />
/// <reference path="./parsers/infantryOptics.ts" />
/// <reference path="./parsers/infantryTypes.ts" />
/// <reference path="./parsers/infantryWeapons.ts" />
/// <reference path="./parsers/vehicleArmor.ts" />
/// <reference path="./parsers/vehicleWeapons.ts" />
/// <reference path="./utils.ts" />

const cfgWeaponsBaseClasses = `
class Default;
class Rifle_Base_F;
class Rifle_Short_Base_F: Rifle_Base_F {};
class Rifle_Long_Base_F: Rifle_Base_F {};
class PistolCore;
class Pistol: PistolCore
{
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class Pistol_Base_F: Pistol
{
    class WeaponSlotsInfo;
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class ItemCore;
class InventoryOpticsItem_Base_F;
class LauncherCore;
class Launcher: LauncherCore
{
    opticsZoomMin=0.5; // Zoomed-in value as a fraction of full FOV (i.e. smaller = more zoom). 0.75 = normal, 1 = slight fisheye, 0.5 = slight zoom
    opticsZoomMax=0.5; // Zoomed-out value
    opticsZoomInit=0.5; // Starting value
};
class Launcher_Base_F: Launcher {};
class GrenadeLauncher: Default
{
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class UGL_F: GrenadeLauncher
{
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class RifleCore;
class Rifle: RifleCore
{
    opticsZoomMin=0.5;
    opticsZoomMax=0.5;
    opticsZoomInit=0.5;
};
class Put: Default
{
    class PutMuzzle: Default
    {
        opticsZoomMin=0.5;
        opticsZoomMax=0.5;
        opticsZoomInit=0.5;
    };
};
`

const cfgPatchesBaseClasses = `
class Mode_SemiAuto {};
class Mode_Burst: Mode_SemiAuto {};
class Mode_FullAuto: Mode_SemiAuto {};
`


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
  const lookupSoldierHitpoints = getNamedRange("lookupSoldierHitpoints", spreadsheet)


  const parsedBasic = Parsers.parseBasicSettings(settingsBasic)
  const parsedAmmo = Parsers.parseAmmoSettings(settingsAmmo)
  const parsedInfantryArmor = Parsers.parseInfantryArmor(settingsInfantryArmor)
  const parsedInfantryOptics = Parsers.parseInfantryOptics(settingsInfantryOptics)
  const parsedInfantryTypes = Parsers.parseInfantryTypes(lookupSoldierHitpoints, settingsInfantryTypes)
  const parsedInfantryWeapons = Parsers.parseInfantryWeapons(settingsInfantryWeapons)
  const parsedVehicleWeapons = Parsers.parseVehicleWeapons(settingsVehicleWeapons)
  // const parsedVehicleArmor = Parsers.parseBasicSettings(settingsVehicleArmor)

  Logger.log(parsedInfantryArmor)

  const output: string[] = [
    ...parsedBasic,
    ...Utils.renderClass("CfgAmmo", undefined, ...parsedAmmo),
    ...Utils.renderClass("CfgRecoils", undefined, ...parsedInfantryWeapons.recoils),
    ...Utils.renderClass("CfgWeapons",
                         undefined,
                         cfgWeaponsBaseClasses,
                         ...parsedInfantryWeapons.weapons,
                         ...parsedInfantryOptics,
                         ...parsedVehicleWeapons),
    ...Utils.renderClass("CfgVehicles",
                         undefined,
                         ...parsedInfantryArmor,
                         ...parsedInfantryTypes)
  ]

  const outputSheet = spreadsheet.getSheetByName("Output");
  const outputRange = outputSheet.getRange(1, 1, output.length);

  const data: string[][] = output.map(row => [row])

  outputRange.setValues(data)

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
