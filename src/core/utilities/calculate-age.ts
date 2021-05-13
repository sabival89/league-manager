import nowDate from './get-date';

/**
 * Calculate age
 * @param date
 * @returns
 */
const calculateAge = (date: Date): number =>
  Number(nowDate().date.getFullYear()) - Number(date.toString().split('-')[0]);

export default calculateAge;
