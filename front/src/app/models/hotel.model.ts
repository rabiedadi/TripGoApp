export interface Hotel {
  basicInformation: {
    name: string
    starsNumber: 4
    address: string;
    city: string
    province: string
    phone: string
    email: string
  };
  extraBed: [{
    for: string,
    price: number
  }];
  policy: {
    cancelingDays: number
    paymentTime: string
  };
  checkIn: {
    from: 12,
    to: 15
  };
  checkOut: {
    from: 10,
    to: 12
  };
  rooms: [];
  services: [string];
  speakingLanguages: [string];
  otherEquipment: [string];
  images: [string];
  creditCards: [string];
  breakfast: string;
  parking: string;
  extraBedCount: number;
  animals: boolean;
  invoiceName: string;
}
