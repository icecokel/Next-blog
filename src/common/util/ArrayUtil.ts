type sortType = "ASC" | "DESC";

export const sortByKey = (target: any[], key: string, type: sortType = "ASC"): any[] => {
  return target.sort((a, b) => {
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    return 0;
  });
};

export const isIncludesFromTargetByKey = (source: any, target: any[], key: string): boolean => {
  return target.map((item) => item[key]).includes(source[key]);
};
