import { Kafka } from 'kafkajs';
import { clientId, brokers, topics } from './config';

const consumer = async (topic: string) => {
  const kafka = new Kafka({ clientId, brokers });
  const groupId = `group-${topic}`;
  const consumerClient = kafka.consumer({ groupId });

  await consumerClient.connect();
  await consumerClient.subscribe({ topic, fromBeginning: true });

  await consumerClient.run({
    eachMessage: async ({ message }) => {
      if (!message.value) {
        throw new Error(`Consumer ${topic}: message.value undefined`);
      }

      const result = JSON.parse(message.value.toString());
      if (topic !== topics.other) {
        console.log(result);
      }
      console.log(`Consumer ${topic} received new record!`);
    },
  });
};

consumer(topics.other);
consumer(topics.minimumSalary);
consumer(topics.locationLondon);
consumer(topics.blockchainAroundLondon);
consumer(topics.graduate);
