import fetch from 'node-fetch';
import { Job } from './types';

// workaround because Headers is not recognized
global.Headers = fetch.Headers;

class ReedClient {
  private _apiKey: string;
  private _headers: Headers;

  constructor(apiKey: string) {
    this._apiKey = apiKey;

    const basicAuthEncoded = Buffer.from(`${this._apiKey}:`).toString('base64');
    this._headers = new Headers();
    this._headers.set('Authorization', `Basic ${basicAuthEncoded}`);
  }

  private async getRequest(url: string) {
    const { results } = await fetch(url, { headers: this._headers }).then(res => res.json());
    return results;
  }

  getJobs(): Promise<Job[]> {
    const url = 'https://www.reed.co.uk/api/1.0/search';
    return this.getRequest(url);
  }

  getGraduateJobs(): Promise<Job[]> {
    const url = 'https://www.reed.co.uk/api/1.0/search?keywords=software&graduate=true';
    return this.getRequest(url);
  }

  // only because the data returned by the API does not mention the job field
  getBlockchainJobsAroundLondon(): Promise<Job[]> {
    const url =
      'https://www.reed.co.uk/api/1.0/search?keywords=blockchain&location=london&distancefromlocation=50';
    return this.getRequest(url);
  }
}

export { ReedClient };
