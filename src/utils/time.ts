export const getTimeFromDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const hours = date.getHours();

  const formattedHours =
    hours > 12
      ? (hours - 12).toString().padStart(2, '0')
      : hours.toString().padStart(2, '0');

  const minutes = date.getMinutes().toString().padStart(2, '0');
  const time = formattedHours + ':' + minutes;

  return { time, isPM: hours > 12 };
};

export const getMinutesFormatFromSeconds = (time: number) => {
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = Math.floor((time % 3600) % 60);

  const hDisplay = h > 0 ? h + 'h ' : '';
  const mDisplay = m > 0 ? m + 'm ' : '';
  const sDisplay = s > 0 ? s + 's' : '';
  return hDisplay + mDisplay + sDisplay;
};
