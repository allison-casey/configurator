import { Utils } from "./utils";
import { forOfStatement } from "@babel/types";

export namespace Parsers {
  export type BasicSetting = [string, string];

  /**
   * Parses the basic data in the basic settings sheet.
   * @param settings array of key value pairs of type `BasicSetting`
   * @return `string[]` of the compiled cfg.
   */
  export const parseBasicSettings = (settings: BasicSetting[]): string[] => {
    type Reducer = { indent_level: number; arr: string[] };

    const parse = (
      { indent_level, arr }: Reducer,
      [key, value]: BasicSetting
    ): Reducer => {
      if (key && value == "") {
        let out: string[];
        if (indent_level > 1) {
          out = ["};", `Class ${key} {`];
        } else {
          out = [`Class ${key} {`];
          indent_level++;
        }
        return { indent_level, arr: [...arr, ...out] };
      } else if (key == "" && value == "") {
        const dedents: string[] = Utils.fillArray(indent_level, "};");
        indent_level = 0;
        return { indent_level, arr: [...arr, ...dedents] };
      } else {
        return { indent_level, arr: [...arr, `${key} = ${value};`] };
      }
    };
    let { indent_level, arr } = settings.reduce(parse, {
      indent_level: 0,
      arr: []
    });
    arr = [...arr, ...Utils.fillArray(indent_level, "};")];

    return arr;
  };

  export type AmmoSetting = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  export interface AmmoRecord {
    classname: string;
    base: string;
    category?: string;
    description?: string;
    settings: {
      [index: string]: any;
      hit?: string;
      indirectHit?: string;
      indirectHitRange?: string;
      explosive?: string;
      explosiveEffects?: string;
      dangerRadiusBulletClose?: string;
      dangerRadiusHit?: string;
      suppressionRadiusBulletClose?: string;
      suppressionRadiusHit?: string;
      deflecting?: string;
      timeToLive?: string;
      tracerScale?: string;
      proximityExplosionDistance?: string;
    };
  }
  /**
   * Parses the Ammo Sheet
   */
  export const parseAmmoSettings = (settings: AmmoSetting[]): string[] => {
    const to_record = (setting: AmmoSetting): AmmoRecord => ({
      classname: setting[0],
      base: setting[1],
      ...(setting[2] && { category: setting[2] }),
      ...(setting[3] && { description: setting[3] }),
      settings: {
        ...(setting[4] && { hit: setting[4] }),
        ...(setting[5] && { indirectHit: setting[5] }),
        ...(setting[6] && { indirectHitRange: setting[6] }),
        ...(setting[7] && { explosive: setting[7] }),
        ...(setting[8] && { explosiveEffects: setting[8] }),
        ...(setting[9] && { dangerRadiusBulletClose: setting[9] }),
        ...(setting[10] && { dangerRadiusHit: setting[10] }),
        ...(setting[11] && { suppressionRadiusBulletClose: setting[11] }),
        ...(setting[12] && { suppressionRadiusHit: setting[12] }),
        ...(setting[13] && { deflecting: setting[13] }),
        ...(setting[14] && { timeToLive: setting[14] }),
        ...(setting[15] && { tracerScale: setting[15] }),
        ...(setting[16] && { proximityExplosionDistance: setting[16] })
      }
    });

    const render_record = (record: AmmoRecord): string[] => {
      const out = [];
      out.push(`Class ${record.classname} : ${record.base} {`);
      for (let key in record.settings) {
        out.push(`${key} = ${record.settings[key]};`);
      }
      out.push("};");
      return out;
    };
      const out: string[] = settings.reduce<string[]>((acc, cur): string[] => [...acc, ...render_record(to_record(cur))], [])
    return ["Class CfgAmmo {", ...out, "};"];
  };
}
