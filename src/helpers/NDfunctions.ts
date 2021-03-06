import _ from "lodash";

export const getMean = (lowerBound: number, upperBound: number): number =>
  (upperBound + lowerBound) / 2;

export const getStdDeviation = (lowerBound: number, upperBound: number): number =>
  (upperBound - lowerBound) / 4;

export const generatePoints = (lowerBound: number, upperBound: number): number[] => {
  let stdDev = getStdDeviation(lowerBound, upperBound);
  let min = 0;
  let max = upperBound + 2 * stdDev;
  let unit = (max - min) / 100;
  return _.range(min, max, unit);
};

export const GetZPercent = (z: number): number => {
  // z == number of standard deviations from the mean
  // if z is greater than 6.5 standard deviations from the mean the
  // number of significant digits will be outside of a reasonable range
  if (z < -6.5) {
    return 0.0;
  }
  if (z > 6.5) {
    return 1.0;
  }
  let factK = 1,
    sum = 0,
    term = 1,
    k = 0;
  let loopStop = Math.exp(-23);

  while (Math.abs(term) > loopStop) {
    term =
      (((0.3989422804 * Math.pow(-1, k) * Math.pow(z, k)) /
        (2 * k + 1) /
        Math.pow(2, k)) *
        Math.pow(z, k + 1)) /
      factK;
    sum += term;
    k++;
    factK *= k;
  }
  sum += 0.5;
  return sum;
};

export const GetNewZPercent = (z: number): number => {
  if (z < -6.5) {
    return 0.0;
  }
  if (z > 6.5) {
    return 1.0;
  }
  let factK = 1,
    sum = 0,
    term = 1,
    k = 0;
  let loopStop = Math.exp(-23);

  while (Math.abs(term) > loopStop) {
    term =
      (((0.3989422804 * Math.pow(-1, k) * Math.pow(z, k)) /
        (2 * k + 1) /
        Math.pow(2, k)) *
        Math.pow(z, k + 1)) /
      factK;
    sum += term;
    k++;
    factK *= k;
  }
  sum += 0.5;
  if (sum > 0.5) {
    return (1 - sum) * 100;
  } else {
    return sum * 100;
  }
};
