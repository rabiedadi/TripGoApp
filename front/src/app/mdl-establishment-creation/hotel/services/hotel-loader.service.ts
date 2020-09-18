import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SharedService} from '../../../mdl-shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class HotelLoaderService {

  /** var declaration */
  lang = (this.sharedS.currentLang).toUpperCase();
  hotelOptionsUrl = 'http://51.91.79.72:3001/hotel/options/';
  hotelUrl = 'http://51.91.79.72:3003/hotel';
  hotelId: string;
  hotelProfile = 'http://51.91.79.72:3001/hotel/profil';
  /** options loading */
  load_bedSize() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/bedSize');
  }
  load_breakfastOption() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/breakfastOption');
  }
  load_extraBedFor() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/extraBedFor');
  }
  load_otherEquipment() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/otherEquipment');
  }
  load_parkingOption() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/parkingOption');
  }
  load_paymentTime() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/paymentTime');
  }
  load_roomName() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/roomName');
  }
  load_roomCustomName() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/roomCustomName');
  }
  load_roomType() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/roomType');
  }
  load_service() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/service');
  }
  load_speakingLanguage() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + this.lang + '/speakingLanguage');
  }
  load_creditCard() {
    return this.http.get<{}[]>(this.hotelOptionsUrl + 'creditCard');
  }

  /** load hotel profile */
  load_hotel_profile(id) {
    return this.http.get(this.hotelProfile + `/${id}`);
  }

  /** phone number confirmation then hotel creation */
  load_number_conf_id(phoneNumber: string) {
    return this.http.post<any>('http://51.91.79.72:3003/utility/sendSMS', {phone: phoneNumber});
  }
  check_number_conf_id(confId: string, code) {
    return this.http.get<any>(`http://51.91.79.72:3003/utility/checkConfirmationCode/${confId}?token=${code}`);
  }

  /** data sending */
  send_info_basic(data) {
    return this.http.post<any>(`${this.hotelUrl}/${this.hotelId}`, data);
  }
  send_room(data) {
    return this.http.post<any>(`${this.hotelUrl}/room/${this.hotelId}`, data);
  }
  send_instSer(data) {
    return this.http.put<any>(`${this.hotelUrl}/instSer/${this.hotelId}`, data);
  }
  send_equipment(data) {
    return this.http.put<any>(`${this.hotelUrl}/Equipment/${this.hotelId}`, data);
  }
  send_images(formData) {
    return this.http.put(`${this.hotelUrl}/images/${this.hotelId}`, formData, {reportProgress: true, observe: 'events' });
  }
  send_policy(data) {
    return this.http.put<any>(`${this.hotelUrl}/policy/${this.hotelId}`, data);
  }
  send_payment(data) {
    return this.http.put<any>(`${this.hotelUrl}/payment/${this.hotelId}`, data);
  }

  constructor(
    private http: HttpClient,
    private sharedS: SharedService,
  ) {}
}
