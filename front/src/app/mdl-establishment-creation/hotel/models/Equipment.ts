export class Equipment {
  data = {
    extraBedCount   : 0,
    extraBed        : [{for: '', price: null}, {for: '', price: null}, {for: '', price: null}],
    otherEquipment  : []
  };

  is_ready() {
    return true;
  }
}
