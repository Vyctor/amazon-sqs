interface PaymentData {
  user: {
    id: string;
    name: string;
    username: string;
  };
  card_data: {
    brand: string;
    number: string;
    bank: string;
    name: string;
    address: string;
    country: string;
    cvv: number;
    expire: string;
    pin: string;
  };
  total_purchase: number;
}

class ValidatePayment {
  public execute(paymentData: PaymentData): boolean {
    try {
      this.validateUserMoney(paymentData.total_purchase);
      this.validateCardExpiration(paymentData.card_data.expire);

      return true;
    } catch (error) {
      const result = (error as Error).message;
      throw new Error(result);
    }
  }

  private validateUserMoney(total_purchase: number) {
    const credit_limit = Number.parseFloat(Math.random().toPrecision(2));

    if (credit_limit < total_purchase) {
      throw new Error('User has not enough credit to pay');
    }
  }

  private validateCardExpiration(expire: string) {
    const [month, year] = expire.split('/');

    const expire_date = new Date().setFullYear(Number.parseInt(year, 10), Number.parseInt(month, 10), 0);
    const current_date = new Date().setFullYear(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    return current_date > expire_date;
  }
}

export default ValidatePayment;
