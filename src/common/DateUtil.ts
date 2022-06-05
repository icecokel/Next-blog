const getTimeList = (type: "hours" | "minutes") => {
  const maxCount = type === "hours" ? 24 : 60;
  const timeList = new Array();

  for (let i = 0; i < maxCount; i++) {
    timeList.push(i);
  }

  return timeList;
};

export const HOURS = getTimeList("hours");
export const MINUTES = getTimeList("minutes");
