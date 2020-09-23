import { Component, OnInit } from '@angular/core';
import {Gallery, GalleryItem, ImageItem} from '@ngx-gallery/core';
import {SharedService} from "../../mdl-shared/shared.service";

@Component({
  selector: 'app-main-result',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  selectedTab = 1;
  images = [
    'https://www.leonidastravel.com/wordpress/wp-content/uploads/2019/11/225068768-570x320.jpg',
    'https://www.dolphorceglobal.ng/wp-content/uploads/2018/06/Hotel-Bookings.jpg',
    'https://www.myboutiquehotel.com/photos/9327/room-181984473-1024x683.jpg',
    'https://i.pinimg.com/originals/e8/f1/6c/e8f16c883bc93ecb211b6c8539f746f8.jpg',
    'https://im.proptiger.com/1/2028673/80/project-in-sector-22-rohini-others-101057400.png',
    'https://www.marketingtochina.com/wp-content/uploads/2016/05/hotel.jpg',
    'https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/hotels/1000000/530000/520600/520564/625420d8_z.jpg',
    ];
  services = ['wifi', 'shuttle-van', 'smoking-ban', 'snowflake', 'bath', 'swimmer', 'hat-chef', 'window-frame-open',
    'parking', 'utensils-alt', 'croissant', 'tv-alt'];
    hotels: {
      name: string, stars: number, images: GalleryItem[], services: string[],
      note: number, notes: number[], prix: number, address: string
    }[] = [
        {name: 'Royal', stars: 4, images: [], services: [], note: 8.1, notes: [8.1, 8.2, 8.0], prix: 15500, address: 'Oran'},
        {name: 'Mariot', stars: 5, images: [], services: [], note: 9.2, notes: [9.3, 9.4, 9.0], prix: 18900, address: 'Oran'},
        {name: 'Ibis', stars: 4, images: [], services: [], note: 8.8, notes: [9, 8.9, 8.7], prix: 14000, address: 'Oran'},
        {name: 'Madina', stars: 3, images: [], services: [], note: 7.5, notes: [7.2, 7.4, 8], prix: 11800, address: 'Oran'},
        {name: 'FourPoint', stars: 4, images: [], services: [], note: 9.1, notes: [8.9, 9.2, 9.1], prix: 15000, address: 'Oran'}
    ];
  hotels2 = [...this.hotels];
  constructor(private gallery: Gallery,
              public sharedS: SharedService) { }

  ngOnInit(): void {
    this.tabSelected(0);
    this.hotels.map(hotel => {
      hotel.services = this.shuffleArray(this.services, 6);
      hotel.images = this.shuffleArray(this.images).map(image => new ImageItem({ src: image, thumb: image }));
      this.gallery.ref().load(hotel.images);
    });
  }

  tabSelected(index: number) {
    if (index === this.selectedTab) { return; }
    const direction = index > this.selectedTab; // LTR or RTL
    const prevTab = document.getElementById(`tab-${this.selectedTab}`);
    const nextTab = document.getElementById(`tab-${index}`);
    const prevTabLabel = document.getElementsByClassName('tab-label')[this.selectedTab];
    const nextTabLabel = document.getElementsByClassName('tab-label')[index];
    const prevTabIndicator = document.getElementsByClassName('tab-label-indicator')[this.selectedTab];
    const nextTabIndicator = document.getElementsByClassName('tab-label-indicator')[index];
    if (direction) {
      prevTabIndicator.classList.remove('left-0'); prevTabIndicator.classList.add('right-0');
      nextTabIndicator.classList.remove('right-0'); nextTabIndicator.classList.add('left-0');
    } else {
      prevTabIndicator.classList.remove('right-0'); prevTabIndicator.classList.add('left-0');
      nextTabIndicator.classList.remove('left-0'); nextTabIndicator.classList.add('right-0');
    }
    prevTabLabel.parentElement.classList.remove('active'); nextTabLabel.parentElement.classList.add('active');
    prevTab.classList.add('hidden');
    nextTab.classList.remove('hidden');
    this.selectedTab = index;
  }

  shuffleArray(array: string[], max?: number): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    if (max) {
      return [...array].slice(0, max);
    }
    return [...array];
  }

  compareNote(a: any, b: any): number {
    if (a.note > b.note) { return -1; }
    if (a.note < b.note) { return 1; }
    return 0;
  }
  comparePrice(a: any, b: any): number {
    if (a.prix > b.prix) { return 1; }
    if (a.prix < b.prix) { return -1; }
    return 0;
  }

  sortHotels(key: string, event: MouseEvent) {
    [].slice.call(document.getElementsByClassName('label-wrapper')).forEach(e => {
      (e as HTMLElement).classList.remove('active');
    });
    switch (key) {
      case 'note':
        this.hotels.sort(this.compareNote);
        (event.target as HTMLElement).classList.add('active');
        return;
      case 'prix':
        this.hotels.sort(this.comparePrice);
        (event.target as HTMLElement).classList.add('active');
        return;
    }
  }

  searchHotels(value: string) {
    this.hotels = this.hotels2.filter(hotel => {
      return hotel.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  filterStars(value: any) {
    if (value) {
      this.hotels = this.hotels2.filter(hotel => {
        return hotel.stars === value;
      });
    } else {
      this.hotels = this.hotels2;
    }
  }

  filterDestination(value: string) {
    if (value) {
      this.hotels = this.hotels2.filter(hotel => {
        return hotel.address.indexOf(value.substr(3)) !== -1;
      });
    } else {
      this.hotels = this.hotels2;
    }
  }
}
