export class Equipment {
  constructor() {}
  data = {
    extraBedCount   : 0,
    extraBed        : [],
    otherEquipment  : []
  };

  setExtraBed(options) {
    for (const option of options) {
      this.data.extraBed.push({for: option.reference, price: null});
    }
  }

  setData(data) {
    this.data.extraBedCount = data.extraBedCount;
    this.data.otherEquipment = data.otherEquipment;
    data.extraBed.forEach(bed1 => {
      this.data.extraBed.find(bed2 => bed2.for === bed1.for ).price = bed1.price;
    });
  }

  is_ready() {
    let ready = true;
    this.data.extraBed.forEach(bed => {
      if (bed.for && (bed.price === 0)) {
        ready = false;
      }
    });
    return ready;
  }
}
