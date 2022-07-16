const getTimeList = (type: "hours" | "minutes") => {
  const maxCount = type === "hours" ? 24 : 60;
  const timeList = new Array();

  for (let i = 0; i < maxCount; i++) {
    timeList.push(i);
  }

  return timeList;
};

const converDateType = (target: Date | string) => {
  return typeof target === "string" ? new Date(target) : target;
};

export const formatDateToString = (
  date: Date,
  format: string = "YYYY-MM-DD"
) => {
  return format
    .replaceAll(/YYYY/gi, converDateType(date).getFullYear().toString())
    .replaceAll(/YY/gi, converDateType(date).getFullYear().toString().slice(-2))
    .replaceAll(
      /MM/g,
      converDateType(date).getMonth().toString().padStart(2, "0")
    )
    .replaceAll(/M/g, converDateType(date).getMonth().toString())
    .replaceAll(
      /DD/gi,
      converDateType(date).getDate().toString().padStart(2, "0")
    )
    .replaceAll(/D/gi, converDateType(date).getDate().toString())
    .replaceAll(
      /HH/gi,
      converDateType(date).getHours().toString().padStart(2, "0")
    )
    .replaceAll(/H/gi, converDateType(date).getHours().toString())
    .replaceAll(
      /mm/g,
      converDateType(date).getMinutes().toString().padStart(2, "0")
    )
    .replaceAll(/m/g, converDateType(date).getMinutes().toString())
    .replaceAll(/ss/gi, converDateType(date).getSeconds().toString());
};

export const HOURS = getTimeList("hours");
export const MINUTES = getTimeList("minutes");
