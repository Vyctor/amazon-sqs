import PaymentData from './entities/payment-data';
import ValidatePayment from './validate-payment';

class RegisterPayment {
  public async execute(paymentData: PaymentData): Promise<void> {
    const validatePayment = new ValidatePayment();

    try {
      validatePayment.execute({ card_expire_data: paymentData.card_data.expire, total_purchase: paymentData.total_purchase });

      console.info('Payment was registered successfully');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default RegisterPayment;
