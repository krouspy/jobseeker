export interface Job {
  jobId: number;
  employerId: number;
  employerName: string;
  employerProfileId: number | null;
  employerProfileName: string | null;
  jobTitle: string;
  locationName: string;
  minimumSalary: number | null;
  maximumSalary: number | null;
  currency: string | null;
  expirationDate: string | null;
  date: string | null;
  jobDescription: string;
  applications: number;
  jobUrl: string;
}
