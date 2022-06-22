import 'dotenv/config';

import paymentQueue from './payment/payment-queue';

paymentQueue.on('error', (err) => {
  console.error(err.message);
});

paymentQueue.on('processing_error', (err) => {
  console.error('Error while processing message', err.message);
});

paymentQueue.on('empty', () => {
  console.error('Queue is empty');
});

paymentQueue.start();
