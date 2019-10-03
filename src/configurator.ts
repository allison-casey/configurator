import {Parsers} from './parsers'

function main() {
  const spreadsheet = SpreadsheetApp.getActive();
  const settingsBasic = spreadsheet
    .getRangeByName("settingsBasic")
    .getDisplayValues();
    const settingsAmmo = spreadsheet
        .getRangeByName("settingsAmmo")
        .getDisplayValues();

  const parsedSettingsBasic = Parsers.parseBasicSettings(
    settingsBasic as Parsers.BasicSetting[]
  );

    const parsedSettingsAmmo = Parsers.parseAmmoSettings(
        settingsAmmo as Parsers.AmmoSetting[]
    )


  const outputSheet = spreadsheet.getSheetByName("Output");
  const outputRange = outputSheet.getRange(1, 1, parsedSettingsAmmo.length);

  const data = [];
  for(let setting of parsedSettingsAmmo) {
      data.push([ setting ]);
  }
  outputRange.setValues(data);
}
