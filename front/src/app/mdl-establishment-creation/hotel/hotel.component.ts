import {HttpEventType} from '@angular/common/http';
import {takeUntil, tap} from 'rxjs/operators';
import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HotelLoaderService} from './services/hotel-loader.service';
import {SharedService} from '../../mdl-shared/shared.service';
import {TranslateService} from '@ngx-translate/core';
import {BasicInfo} from './models/BasicInfo';
import {Equipment} from './models/Equipment';
import {Service} from './models/Service';
import {Payment} from './models/Payment';
import {Policy} from './models/Policy';
import {Room} from './models/Room';
import * as JSZip from 'jszip';
import {Observable, Subject} from 'rxjs';
import {MapsAPILoader} from '@agm/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../../store/reducers/auth.reducers';
import {AppState} from '../../store/app.states';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hotel-creation',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit, OnDestroy {

  // Constructor ========================================================================================================================= >
  constructor(
    private sharedS: SharedService,
    private loaderS: HotelLoaderService,
    private translate: TranslateService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<AppState>,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {
    translate.setDefaultLang(sharedS.currentLang);
    this.authState$ = store.select(state => state.auth);
  }

  // Variables ================================================================================================================== >
  @ViewChild('adresse') public searchElement: ElementRef;
  private destroyed$ = new Subject<boolean>();
  private authState$: Observable<AuthState>;
  authState: AuthState;
  states = this.sharedS.states;
  checkHours = [{text: '06:00', value: 6}, {text: '07:00', value: 7}, {text: '08:00', value: 8}, {text: '09:00', value: 9},
    {text: '10:00', value: 10}, {text: '11:00', value: 11}, {text: '12:00', value: 12}, {text: '13:00', value: 13},
    {text: '14:00', value: 14}, {text: '15:00', value: 15}, {text: '16:00', value: 16}, {text: '17:00', value: 17},
    {text: '18:00', value: 18}, {text: '19:00', value: 19}, {text: '20:00', value: 20}, {text: '21:00', value: 21},
    {text: '22:00', value: 22}, {text: '23:00', value: 23}, {text: '00:00', value: 24}
  ];
  otherEquipment: any[];
  extraBedFor: any[] = ['', '', ''];
  bedSize: any[];
  paymentTime: any[];
  parkingOption: any[];
  roomCustomName: any[];
  roomName: any[];
  roomType: any[];
  service: any[];
  speakingLanguage: any[];
  creditCard: any[];
  breakfastOption: any[];
  savingInfo = false;

  arrowDown: HTMLElement;
  inputWrapper: HTMLElement;

  activeTab = 1;
  tabProgress = 1;

  // TAB1 basic_info management ========================================================================================================== >
  basicInfo = new BasicInfo();
  numberConfId = null;
  phoneNumber = '';

  // TAB2 rooms & beds management ======================================================================================================== >
  rooms = [new Room()];
  roomIndex = 0;

  // TAB3 installation & services management ============================================================================================= >
  instServices = new Service();

  // TAB4 equipment management =========================================================================================================== >
  selectedExtraBed = 0;
  equipment = new Equipment();
  freeBedForKids = false;

  // TAB5 photos management ============================================================================================================== >
  zipFile: JSZip = new JSZip();
  images = [];
  editedImages = [];

  // TAB6 policies management ============================================================================================================ >
  policy = new Policy();

  // TAB7 payment managment ============================================================================================================== >
  payment = new Payment();

  // On_init ============================================================================================================================= >
  ngOnInit(): void {
    this.loadOptions();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {types: ['address']});
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
      console.log(this.route.snapshot.paramMap.get('id'));
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  // initiation ========================================================================================================================== >
  loadOptions() {
    // User infos
    this.authState$.pipe(takeUntil(this.destroyed$)).subscribe(state => this.authState = state);
    // Hotel options
    this.loaderS.load_bedSize().pipe(takeUntil(this.destroyed$)).subscribe(res => this.bedSize = res);
    this.loaderS.load_breakfastOption().pipe(takeUntil(this.destroyed$)).subscribe(res => this.breakfastOption = res);
    this.loaderS.load_extraBedFor().pipe(takeUntil(this.destroyed$)).subscribe(res => this.extraBedFor = res);
    this.loaderS.load_otherEquipment().pipe(takeUntil(this.destroyed$)).subscribe(res => this.otherEquipment = res);
    this.loaderS.load_parkingOption().pipe(takeUntil(this.destroyed$)).subscribe(res => this.parkingOption = res);
    this.loaderS.load_paymentTime().pipe(takeUntil(this.destroyed$)).subscribe(res => this.paymentTime = res);
    this.loaderS.load_roomCustomName().pipe(takeUntil(this.destroyed$)).subscribe(res => this.roomCustomName = res);
    this.loaderS.load_roomName().pipe(takeUntil(this.destroyed$)).subscribe(res => this.roomName = res);
    this.loaderS.load_roomType().pipe(takeUntil(this.destroyed$)).subscribe(res => this.roomType = res);
    this.loaderS.load_service().pipe(takeUntil(this.destroyed$)).subscribe(res => this.service = res);
    this.loaderS.load_speakingLanguage().pipe(takeUntil(this.destroyed$)).subscribe(res => this.speakingLanguage = res);
    this.loaderS.load_creditCard().pipe(takeUntil(this.destroyed$)).subscribe(res => this.creditCard = res);
  }

  // TABS management ===================================================================================================================== >
  tab_navigator(index) {
    if (index <= (this.tabProgress)) {
      const direction = this.activeTab < index;
      const currTabMenu = document.getElementById('tab-menu-' + this.activeTab);
      const nextTabMenu = document.getElementById('tab-menu-' + index);

      if (direction) {
        currTabMenu.children[0].classList.remove('left-0'); currTabMenu.children[0].classList.add('right-0');
        nextTabMenu.children[0].classList.remove('right-0'); nextTabMenu.children[0].classList.add('left-0');
      } else {
        currTabMenu.children[0].classList.add('left-0'); currTabMenu.children[0].classList.remove('right-0');
        nextTabMenu.children[0].classList.add('right-0'); nextTabMenu.children[0].classList.remove('left-0');
      }
      currTabMenu.classList.remove('active');
      nextTabMenu.classList.add('active');
      // (currTabMenu.children[0] as HTMLElement).style.width = '0';
      // (nextTabMenu.children[0] as HTMLElement).style.width = '100%';
      document.getElementById('tab' + this.activeTab).classList.add('hidden');
      document.getElementById('tab' + index).classList.remove('hidden');
      document.documentElement.scrollTop = 0;
      this.activeTab = index;
    }
  }
  // Elements management ================================================================================================================= >
  input_focused(inputElement) { // Hilighting focused input
    if (this.inputWrapper) {
      this.inputWrapper.classList.remove('input-focused');
    }
    for (let index = 0; index < 4; index++) {
      this.inputWrapper = inputElement.parentElement;
      if (this.inputWrapper.classList.contains('input-wrapper')) {
        this.inputWrapper.classList.add('input-focused');
        break;
      }
    }
  }
  mat_toggled(event) {
    for (let index = 0; index < 4; index++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.inputWrapper.children.length; j++) {
        if (this.inputWrapper.children[j].classList.contains('arrow-down')) {
          this.arrowDown = (this.inputWrapper.children[j] as HTMLElement);
          break;
        }
      }
      if (this.arrowDown) {
        event ? this.arrowDown.classList.add('arrow-rotated') : this.arrowDown.classList.remove('arrow-rotated');
      }
    }
  }
  arrow_down_clicked() {
    (document.getElementsByClassName('cdk-overlay-backdrop')[0] as HTMLElement).click();
  }

  // TAB1 basic_info management ========================================================================================================== >

  // TODO
  phone_number_watcher(target) {
    target.value = target.value.substr(0, 12);
    this.phoneNumber = target.value.substr(0, 12);
  }
  send_confirmation_code() {
    const CCI = document.getElementById('confirmation_code_input') as HTMLInputElement;
    let countDown = 30;
    const phone = this.phoneNumber.split('-').join('');
    if (phone.length === 9) {
      this.loaderS.load_number_conf_id(phone).subscribe(data => {
        this.numberConfId = data._id;
        const interval = setInterval(() => {
          CCI.placeholder = String(countDown) + ' s';
          countDown--;
          if (countDown === -1) {
            window.clearInterval(interval);
            CCI.placeholder = '';
          }
        }, 1000);
      }, err => console.log(err.error)); // TODO
    }
  }
  entering_conf_number(e) {
    const v = e.value;
    if ((!Number(v)) || (v.length > 6)) {
      e.value = v.slice(0, v.length - 1);
    }
    if (e.value.length === 6) {
      this.loaderS.check_number_conf_id(this.numberConfId, v)
        .subscribe(data => this.loaderS.hotelId = data.hotel_id, err => console.log(err.error)); // TODO show conf success, error
    }
  }

  // TAB2 rooms & beds management ======================================================================================================== >
  add_room() {
    this.rooms.unshift(new Room());
    this.roomIndex = 0;
    this.tab_navigator(2);
  }
  edit_room(index) {
    this.roomIndex = index;
    this.tab_navigator(2);
  }
  delete_room(index) {
    console.log(index);
    if (this.rooms.length > 1) {
      this.rooms.splice(index, 1);
    }
  }
  add_bed() {
    this.rooms[this.roomIndex].data.beds.push({bedSize: '', bedCount: 0});
  }
  // del_bed(i) {
  //   if (this.rooms[this.roomIndex].data.beds.length > 1) {
  //     this.rooms[this.roomIndex].data.beds.splice(i, 1);
  //   }
  // }

  // TAB3 installation & services management ============================================================================================= >
  service_selected(stat, Id) {
    const serviceIndex = this.instServices.data.services.indexOf(Id);
    if (stat) {
      if (serviceIndex === -1) {
        this.instServices.data.services.push(Id);
      }
    } else {
      if (serviceIndex !== -1) {
        this.instServices.data.services.splice(serviceIndex, 1);
      }
    }
  }
  del_lang(i) {
    this.instServices.data.speakingLanguages.splice(i, 1);
  }
  lang_selected(value) {
    if (this.instServices.data.speakingLanguages.indexOf(value) === -1) {
      this.instServices.data.speakingLanguages.push(value);
    }
  }
  get_lang_name_by_ref(lang) {
    for (const l of this.speakingLanguage) {
      if (l.reference === lang) {
        return l.name;
      }
    }
  }

  // TAB4 equipment management =========================================================================================================== >
  extra_bed_selected(index: number, ref: string, stat: boolean) {
    if (stat) {
      this.equipment.data.extraBed[index].for = ref;
      this.selectedExtraBed++;
    } else {
      this.equipment.data.extraBed[index].for = '';
      this.selectedExtraBed--;
    }
  }
  otherEquipment_selected(stat, Id) {
    const equipmentIndex = this.equipment.data.otherEquipment.indexOf(Id);
    if (stat) {
      if (equipmentIndex === -1) {
        this.equipment.data.otherEquipment.push(Id);
      }
    } else {
      if (equipmentIndex !== -1) {
        this.equipment.data.otherEquipment.splice(equipmentIndex, 1);
      }
    }
  }

  // TAB5 photos management ============================================================================================================== >
  onFileDropped($event) {
    /** on file drop handler */
    this.prepareFilesList($event);
  }
  fileBrowseHandler(files) {
    /** handle file from browsing */
    this.prepareFilesList(files);
  }
  prepareFilesList(files: Array<any>) { /** @param files (Files List) */
    for (const file of files) {
      const object = {
        imageSRC: undefined
      };
      const reader = new FileReader();
      reader.onload = () => {
        object.imageSRC = reader.result;
      };
      reader.readAsDataURL(file);
      this.images.push(file);
      this.editedImages.push(object);
    }
  }
  deleteFile(index: number) {
    /** @param index (File index) */
    this.editedImages.splice(index, 1);
    this.images.splice(index, 1);
  }
  getImagesData = async () => {
    const imagesFormData = new FormData();
    this.images.forEach(image => {
      this.zipFile.file(image.name, image, {base64: true});
    });
    await this.zipFile.generateAsync({type: 'blob'}).then(zip => {
      imagesFormData.append('images', zip, 'images.zip');
    });
    return imagesFormData;
  }

  // TAB6 policies management ============================================================================================================ >
  getSelectedPaymentTimeValue(): string {
    try {
      return this.paymentTime.find(item => item.reference === this.policy.data.policy.paymentTime).name;
    } catch (e) {
      return '';
    }
  }
  select_check(inout: string, fromto: string, index: number, value) {
    if (value !== 'null') {
      for (let i = 1; i <= 3; i++) {
        const element = document.getElementById(inout + fromto + i) as HTMLInputElement;
        if (index === 1 && i === 1) {
          element.value = value;
          element.innerText = value + ':00';
        }
        if (i === index) {
          element.classList.add('selected-check-hours');
          this.policy.data[inout][fromto] = Number(value);
        } else {
          element.classList.remove('selected-check-hours');
        }
      }
      if (fromto === 'from') {
        for (let i = 1; i <= 3; i++) {
          const element = document.getElementById(inout + 'to' + i) as HTMLInputElement;
          element.removeAttribute('disabled');
          element.classList.remove('selected-check-hours');
          const selectedHour = inout === 'checkIn' ? this.policy.data.checkIn[fromto] : this.policy.data.checkOut[fromto];
          if (((selectedHour + i - 1) % 24) < 6) {
            element.value = null;
            element.innerText = '--:--';
            element.disabled = true;
          } else {
            element.value = String(selectedHour + i);
            element.innerText = String(selectedHour + i) + ':00';
          }
        }
      }
    }
  }

  // TAB7 payment managment ============================================================================================================== >
  creditCard_selected(stat, Id) {
    const CCardIndex = this.payment.data.creditCards.indexOf(Id);
    if (stat) {
      if (CCardIndex === -1) {
        this.payment.data.creditCards.push(Id);
      }
    } else {
      if (CCardIndex !== -1) {
        this.payment.data.creditCards.splice(CCardIndex, 1);
      }
    }
  }


  // Send DATA =========================================================================================================================== >
  send_Data(index: number) {
    this.savingInfo = true;
    switch (index) {
      case 1: {
        if (this.basicInfo.is_ready()) {
          this.loaderS.send_info_basic(this.basicInfo.data).subscribe(data => {
            this.tabProgress++;
            this.tab_navigator(index + 1);
          }, err => {
            console.log(err.error);
          });
        } else {
          this.toast.warning('Vous avez manqué certains champs à remplir.', '', { positionClass: 'toast-top-center', timeOut: 2000 });
        }
        this.savingInfo = false;
        break;
      }
      case 2:
        this.savingInfo = false;
        // if (this.rooms[this.roomIndex].is_ready()) {
        this.tabProgress++;
        this.tab_navigator(index + 1);
        // } else {
        //   this.toast.warning('Vous avez manqué certains champs à remplir.', '', { positionClass: 'toast-top-center', timeOut: 2000 });
        // }
        break;
      case 3: {
        if (this.rooms.length > 0) {
          const rooms = Array();
          let ready = true;
          this.rooms.forEach(room => {
            rooms.push(room.data);
            ready = ready && room.is_ready();
          });
          if (ready) {
            this.loaderS.send_room(rooms).subscribe(() => {
              this.savingInfo = false;
              this.tabProgress++;
              this.tab_navigator(index + 1);
            }, err => {
              console.log(err);
            });
          } else {
            this.toast.warning('Vous avez manqué certains champs à remplir.', '', { positionClass: 'toast-top-center', timeOut: 2000 });
          }
        } else {
          this.toast.warning('Ajoutez au moins un hôtel ...', '', { positionClass: 'toast-top-center', timeOut: 2000 });
        }
        this.savingInfo = false;
        break;
      }
      case 4: {
        if (this.instServices.is_ready()) {
          this.loaderS.send_instSer(this.instServices.data).subscribe(() => {
            this.savingInfo = false;
            this.tabProgress++;
            this.tab_navigator(index + 1);
          }, err => {
            console.log(err.error);
            this.savingInfo = false;
          });
        } else {
          this.savingInfo = false;
          this.toast.warning('Vous avez manqué certains champs à remplir.', '', { positionClass: 'toast-top-center', timeOut: 2000 });
        }
        break;
      }
      case 5: {
        if (this.equipment.is_ready()) {
          this.loaderS.send_equipment(this.equipment.data).subscribe(() => {
            this.savingInfo = false;
            this.tabProgress++;
            this.tab_navigator(index + 1);
          }, err => {
            console.log(err.error);
            this.savingInfo = false;
          });
        } else {
          this.savingInfo = false;
          this.toast.warning('Vous avez manqué certains champs à remplir.', '', { positionClass: 'toast-top-center', timeOut: 2000 });
        }
        break;
      }
      case 6: {
        if (this.images.length === 0) { alert('Ajoutez au moins une photos'); this.savingInfo = false; return; }
        this.getImagesData().then((fd) => {
          const progress = document.getElementsByClassName('images-progress')[0] as HTMLElement;
          this.loaderS.send_images(fd)
            .pipe(
              tap(event => {
                switch (event.type) {
                  case HttpEventType.UploadProgress:
                    progress.style.width = Math.round(event.loaded / event.total * 100) + '%';
                    break;
                  case HttpEventType.Response:
                    this.savingInfo = false;
                    console.log('Images successfully uploaded');
                    progress.style.width = '100%';
                    this.tabProgress++;
                    this.tab_navigator(index + 1);
                    break;
                }
              }))
            .subscribe(() => {}, err => { console.log(err); });
        });
        break;
      }
      case 7: {
        if (this.policy.is_ready()) {
          this.loaderS.send_policy(this.policy.data).subscribe(() => {
            this.savingInfo = false;
            this.tabProgress++;
            this.tab_navigator(index + 1);
          }, err => {
            console.log(err.error);
            this.savingInfo = false;
          });
        } else {
          this.savingInfo = false;
          this.toast.warning('Vous avez manqué certains champs à remplir.', '', { positionClass: 'toast-top-center', timeOut: 2000 });
        }
        break;
      }
      case 8: {
        if (this.payment.is_ready()) {
          this.loaderS.send_payment(this.payment.data).subscribe(data => {
            this.savingInfo = false;
            console.log(data);
            this.toast.success('Le processus d\'enregistrement de l\'hôtel s\'est terminé avec succès', '', { positionClass: 'toast-top-center', timeOut: 5000 });
          }, err => {
            console.log(err.error);
            this.savingInfo = false;
          });
        } else {
          this.savingInfo = false;
          this.toast.warning('Vous avez manqué certains champs à remplir.', '', { positionClass: 'toast-top-center', timeOut: 2000 });
        }
        break;
      }
    }
  }
}

