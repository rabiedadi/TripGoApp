export class Room {
  constructor(room?: any) {
    if (room) {
      this.id = room._id;
      Object.keys(room).forEach( key => {
        if (key in this.data) {
          this.data[key] = room[key];
        }
      });
    }
  }
  id = ''; // TODO : set _id inside data to modify the existing one if _id is defined
  data = {
    roomType: '',
    available: null,
    roomName: '',
    roomCustomName: null,
    smoking: false,
    area: null,
    roomCount: null,
    bathRoomCount: null,
    livingRoomCount: null,
    beds: [{bedSize: '', bedCount: 0}],
    roomCapacity: null,
    price: null,
  };

  is_ready(): boolean {
    return this.data.roomType !== ''
      && this.data.roomName !== ''
      && this.data.available !== null
      && this.data.area !== null
      && this.data.roomCapacity !== null
      && this.data.price !== null;
  }

}
