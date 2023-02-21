export const maybeSingle = <T>(data?: T[] | null | T) => {
  return Array.isArray(data) ? data[0] : data;
};
