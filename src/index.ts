import 'dotenv/config';

import paymentQueue from './payment/payment-queue';
import paymentDLQ from './payment-dlq/payment-dlq';

paymentQueue.start();
paymentDLQ.start();
