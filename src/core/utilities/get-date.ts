/**
 * Get current ISO date/time string
 * @param date
 * @returns
 */
const nowDate = (date = new Date()) => {
  return {
    timestamp: `${date.toISOString().split('T')[0]} ${date.toLocaleTimeString(
      'en-US',
      {
        hour12: false,
      },
    )}`,

    date: date,
  };
};

export default nowDate;
