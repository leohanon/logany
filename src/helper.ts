export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // getMonth returns 0-indexed month
  const day = d.getDate().toString().padStart(2, "0");
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
}

export function timeSince(date: number): string {
  const seconds = Math.floor((Date.now() - date) / 1000);

  if (seconds < 120) {
    return "<2 mins ago";
  } else if (seconds < 3600) {
    // Less than 60 minutes
    return `${Math.floor(seconds / 60)} mins ago`;
  } else if (seconds < 86400) {
    // Less than 24 hours
    return `${(seconds / 3600).toFixed(1)} hours ago`;
  } else {
    return `${(seconds / 86400).toFixed(1)} days ago`;
  }
}
