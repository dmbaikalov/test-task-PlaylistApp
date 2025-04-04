export function sumTimeInSeconds(time: string[]) {
  let totalMinutes = 0;
  let totalSeconds = 0;

  time.forEach((t) => {
    const [minutes, seconds] = t.split(':').map(Number);
    totalMinutes += minutes;
    totalSeconds += seconds;
  });

  totalSeconds += totalMinutes * 60;

  return `${totalSeconds}`;
}
