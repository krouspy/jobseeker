/**
 * check if minimum salary is above 40000
 * @param jobSalary - integer or null
 */
export const checkMinimumSalary = (jobSalary: number | null | undefined) => {
  if (jobSalary === undefined || jobSalary === null) {
    return false;
  }

  return jobSalary >= 40000;
};

export const checkLocationLondon = (jobLocation: string) => {
  return jobLocation.toLowerCase() === 'london';
};
