import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() {}
  currentLang = 'fr';
  states = ['01 Adrar', '02 Chlef', '03 Laghouat', '04 Oum-ElBouaghi', '05 Batna', '06 Béjaïa', '07 Biskra', '08 Béchar', '09 Blida', '10 Bouira', '11 Tamanrasset', '12 Tébessa', '13 Tlemcen', '14 Tiaret', '15 Tizi-Ouzou', '16 Alger', '17 Djelfa', '18 Jijel', '19 Sétif', '20 Saida', '21 Skikda', '22 Sidi-BelAbbès', '23 Annaba', '24 Guelma', '25 Constantine', '26 Médéa', '27 Mostaganem', '28 M\'Sila', '29 Mascara', '30 Ouargla', '31 Oran', '32 El-Bayadh', '33 illizi', '34 Bordj-BouArreridj', '35 Boumerdès', '36 El-Taref', '37 Tindouf', '38 Tissemsilt', '39 El-Oued', '40 Khenchela', '41 Souk-Ahras', '42 Tipaza', '43 Mila', '44 Aïn-Defla', '45 Naâma', '46 AïnTémouchent', '47 Ghardaia', '48 Relizane'];
  destination: string;
  currentDate = new Date();
  minDate1: Date;
  minDate2: Date;
  Date1: Date;
  Date2: Date;
  personalInfo: {adults: number, children: number, rooms: number} = {adults: 2, children: 0, rooms: 1};
}
