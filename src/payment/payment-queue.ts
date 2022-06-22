import { Consumer } from 'sqs-consumer';
import * as AWS from 'aws-sdk';
import https from 'https';
import PaymentData from './entities/payment-data';
import RegisterPayment from './register-payment';

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
  handleMessageBatch: async (messages) => {
    const registerPayment = new RegisterPayment();

    const promises = messages.map((message) => {
      const data: PaymentData = JSON.parse(message.Body);
      return registerPayment.execute(data);
    });

    await Promise.all(promises);
  },
  sqs: new AWS.SQS({
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true,
      }),
    },
  }),
});

paymentQueue.on('error', (err) => {
  console.error('Payment Queue: ', err.message);
});

paymentQueue.on('processing_error', (err) => {
  console.error('Payment Queue: Error while processing message', err.message);
});

paymentQueue.on('empty', () => {
  console.error('Payment Queue is empty');
});

export default paymentQueue;
