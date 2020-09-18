export class Policy {

  data = {
    policy    : {cancelingDays  : Number(), paymentTime : ''},
    checkIn   : {from : Number(), to : Number()},
    checkOut  : {from : Number(), to : Number()},
    animals   : true
  };

  is_ready() {
    return this.data.policy.cancelingDays
    && this.data.policy.paymentTime !== ''
    && this.data.checkIn.from
    && this.data.checkIn.to
    && this.data.checkOut.from
    && this.data.checkOut.to;
  }
}
