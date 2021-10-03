const _ = require('lodash');

export const sortByPropertyAlphaNumeric = (a, b, property) =>
  a[property]
    .trim()
    .toLowerCase()
    .localeCompare(b[property].trim().toLowerCase(), 'en', { numeric: true });

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const formatOptions = (options, access) => {
  const collection = options.map((option) => ({
    value: option.uuid,
    label: _.get(option, access),
  }));

  return collection;
};

export const formatOptionsPair = (options, accessOne, accessTwo) => {
  const collection = options.map((option) => ({
    value: option.uuid,
    label: `${_.get(option, accessOne)}-${_.get(option, accessTwo)}`,
  }));

  return collection;
};
