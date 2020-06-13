export class Payment {
  cardCharge = false;
  data = {
    creditCards : [],
    invoiceName : ''
  };

  is_ready() {
    return this.data.invoiceName !== '';
  }
}
