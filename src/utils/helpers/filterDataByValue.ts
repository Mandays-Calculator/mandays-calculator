import _ from "lodash";

/**
 * Filters an array of objects based on a filter value and a set of keys.
 *
 * @param {any[]} data - The array of objects to be filtered.
 * @param {string} filterValue - The value to filter by.
 * @param {string[]} keys - The keys of the objects to filter on.
 * @returns {any[]} A filtered array of objects.
 *
 */
export function filterDataByValue(
  data: any[],
  filterValue: string,
  keys: string[]
): any[] {
  return _.filter(data, (item) => {
    return _.some(keys, (key) => {
      const value = item[key];
      return _.includes(String(value).toLowerCase(), filterValue.toLowerCase());
    });
  });
}
