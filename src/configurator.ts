function main() {
  const spreadsheet = SpreadsheetApp.getActive();
  const settingsBasic = spreadsheet
    .getRangeByName("settingsBasic")
    .getDisplayValues();

  const parsedSettingsBasic = Parsers.parseBasicSettings(
    settingsBasic as Parsers.BasicSetting[]
  );


  const outputSheet = spreadsheet.getSheetByName("Output");
  const outputRange = outputSheet.getRange(1, 1, parsedSettingsBasic.length);

  const data = [];
  for(let setting of parsedSettingsBasic) {
      data.push([ setting ]);
  }
  outputRange.setValues(data);
}
