import 'dotenv/config';

export const apiKey = process.env.API_KEY;
export const clientId = 'jobseeker';
export const brokers = ['localhost:9092'];

export const topics = {
  minimumSalary: 'minimum-salary',
  locationLondon: 'location-london',
  blockchainAroundLondon: 'blockchain-around-london',
  graduate: 'software-graduate',
  other: 'other',
};
