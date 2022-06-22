interface ValidatePaymentData {
  total_purchase: number;
  card_expire_data: string;
}

class ValidatePayment {
  public execute(paymentData: ValidatePaymentData): boolean {
    try {
      this.validateUserMoney(paymentData.total_purchase);
      this.validateCardExpiration(paymentData.card_expire_data);
    } catch (error) {
      const result = (error as Error).message;
      throw new Error(result);
    }

    return true;
  }

  private validateUserMoney(total_purchase: number): void {
    const credit_limit = Math.random() * 1750;

    const userDoesNotHaveEnoughMoney = total_purchase > credit_limit;

    if (userDoesNotHaveEnoughMoney) {
      throw new Error(`User has not enough credit to pay. Credit Limit: ${credit_limit} - Total Purchase: ${total_purchase}`);
    }
  }

  private validateCardExpiration(expire: string): void {
    const [month, year] = expire.split('/');

    const expire_date = new Date().setFullYear(Number.parseInt(year, 10), Number.parseInt(month, 10), 0);
    const current_date = new Date().setFullYear(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    const credit_card_is_expired = expire_date < current_date;

    if (credit_card_is_expired) {
      throw new Error('Credit card is expired');
    }
  }
}

export default ValidatePayment;
