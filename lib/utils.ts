import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeDifference(current: Date, previous: Date): string {
  // Check if the input values are valid Date objects
  if (!(current instanceof Date) || !(previous instanceof Date)) {
    throw new Error("Both 'current' and 'previous' must be Date objects.");
  }

  const msPerMinute: number = 60 * 1000;
  const msPerHour: number = msPerMinute * 60;
  const msPerDay: number = msPerHour * 24;
  const msPerMonth: number = msPerDay * 30;
  const msPerYear: number = msPerDay * 365;

  const elapsed: number = current.getTime() - previous.getTime();

  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} seconds ago`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hours ago`;
  } else if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)} days ago`;
  } else if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)} months ago`;
  } else {
    return `${Math.round(elapsed / msPerYear)} years ago`;
  }
}



// write a function to capitalize a string
export function capitalize(str: string) {
  return str.replace(/^\w/, c => c.toUpperCase());
}
