export const oneYearFromNow = () =>
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

export const fiveMinutAgo = () => new Date(Date.now() - 5 * 60 * 1000);

export const oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);
