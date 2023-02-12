import moment from "moment";
import "moment/locale/ko";

const _getTimeList = (type: "hours" | "minutes"): number[] => {
  const maxCount = type === "hours" ? 24 : 60;
  const timeList = new Array();

  for (let i = 0; i < maxCount; i++) {
    timeList.push(i);
  }

  return timeList;
};

export const fromNow = (date: Date) => {
  return moment(date).fromNow();
};

export const formatDateToString = (date: Date | string, format: string = "YYYY-MM-DD"): string => {
  return moment(date).format(format);
};

export const HOURS = _getTimeList("hours");
export const MINUTES = _getTimeList("minutes");
