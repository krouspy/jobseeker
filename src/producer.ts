import { Kafka } from 'kafkajs';
import { apiKey, clientId, brokers, topics } from './config';
import { ReedClient } from './Reed';
import { checkMinimumSalary, checkLocationLondon } from './handlers';
import { sleep } from './utils';
import { Job } from './types';

/**
 * The reed API does not seem enough active for a quick demo
 * so instead of fetching periodically the api, we fetch a fix number (<=100)
 * and send them one by one to kafka with some delay between each
 * in order to simulate incoming data flows
 */

const kafka = new Kafka({ clientId, brokers });
const producerClient = kafka.producer();

const reed = new ReedClient(apiKey);

const producer = async (job: Job, topic) => {
  await producerClient.send({
    topic,
    messages: [
      {
        key: job.jobId.toString(),
        value: JSON.stringify(job),
      },
    ],
  });
};

const producerAllJobs = async () => {
  const jobs = await reed.getJobs();

  for (let i = 0; i < jobs.length; i++) {
    console.log(`Sending job ${i + 1}...`);
    const job = jobs[i];

    if (checkMinimumSalary(job.minimumSalary)) {
      producer(job, topics.minimumSalary);
    }

    if (checkLocationLondon(job.locationName)) {
      producer(job, topics.locationLondon);
    }

    producer(job, topics.other);
    await sleep(5000);
  }
};

const producerBlockchainJobsAroundLondon = async () => {
  const jobs = await reed.getBlockchainJobsAroundLondon();

  for (let i = 0; i < jobs.length; i++) {
    console.log(`Sending blockchain job ${i + 1}...`);
    const job = jobs[i];
    producer(job, topics.blockchainAroundLondon);
    await sleep(5000);
  }
};

const producerGraduateJobs = async () => {
  const jobs = await reed.getGraduateJobs();

  for (let i = 0; i < jobs.length; i++) {
    console.log(`Sending graduate job ${i + 1}`);
    const job = jobs[i];
    producer(job, topics.graduate);
    await sleep(5000);
  }
};

(async function () {
  await producerClient.connect();

  const promises: Array<Promise<void>> = [
    producerAllJobs(),
    producerBlockchainJobsAroundLondon(),
    producerGraduateJobs(),
  ];
  await Promise.all(promises);

  await producerClient.disconnect();
})();
