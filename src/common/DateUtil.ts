const getTimeList = (type: "hours" | "minutes") => {
  const maxCount = type === "hours" ? 24 : 60;
  const timeList = new Array();

  for (let i = 0; i < maxCount; i++) {
    timeList.push(i);
  }

  return timeList;
};

export const formatDateToString = (
  date: Date,
  format: string = "YYYY-MM-DD"
) => {
  return format
    .replaceAll(/YYYY/gi, date.getFullYear().toString())
    .replaceAll(/YY/gi, date.getFullYear().toString().slice(-2))
    .replaceAll(/MM/g, date.getMonth().toString().padStart(2, "0"))
    .replaceAll(/M/g, date.getMonth().toString())
    .replaceAll(/DD/gi, date.getDate().toString().padStart(2, "0"))
    .replaceAll(/D/gi, date.getDate().toString())
    .replaceAll(/HH/gi, date.getHours().toString().padStart(2, "0"))
    .replaceAll(/H/gi, date.getHours().toString())
    .replaceAll(/mm/g, date.getMinutes().toString().padStart(2, "0"))
    .replaceAll(/m/g, date.getMinutes().toString())
    .replaceAll(/ss/gi, date.getSeconds().toString());
};

export const HOURS = getTimeList("hours");
export const MINUTES = getTimeList("minutes");
