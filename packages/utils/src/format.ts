/**
 * 列表转对象
 * @param list eg: [2,4]
 * @returns { 2: 2, 4: 3 }
 */
export const mapListToObject = (list: (string | number)[]) => {
  return list.reduce((result, val) => ((result[val] = val), result), {});
};
