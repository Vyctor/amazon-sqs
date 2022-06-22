import { Consumer } from 'sqs-consumer';
import * as AWS from 'aws-sdk';
import https from 'https';
import PaymentData from '../payment/entities/payment-data';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const QUEUE_URL = process.env.AWS_SQS_PAYMENT_DLQ;

const paymentDLQ = Consumer.create({
  queueUrl: QUEUE_URL,
  waitTimeSeconds: 20,
  handleMessage: async (message) => {
    const data: PaymentData = JSON.parse(message.Body);

    console.log(`Sending payment declined mail to user ${data.user.name} on ${data.user.email}`);
  },
  sqs: new AWS.SQS({
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true,
      }),
    },
  }),
});

paymentDLQ.on('error', (err) => {
  console.error('Payment DLQ: ', err.message);
});

paymentDLQ.on('processing_error', (err) => {
  console.error('Payment DLQ:: Error while processing message', err.message);
});

paymentDLQ.on('empty', () => {
  console.error('Payment DLQ is empty');
});

export default paymentDLQ;
