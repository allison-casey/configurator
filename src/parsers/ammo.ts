import { Utils } from "../utils";

export namespace Parsers {
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
    const out: string[] = settings.reduce<string[]>(
      (acc, cur): string[] => [...acc, ...render_record(to_record(cur))],
      []
    );
    return ["Class CfgAmmo {", ...out, "};"];
  };
}
