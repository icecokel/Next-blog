import { DateTime } from "luxon";

const _getTimeList = (type: "hours" | "minutes"): number[] => {
  const maxCount = type === "hours" ? 24 : 60;
  return Array.from({ length: maxCount }, (v, i) => i);
};
export const fromNow = (date: Date) => {
  return DateTime.fromJSDate(date).toRelative();
};

export const formatDateToString = (date: Date | string, format: string = "yyyy-LL-dd"): string => {
  const dateByType = typeof date === "string" ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dateByType.toFormat(format);
};

export const HOURS = _getTimeList("hours");
export const MINUTES = _getTimeList("minutes");
