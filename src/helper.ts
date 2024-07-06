export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // getMonth returns 0-indexed month
  const day = d.getDate().toString().padStart(2, "0");
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
}
