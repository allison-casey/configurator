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
}
