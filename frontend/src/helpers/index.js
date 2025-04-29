import _ from 'lodash';

// Function to recursively clean the object
export function cleanObject(obj) {
  return _.omitBy(
    _.mapValues(obj, (value) => {
      if (_.isArray(value)) {
        // Recursively clean arrays
        return value.map(cleanObject);
      } else if (_.isObject(value)) {
        // Recursively clean nested objects
        return cleanObject(value);
      }
      return value;
    }),
    (val) => _.isEmpty(val) || _.isNil(val)
  ); // Remove empty strings, null, or undefined
}
