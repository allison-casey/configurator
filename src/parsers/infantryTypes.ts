import {Utils} from '../utils'

interface HitpointsCategory {
  armor?: string;
  passThrough?: string;
  explosionShielding?: string;
  minimalHit?: string;
  depends?: string;
  minTotalDamageThreshold?: string;
  impactDamageMultiplier?: string;
  armorStructural?: string;
  minFOV?: string;
  initFOV?: string;
  maxFOV?: string;
  [key: string]: string | undefined;
}

interface SoldierHitpoints {
  viewPilot: HitpointsCategory;
  Overall: HitpointsCategory;
  HitFace: HitpointsCategory;
  "HitNeck: HitFace": HitpointsCategory;
  "HitHead: HitNeck": HitpointsCategory;
  "HitPelvis: HitHead": HitpointsCategory;
  "HitAbdomen: HitPelvis": HitpointsCategory;
  "HitDiaphragm: HitAbdomen": HitpointsCategory;
  "HitChest: HitDiaphragm": HitpointsCategory;
  "HitBody: HitChest": HitpointsCategory;
  "HitArms: HitBody": HitpointsCategory;
  "HitHands: HitArms": HitpointsCategory;
  "HitLegs: HitHands": HitpointsCategory;
  "Incapacitated: HitLegs": HitpointsCategory;
  [key: string]: HitpointsCategory;
}

interface InfantryType {
  classname: string;
  base: string;
  _type: string;
  minFOV: boolean;
  initFOV: boolean;
  maxFOV: boolean;
  HitFace: boolean;
  "HitNeck: HitFace": boolean;
  "HitHead: HitNeck": boolean;
  "HitPelvis: HitHead": boolean;
  "HitAbdomen: HitPelvis": boolean;
  "HitDiaphragm: HitAbdomen": boolean;
  "HitChest: HitDiaphragm": boolean;
  "HitBody: HitChest": boolean;
  "HitArms: HitBody": boolean;
  "HitHands: HitArms": boolean;
  "HitLegs: HitHands": boolean;
  "Incapacitated: HitLegs": boolean;
  armor: boolean;
  armorStructural: boolean;
  explosionShielding: boolean;
  minTotalDamageThreshold: boolean;
  impactDamageMultiplier: boolean;
  [key: string]: string | boolean;
}

export namespace Parsers {
  export const parseInfantryTypes = (
    soldierHitpoints: string[][],
    rows: string[][]
  ): string[] => {

    const toHitpointsCategory = (row: string[]): HitpointsCategory =>
      ({
        ...(row[1] && { armor: row[1] }),
        ...(row[2] && { passThrough: row[2] }),
        ...(row[3] && { explosionShielding: row[3] }),
        ...(row[4] && { minimalHit: row[4] }),
        ...(row[5] && { depends: row[5] }),
        ...(row[6] && { minTotalDamageThreshold: row[6] }),
        ...(row[7] && { impactDamageMultiplier: row[7] }),
        ...(row[8] && { armorStructural: row[8] }),
        ...(row[9] && { minFOV: row[9] }),
        ...(row[10] && { initFOV: row[10] }),
        ...(row[11] && { maxFOV: row[11] })
      } as HitpointsCategory);

    const toRecord = (row: string[]): InfantryType => ({
      classname: row[0],
      base: row[1],
      _type: row[2],
      minFOV: Utils.toBoolean(row[3]),
      initFOV: Utils.toBoolean(row[4]),
      maxFOV: Utils.toBoolean(row[5]),
      HitFace: Utils.toBoolean(row[6]),
      "HitNeck: HitFace": Utils.toBoolean(row[7]),
      "HitHead: HitNeck": Utils.toBoolean(row[8]),
      "HitPelvis: HitHead": Utils.toBoolean(row[9]),
      "HitAbdomen: HitPelvis": Utils.toBoolean(row[10]),
      "HitDiaphragm: HitAbdomen": Utils.toBoolean(row[11]),
      "HitChest: HitDiaphragm": Utils.toBoolean(row[12]),
      "HitBody: HitChest": Utils.toBoolean(row[13]),
      "HitArms: HitBody"
: Utils.toBoolean(row[14]),
      "HitHands: HitArms": Utils.toBoolean(row[15]),
      "HitLegs: HitHands": Utils.toBoolean(row[16]),
      "Incapacitated: HitLegs": Utils.toBoolean(row[17]),
      armor: Utils.toBoolean(row[18]),
      armorStructural: Utils.toBoolean(row[19]),
      explosionShielding: Utils.toBoolean(row[20]),
      minTotalDamageThreshold: Utils.toBoolean(row[21]),
      impactDamageMultiplier: Utils.toBoolean(row[22])
    });

    interface Set {
      [index: string]: boolean;
    }

    const definedBaseClasses: Set = {}
    const externalBaseClasses: Set = {}

    const hitpoints = soldierHitpoints.reduce<SoldierHitpoints>(
      (accum, curr) => {
        const category = toHitpointsCategory(curr);
        accum[curr[0]] = category;
        return accum;
      },
      {} as SoldierHitpoints
    );

    const renderHitpointsCategory = (category: HitpointsCategory): string[] => {
      const out: string[] = [];
      for (let key in category) {
        if (category[key]) {
          out.push(
            key === "depends"
              ? `${key}="${category[key]}"`
              : `${key}=${category[key]};`
          );
        }
      }
      return out;
    };

    const renderRecord = (
      hitpoints: SoldierHitpoints,
      record: InfantryType
    ): string[] => {
      definedBaseClasses[record.classname] = true;
      if (record.base && !(record.base in definedBaseClasses))
        externalBaseClasses[record.base] = true;

      const renderHitpointsClass = (
        key: string,
        record: InfantryType,
        hitpoints: SoldierHitpoints
      ): string[] =>
        {
        return hitpoints[key] && record[key]
          ? Utils.renderClass(
            key,
            undefined,
            ...renderHitpointsCategory(hitpoints[key])
          )
          : Utils.renderClass(key);
      }

      const viewPilot: string[] = hitpoints["viewPilot"]
        ? Utils.renderClass(
            "ViewPilot",
            "ViewPilot",
            ...renderHitpointsCategory(hitpoints["viewPilot"])
          )
        : [];

      const hitpointsClasses: string[] = [
        "HitFace",
        "HitNeck: HitFace",
        "HitHead: HitNeck",
        "HitPelvis: HitHead",
        "HitAbdomen: HitPelvis",
        "HitDiaphragm: HitAbdomen",
        "HitChest: HitDiaphragm",
        "HitBody: HitChest",
        "HitArms: HitBody",
        "HitHands: HitArms",
        "HitLegs: HitHands",
        "Incapacitated: HitLegs"
      ].reduce<string[]>(
        (accum: string[], key: string) => [
          ...accum,
          ...renderHitpointsClass(key, record, hitpoints)
        ],
        []
      );

      const out: string[] = Utils.renderClass(
        record.classname,
        record.base,
        ...Utils.optionalSpread(
          hitpoints["Overall"],
          renderHitpointsCategory(hitpoints["Overall"])
        ),
        ...viewPilot,
        ...Utils.renderClass("Hitpoints", undefined, ...hitpointsClasses)
      );
      return out;
    };


    const records: InfantryType[] = rows.map(toRecord)

    let out = records.reduce<string[]>(
      (accum: string[], curr: InfantryType) => [
        ...accum,
        ...renderRecord(hitpoints, curr)
      ],
      []
    );

    const externalClassDefinitions = Object.keys(externalBaseClasses).map((clss: string) => `class ${clss};`)
    return [...externalClassDefinitions, ...out];
  };
}
