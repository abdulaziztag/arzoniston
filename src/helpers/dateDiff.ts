import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatTimeDifference(date: string): {diff: number; key: string} {
  const now = dayjs(); // Current time
  const inputDate = dayjs(date); // Input date
  const diffInHours = now.diff(inputDate, "hour");
  const diffInDays = now.diff(inputDate, "day");
  const diffInMonths = now.diff(inputDate, "month");
  const diffInYears = now.diff(inputDate, "year");

  if (diffInHours < 24) {
    return {diff: diffInHours, key: "hours"};
  } else if (diffInDays < 30) {
    return {diff: diffInDays, key: "days"};
  } else if (diffInMonths < 12) {
    return {diff: diffInMonths, key: "months"};
  } else {
    return {diff: diffInYears, key: "years"};
  }
}