/// <reference path="./ammo.ts" />

import { Utils } from "../utils";

export namespace Parsers {
  export type BasicSetting = [string, string];

  const cfgBaseClasses: string[] = `
  class Mode_SemiAuto {};
  class Mode_Burst: Mode_SemiAuto {};
  class Mode_FullAuto: Mode_SemiAuto {};
`.split("\n")

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
          out = ["};", `class ${key} {`];
        } else {
          out = [`class ${key} {`];
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
    console.log(cfgBaseClasses);
    arr = [...cfgBaseClasses, ...arr, ...Utils.fillArray(indent_level, "};")];

    return arr;
  };
}
