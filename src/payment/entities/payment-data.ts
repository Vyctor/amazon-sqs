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

export default PaymentData;
