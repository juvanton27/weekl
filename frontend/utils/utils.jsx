/***********************
 *         DATE
 ***********************/

/**
 * Check if 2 dates are on the same day
 * @param {*} date1 
 * @param {*} date2 
 * @returns true if it's the case, false otherwise
 */
export const isSameDay = (date1, date2) => {
  return date1?.getFullYear() === date2?.getFullYear() &&
  date1?.getMonth() === date2?.getMonth() &&
  date1?.getDate() === date2?.getDate();
}

/***********************
 *        STRINGS
 ***********************/

/**
 * Set the first letter of the string given in caps
 * @param {*} string the string to modify
 * @returns the new string
 */
export const capFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}