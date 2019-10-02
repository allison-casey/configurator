namespace Parsers {
  export type BasicSetting = [string, string];

  export const parseBasicSettings = (settings: BasicSetting[]): string[] => {
    let indent_level: number = 0;
    let output: string[];

    const parse = ([key, value]: BasicSetting): string => {
      if (key && value == "") {
        let out = `${Utils.repeatString(indent_level, "  ")}Class ${key} {`;
        indent_level++;
        return out
      } else if (key == "" && value == "") {
        const dedents: string = Utils.repeatString(indent_level, "};");
        indent_level = 0;
        return dedents;
      } else {
        return `${Utils.repeatString(indent_level, "  ")}${key} = ${value};`;
      }
    };
    output = settings.map(parse);
    output = output.concat(Utils.repeatString(indent_level, "};"));

    return output;
  };
}
