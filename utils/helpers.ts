export function sumTimeInSeconds(time: string[]): string {
  let totalSeconds = 0;

  for (const t of time) {
    const [minutesStr, secondsStr] = t.split(':');
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);

    totalSeconds += minutes * 60 + seconds;
  }

  return totalSeconds.toString();
}
