export namespace Parsers {
  export const parseInfantryOptics = (rows: string[][]): string[] => {
    interface OpticMode {
      classname: string;
      base?: string;
      minFOV: string;
      initFOV: string;
      maxFOV: string;
    }

    interface InfantryOptic {
      classname: string;
      base: string;
      displayTitle: string;
      descriptionShort: string;
      mass?: string;
      inertia?: string;
      modeOne?: OpticMode;
      modeTwo?: OpticMode;
      modeThree?: OpticMode;
    }

    const toRecord = (row: string[]): InfantryOptic => ({
      classname: row[0],
      base: row[1],
      displayTitle: row[3],
      descriptionShort: row[5],
      ...(row[6] && { mass: row[6] }),
      ...(row[7] && { inertia: row[7] }),
      ...(row[8] && {
        modeOne: {
          classname: row[8],
          ...(row[9] && { base: row[9] }),
          minFOV: row[11],
          initFOV: row[12],
          maxFOV: row[13]
        }
      }),
      ...(row[15] && {
        modeTwo: {
          classname: row[15],
          ...(row[16] && { base: row[16] }),
          minFOV: row[18],
          initFOV: row[19],
          maxFOV: row[20]
        }
      }),
      ...(row[22] && {
        modeThree: {
          classname: row[22],
          ...(row[23] && { base: row[23] }),
          minFOV: row[25],
          initFOV: row[26],
          maxFOV: row[27]
        }
      })
    });

    const renderRecord = (record: InfantryOptic): string[] => {
      const renderMode = (mode: OpticMode | undefined): string[] => {
        return mode
          ? [
              `Class ${mode.classname} ` +
                (mode.base ? `: ${mode.base} {` : "{"),
              `minFOV=${mode.minFOV}`,
              `initFOV=${mode.initFOV}`,
              `maxFOV=${mode.maxFOV}`,
              "};"
            ]
          : [];
      };

      let out: string[] = [];
      out.push(`Class ${record.classname}: ${record.base} {`);
      out.push(`displayTitle='${record.displayTitle}';`);
      out.push(`descriptionShort='${record.descriptionShort}';`);
      out.push("Class ItemInfo: InventoryOpticsItem_Base_F {");

      out = [...out, ...(record.mass ? [`mass=${record.mass};`] : [])];
      out = [...out, ...(record.inertia ? [`inertia=${record.inertia};`] : [])];

      const modeOne = renderMode(record.modeOne);
      const modeTwo = renderMode(record.modeTwo);
      const modeThree = renderMode(record.modeThree);

      out = [
        ...out,
        "Class OpticsModes {",
        ...modeOne,
        ...modeTwo,
        ...modeThree,
        "};"
      ];

      out.push("};");
      out.push("};");
      return out;
    };

    const records = rows.map(toRecord);
    return records.reduce<string[]>(
      (accum: string[], curr: InfantryOptic) => [
        ...accum,
        ...renderRecord(curr)
      ],
      []
    );
  };
}
