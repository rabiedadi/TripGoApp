export class Payment {
  data = {
    creditCards : [],
    invoiceName : ''
  };

  is_ready() {
    return this.data.invoiceName !== '';
  }
}
