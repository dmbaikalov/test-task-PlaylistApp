export function sumTimeInSeconds(times: string[]): string {
  let totalSeconds = 0;

  for (const time of times) {
    const [minutesStr, secondsStr] = time.split(':');
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);

    if (isNaN(minutes) || isNaN(seconds)) {
      throw new Error(
        `Invalid time format: "${time}". Expected format "mm:ss"`
      );
    }

    totalSeconds += minutes * 60 + seconds;
  }

  return totalSeconds.toString();
}
