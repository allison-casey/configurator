import { Utils } from './utils'

export namespace Parsers {
  export type BasicSetting = [string, string];

  export const parseBasicSettings = (settings: BasicSetting[]): string[] => {
    let indent_level: number = 0;
    let output: string[];

      const parse = (acc: string[], [key, value]: BasicSetting): string[] => {
        if (key && value == "") {
            let out: string[];
            if (indent_level > 1) {
                out = ["};",`Class ${key} {` ]
            } else {
                out = [`Class ${key} {`]
                indent_level++;
            }
            return [...acc, ...out]
        } else if (key == "" && value == "") {
            const dedents: string[] = Utils.fillArray(indent_level, "};")
            indent_level = 0;
            return [...acc, ...dedents];
        } else {
            return [...acc, `${key} = ${value};`];
        }
      }
      output = settings.reduce(parse, []);
      output = [...output, ...Utils.fillArray(indent_level, "};")]

    return output;
  };
}
