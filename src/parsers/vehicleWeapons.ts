import { Utils } from "../utils";

interface FireMode {
  modeName: string;
  reloadTime?: string;
  dispersion?: string;
  multiplier?: string;
  artilleryDispersion?: string;
  artilleryCharge?: string;
  [key: string]: string | undefined;
}

interface VehicleWeapons {
  classname: string;
  base: string;
  ammoMode?: string;
  reloadTime?: string;
  magazineReloadTime?: string;
  dispersion?: string;
  modeOne?: FireMode;
  modeTwo?: FireMode;
  modeThree?: FireMode;
  [key: string]: FireMode | string | undefined;
}

export namespace Parsers {
  interface Output {
    bases: string[];
    classes: string[];
  }

  export const parseVehicleWeapons = (rows: string[][]): Output => {
    interface Set {
      [index: string]: boolean;
    }

    const definedBaseClasses: Set = {};
    const externalBaseClasses: Set = {};

    const toFireMode = (start: number, row: string[]): FireMode => ({
      modeName: row[start],
      ...(row[start + 1] && { reloadTime: row[start + 1] }),
      ...(row[start + 2] && { dispersion: row[start + 2] }),
      ...(row[start + 3] && { multiplier: row[start + 3] }),
      ...(row[start + 4] && { artilleryDispersion: row[start + 4] }),
      ...(row[start + 5] && { artilleryCharge: row[start + 5] })
    });

    const toRecord = (row: string[]): VehicleWeapons => ({
      classname: row[0],
      base: row[1],
      ...(row[2] && { ammoMode: row[2] }),
      ...(row[5] && { reloadTime: row[5] }),
      ...(row[6] && { magazineReloadTime: row[6] }),
      ...(row[7] && { dispersion: row[7] }),
      ...(row[10] && { modeOne: toFireMode(10, row) }),
      ...(row[16] && { modeTwo: toFireMode(16, row) }),
      ...(row[22] && { modeThree: toFireMode(22, row) })
    });

    const renderFireMode = (record: FireMode): string[] => {
      if (record.modeName) {
        const [classname, base] = record.modeName
          .split(":")
          .map((x: string) => x.trim());

        definedBaseClasses[classname] = true;
        if (base && !(base in definedBaseClasses))
          externalBaseClasses[base] = true;
      }

      return Utils.renderClass(
        record.modeName,
        undefined,
        ...Utils.renderProperties(
          [
            "reloadTime",
            "dispersion",
            "multiplier",
            "artilleryDispersion",
            "artilleryCharge"
          ],
          record
        )
      );
    };

    const renderRecord = (record: VehicleWeapons): string[] => {
      if (record.ammoMode) {
        const [classname, base] = record.ammoMode
          .split(":")
          .map((x: string) => x.trim());

        definedBaseClasses[classname] = true;
        if (base && !(base in definedBaseClasses))
          externalBaseClasses[base] = true;
      }

      return record.ammoMode
        ? Utils.renderClass(
            record.ammoMode,
            undefined,
            ...Utils.renderProperties(
              ["reloadTime", "magazineReloadTime", "dispersion"],
              record
            ),
            ...(record.modeOne ? renderFireMode(record.modeOne) : []),
            ...(record.modeTwo ? renderFireMode(record.modeTwo) : []),
            ...(record.modeThree ? renderFireMode(record.modeThree) : [])
          )
        : [
            ...(record.modeOne ? renderFireMode(record.modeOne) : []),
            ...(record.modeTwo ? renderFireMode(record.modeTwo) : []),
            ...(record.modeThree ? renderFireMode(record.modeThree) : [])
          ];

      // return [
      //   ...Utils.renderProperties(
      //     ["reloadTime", "magazineReloadTime", "dispersion"],
      //     record
      //   ),
      //   ...(record.ammoMode
      //     ? Utils.renderClass(
      //         record.ammoMode,
      //         undefined,
      //         ...(record.modeOne ? renderFireMode(record.modeOne) : []),
      //         ...(record.modeTwo ? renderFireMode(record.modeTwo) : []),
      //         ...(record.modeThree ? renderFireMode(record.modeThree) : [])
      //       )
      //     : [
      //         ...(record.modeOne ? renderFireMode(record.modeOne) : []),
      //         ...(record.modeTwo ? renderFireMode(record.modeTwo) : []),
      //         ...(record.modeThree ? renderFireMode(record.modeThree) : [])
      //       ])
      // ];
    };

    const records: VehicleWeapons[] = rows.map(toRecord);

    const lookup = records.reduce<{
      [key: string]: { classname: string; base: string; parsed: string[] };
    }>(
      (accum: any, curr: VehicleWeapons) => ({
        ...accum,
        [curr.classname]: accum[curr.classname]
          ? {
              ...accum[curr.classname],
              parsed: [...accum[curr.classname].parsed, ...renderRecord(curr)]
            }
          : {
              classname: curr.classname,
              base: curr.base,
              parsed: renderRecord(curr)
            }
      }),
      {}
    );

    let out = Object.keys(lookup).reduce((accum: string[], curr: string) => {
      const value = lookup[curr];

      definedBaseClasses[value.classname] = true;
      if (value.base && !(value.base in definedBaseClasses))
        externalBaseClasses[value.base] = true;

      return [
        ...accum,
        ...Utils.renderClass(value.classname, value.base, ...value.parsed)
      ];
    }, []);

    return {
      bases: Object.keys(externalBaseClasses).filter(
        x => !(x in definedBaseClasses)
      ),
      classes: out
    };
  };
}
