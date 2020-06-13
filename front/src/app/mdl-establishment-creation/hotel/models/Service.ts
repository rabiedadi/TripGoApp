export class Service {
  data = {
    parking           : '',
    breakfast         : '',
    speakingLanguages : [],
    services          : []
  };

  is_ready() {
    return this.data.parking !== ''
    && this.data.breakfast !== ''
    && this.data.speakingLanguages.length > 0;
  }
}
