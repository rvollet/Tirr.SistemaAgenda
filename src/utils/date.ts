export const isValidDate = (day: number, month: number, year: number) => {
  const selected = new Date(year, month, day);
  const now = new Date();

  selected.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  return selected >= now;
};