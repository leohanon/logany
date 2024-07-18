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
