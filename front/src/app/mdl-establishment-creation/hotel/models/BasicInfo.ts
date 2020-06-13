export class BasicInfo {
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  data = {
    name : '',
    starsNumber : 0,
    address : '',
    city : '',
    province : '',
    email : '',
  };
  is_ready() {
    return this.data.name !== ''
    && this.data.starsNumber !== 0
    && this.data.address !== ''
    && this.data.city !== ''
    && this.data.province !== ''
    && this.regexp.test(this.data.email);
  }
}
