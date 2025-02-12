export function getDurationString(duration: number) {
  const minutes = Math.floor(duration / 60);
  const remainingSeconds = duration % 60;

  // Format with leading zeros for seconds
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${minutes}:${formattedSeconds}`;
}
