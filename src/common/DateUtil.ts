const _getTimeList = (type: "hours" | "minutes"): number[] => {
  const maxCount = type === "hours" ? 24 : 60;
  const timeList = new Array();

  for (let i = 0; i < maxCount; i++) {
    timeList.push(i);
  }

  return timeList;
};

const _converDateType = (target: Date | string): Date => {
  return typeof target === "string" ? new Date(target) : target;
};

const _format = (date: Date, format: string = "YYYY-MM-DD"): string => {
  return format
    .replaceAll(/YYYY/gi, date.getFullYear().toString())
    .replaceAll(/YY/gi, date.getFullYear().toString().slice(-2))
    .replaceAll(/MM/g, (date.getMonth() + 1).toString().padStart(2, "0"))
    .replaceAll(/M/g, (date.getMonth() + 1).toString())
    .replaceAll(/DD/gi, date.getDate().toString().padStart(2, "0"))
    .replaceAll(/D/gi, date.getDate().toString())
    .replaceAll(/HH/gi, date.getHours().toString().padStart(2, "0"))
    .replaceAll(/H/gi, date.getHours().toString())
    .replaceAll(/mm/g, date.getMinutes().toString().padStart(2, "0"))
    .replaceAll(/m/g, date.getMinutes().toString())
    .replaceAll(/ss/gi, date.getSeconds().toString());
};

export const formatDateToString = (date: Date | string, format: string = "YYYY-MM-DD"): string => {
  return _format(_converDateType(date), format);
};

export const HOURS = _getTimeList("hours");
export const MINUTES = _getTimeList("minutes");
