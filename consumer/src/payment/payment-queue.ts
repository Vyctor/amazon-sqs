import { Consumer } from 'sqs-consumer';
import * as AWS from 'aws-sdk';
import https from 'https';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const QUEUE_URL = process.env.AWS_SQS_PAYMENT_QUEUE;

const paymentQueue = Consumer.create({
  queueUrl: QUEUE_URL,
  batchSize: 10,
  waitTimeSeconds: 20,
  pollingWaitTimeMs: 5,
  handleMessageBatch: async (messages) => {
    console.log('messages', messages.length);
  },
  sqs: new AWS.SQS({
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true,
      }),
    },
  }),
});

export default paymentQueue;
