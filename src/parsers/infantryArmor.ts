/// <reference path="./ammo.ts" />
/// <reference path="./basic.ts" />

import { Utils } from "../utils";

export namespace Parsers {
  export const parseInfantryArmor = (rows: string[][]): string[] => {
    interface HitpointsProtection {
      armor: string;
      passThrough: string;
    }

    interface InfantryArmor {
      [key: string]: string | HitpointsProtection | undefined;
      classname: string;
      base: string;
      descriptionShort: string;
      mass: string;
      capacity?: string;
      containerClass?: string;
      bodyPassthrough?: string;
      chest?: HitpointsProtection;
      diaphragm?: HitpointsProtection;
      abdomen?: HitpointsProtection;
      pelvis?: HitpointsProtection;
      arms?: HitpointsProtection;
      legs?: HitpointsProtection;
      head?: HitpointsProtection;
      neck?: HitpointsProtection;
      face?: HitpointsProtection;
    }

    const parseHitpointsProtection = (
      classname: string,
      start: number,
      row: string[]
    ): HitpointsProtection | {} =>
      row[start]
        ? {
            [classname]: {
              armor: row[start],
              passThrough: row[start + 1]
            }
          }
        : {};

    const toRecord = (row: string[]): InfantryArmor => ({
      classname: row[0],
      base: row[1],
      descriptionShort: row[3],
      mass: row[4],
      ...(row[5] && { capacity: row[5] }),
      ...(row[6] && { containerClass: row[6] }),
      ...(row[7] && { bodyPassthrough: row[7] }),
      ...parseHitpointsProtection("chest", 8, row),
      ...parseHitpointsProtection("diaphragm", 10, row),
      ...parseHitpointsProtection("abdomen", 12, row),
      ...parseHitpointsProtection("pelvis", 14, row),
      ...parseHitpointsProtection("arms", 16, row),
      ...parseHitpointsProtection("legs", 18, row),
      ...parseHitpointsProtection("head", 20, row),
      ...parseHitpointsProtection("neck", 22, row),
      ...parseHitpointsProtection("face", 24, row)
    });

    const renderRecord = (record: InfantryArmor): string[] => {
      const renderHitpointsProtection = (
        key: string,
        hitpoints: HitpointsProtection | undefined
      ) =>
        hitpoints
          ? [
              `class ${key} {`,
              `armor=${hitpoints.armor};`,
              `passThrough=${hitpoints.passThrough};`,
              "};"
            ]
          : [];

      let out: string[] = [];

      out.push(`class ${record.classname} : ${record.base} {`);
      out.push(`descriptionShort="${record.descriptionShort}";`);
      out.push("class ItemInfo : ItemInfo {");
      out.push(`containerClass="${record.containerClass}";`);
      out.push(`mass=${record.mass};`);

      out.push("class HitpointsProtectionInfo {");
      out = [
        ...out,
        ...(record.bodyPassthrough
          ? ["class Body {", `passThrough=${record.bodyPassthrough};`, "};"]
          : [])
      ];

      for (let key of [
        "chest",
        "diaphragm",
        "abdomen",
        "pelvis",
        "arms",
        "head",
        "neck",
        "face"
      ]) {
        out = [
          ...out,
          ...renderHitpointsProtection(Utils.capitalize(key), record[
            key
          ] as HitpointsProtection)
        ];
      }

      out.push("};");
      out.push("};");
      out.push("};");

      return out;
    };

    const records = rows.filter(row => row[5]).map(toRecord);
    return records.reduce<string[]>(
      (accum: string[], curr: InfantryArmor) => [
        ...accum,
        ...renderRecord(curr)
      ],
      []
    );
  };
}
