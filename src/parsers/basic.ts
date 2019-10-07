import { Utils } from "../utils";
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
}