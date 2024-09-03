import { LogItemRow, LogViewRow } from "../../database.types";
import dayjs, { Dayjs } from "dayjs";

import _ from "lodash";

export const GetUserID = () => {
  const stored = localStorage.getItem("USERID");
  const id = stored != null ? JSON.parse(stored) : crypto.randomUUID();
  localStorage.setItem("USERID", JSON.stringify(id));
  return id;
};

export async function delayFunction() {
  return new Promise<string>((resolve) => {
    console.log("start");
    setTimeout(() => {
      console.log("end");
      resolve("hello");
    }, 1000); // 1000 milliseconds = 1 second
  });
}

export const generateInviteLink = (inviteUuid: string) => {
  const baseUrl = window.location.origin;
  const path = "/share"; // Your sharing path
  const params = new URLSearchParams({
    id: inviteUuid, // Example parameter, replace with your actual parameter
  }).toString();

  return `${baseUrl}${path}?${params}`;
};

export function timeSince(date: number): string {
  const seconds = Math.floor((Date.now() - date) / 1000);

  if (seconds < 120) {
    return "<2 mins ago";
  } else if (seconds < 3600) {
    // Less than 60 minutes
    return `${Math.floor(seconds / 60)} mins ago`;
  } else if (seconds < 86400) {
    // Less than 24 hours
    return `${(seconds / 3600).toFixed(1)} hrs ago`;
  } else {
    return `${(seconds / 86400).toFixed(1)} days ago`;
  }
}

export function getOuncesToFeed(log: LogViewRow): number {
  const maxOuncesPerFeed = 5;
  return Math.min(getOuncesDue(log), maxOuncesPerFeed);
}

function getOuncesDue(log: LogViewRow): number {
  const date = dayjs(log.last_updated_at);
  const hoursSinceLastLog = dayjs().diff(date, "hour", true);
  const ouncesPerHour = log.next_mult ?? 1.25;
  return ouncesPerHour * hoursSinceLastLog;
}

const formatDate = (date: string | Dayjs) => dayjs(date).format("YYYY-MM-DD");

const generatePast30Days = () => {
  return _.range(0, 30).map((i) => formatDate(dayjs().subtract(i, "day")));
};

export const get30DCounts = (logs: LogItemRow[]) => {
  const past30Days = generatePast30Days().reverse();
  const countsByDay = _.zipObject(
    past30Days,
    _.fill(Array(past30Days.length), 0),
  );

  logs.forEach((log) => {
    const date = formatDate(log.created_at);
    if (_.has(countsByDay, date)) {
      countsByDay[date]++;
    }
  });

  // Convert countsByDay object to an array of { date, count } objects
  return _.map(countsByDay, (count, date) => ({ date, count }));
};
