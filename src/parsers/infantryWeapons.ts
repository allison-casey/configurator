export namespace Parsers {
  export interface InfantryWeapon {
    classname: string;
    base: string;
    setting: {
      [index: string]: any;
      initSpeed: string;
      aimTransitionSpeed: string;
      dexterity: string;
      inertia: string;
      aiDispersionCoefY: string;
      aiDispersionCoefX: string;
      recoil: string;
    };
    single?: {
      base: string;
      dispersion: string;
      reloadTime: string;
    };
    auto?: {
      base: string;
      dispersion: string;
      reloadTime: string;
    };
    burst?: {
      base: string;
      dispersion: string;
      reloadTime: string;
    };
    recoil: {
      muzzleOuter: string[];
      permanent: string;
      temporary: string;
      kickBack: string[];
    };
  }

  interface Set {
    [index: string]: boolean;
  }

  interface Output {
    weapons: { bases: string[]; classes: string[] };
    recoils: { bases: string[]; classes: string[] };
  }

  export const parseInfantryWeapons = (
    rows: string[][]
  ): Output => {
    const definedBaseClasses: Set = {};
    const externalBaseClasses: Set = {};

    const cfgRecoilsBaseClasses: string = "class Default;";

    const to_record = (row: string[]): InfantryWeapon => ({
      classname: row[0],
      base: row[1],
      setting: {
        initSpeed: row[16],
        aimTransitionSpeed: row[17],
        dexterity: row[18],
        inertia: row[19],
        aiDispersionCoefX: row[20],
        aiDispersionCoefY: row[21],
        recoil: row[37]
      },
      ...(row[22] != "n/a" && {
        single: {
          base: row[23],
          dispersion: row[24],
          reloadTime: row[25]
        }
      }),
      ...(row[27] != "n/a" && {
        auto: {
          base: row[28],
          dispersion: row[29],
          reloadTime: row[30]
        }
      }),
      ...(row[32] != "n/a" && {
        burst: {
          base: row[33],
          dispersion: row[34],
          reloadTime: row[35]
        }
      }),
      recoil: {
        muzzleOuter: [...row.slice(38, 42)],
        permanent: row[42],
        temporary: row[43],
        kickBack: [...row.slice(44, 46)]
      }
    });

    const renderWeapon = (weapon: InfantryWeapon): string[] => {
      definedBaseClasses[weapon.classname] = true;
      if (weapon.base && !(weapon.base in definedBaseClasses))
        externalBaseClasses[weapon.base] = true;

      const settings: string[] = [];
      settings.push(`class ${weapon.classname}: ${weapon.base} {`);
      for (let key in weapon.setting) {
        settings.push(
          key == "recoil"
            ? `${key}="${weapon.setting[key]}";`
            : `${key}=${weapon.setting[key]};`
        );
      }

      if (weapon.single) externalBaseClasses[weapon.single.base] = true;
      const single = weapon.single
        ? [
            `class Single: ${weapon.single.base} {`,
            `dispersion=${weapon.single.dispersion};`,
            `reloadTime=${weapon.single.reloadTime};`,
            "};"
          ]
        : [];

      if (weapon.auto) externalBaseClasses[weapon.auto.base] = true;
      const auto = weapon.auto
        ? [
            `class FullAuto: ${weapon.auto.base} {`,
            `dispersion=${weapon.auto.dispersion};`,
            `reloadTime=${weapon.auto.reloadTime};`,
            "};"
          ]
        : [];

      if (weapon.burst) externalBaseClasses[weapon.burst.base] = true;
      const burst = weapon.burst
        ? [
            `class Burst: ${weapon.burst.base} {`,
            `dispersion=${weapon.burst.dispersion};`,
            `reloadTime=${weapon.burst.reloadTime};`,
            "};"
          ]
        : [];

      return [...settings, ...single, ...auto, ...burst, "};"];
    };

    const renderRecoil = (weapon: InfantryWeapon): string[] => {
      const out: string[] = [];
      out.push(`class ${weapon.setting.recoil}: Default {`);
      out.push(`muzzleOuter[]={${weapon.recoil.muzzleOuter.join(", ")}};`);
      out.push(`permanent=${weapon.recoil.permanent};`);
      out.push(`temporary=${weapon.recoil.temporary};`);
      out.push(`kickBack[]={${weapon.recoil.kickBack.join(", ")}};`);
      out.push("};");
      return out;
    };

    interface ParsedInfantryWeapons {
      weapons: string[];
      recoils: string[];
    }

    const parse = (
      { weapons, recoils }: ParsedInfantryWeapons,
      curr: InfantryWeapon
    ): ParsedInfantryWeapons => ({
      weapons: [...weapons, ...renderWeapon(curr)],
      recoils: [...recoils, ...renderRecoil(curr)]
    });

    const records: InfantryWeapon[] = rows
      .filter((arr: string[]) => arr[0] != "")
      .map(to_record);

    let out = records.reduce(parse, {
      weapons: [],
      recoils: []
    });

    // const externalClassDefinitions = Object.keys(externalBaseClasses).map(
    //   (clss: string) => `class ${clss};`
    // );

    return {
      weapons: { bases: Object.keys(externalBaseClasses), classes: out.weapons },
      recoils: { bases: ['Default'], classes: out.recoils }
    }
    // return { ...out, weapons: [...externalClassDefinitions, ...out.weapons] };
  };
}
