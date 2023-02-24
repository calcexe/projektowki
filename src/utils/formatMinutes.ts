export const formatMinutes = (minutes: number): string => {
  if (minutes === 0) return "0";
  const hours = Math.floor(minutes / 60);
  const min = minutes - hours * 60;
  return `${hours ?? 0}:${min < 10 ? `0${min}` : min}`;
};
