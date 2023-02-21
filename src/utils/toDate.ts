export const toDate = (date?: string | null) =>
  date ? new Date(date) : undefined;
