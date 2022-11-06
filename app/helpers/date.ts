import { DateTime } from "luxon";
export const relative = (date: Date) => DateTime.fromJSDate(date).toRelative();
