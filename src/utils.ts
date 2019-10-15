export namespace Utils {
  export const fillArray = <T>(n: number, value: T): T[] => {
    const arr: T[] = [];
    for (var i = 0; i < n; i++) {
      arr[i] = value;
    }
    return arr;
  };

  export const repeatString = (n: number, value: string): string => {
    return new Array(n + 1).join(value);
  };

  export const capitalize = (str: string) =>
    str[0].toUpperCase() + str.substr(1).toLowerCase();

  export const toBoolean = (str: string): boolean =>
    str === "TRUE" || str === "true" ? true : false;

  export const renderClass = (
    classname: string,
    base?: string,
    ...args: string[]
  ): string[] => {
    const out: string[] = [];
    out.push(`Class ${classname} ` + (base ? `: ${base} {` : "{"));
    out.push(...args);
    out.push("};");
    return out;
  };

  export const optionalSpread = (condition: any, content: any) =>
    condition && content;

  export const renderProperties = (keys: string[], record: any): string[] =>
    keys.reduce<string[]>(
    (accum: string[], key: string) =>
      record[key] ? [...accum, `${key}=${record[key]};`] : accum,
    []
  );
}
