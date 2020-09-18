import { Component, OnInit } from '@angular/core';
import {Gallery, GalleryItem, ImageItem} from '@ngx-gallery/core';

@Component({
  selector: 'app-main-result',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  selectedTab = 1;
  images = [
    'assets/images/hotel/img%20(1).jpg',
    'assets/images/hotel/img%20(2).jpg',
    'assets/images/hotel/img%20(3).jpg',
    'assets/images/hotel/img%20(4).jpg',
    'assets/images/hotel/img%20(5).jpg',
    'assets/images/hotel/img%20(6).jpg',
    'assets/images/hotel/img%20(7).jpg',
    ];
  services = ['wifi', 'shuttle-van', 'smoking-ban', 'snowflake', 'bath', 'swimmer', 'hat-chef', 'window-frame-open',
    'parking', 'utensils-alt', 'croissant', 'tv-alt'];
  hotels: {name: string, stars: number, images: GalleryItem[], services: string[], note: number, notes: number[]}[] = [
    {name: 'Roayal', stars: 4, images: [], services: [], note: 8.0, notes: [8.1, 8.2, 8.0]},
    {name: 'Mariot', stars: 5, images: [], services: [], note: 9.2, notes: [9.3, 9.4, 9.0]},
    {name: 'Ibis', stars: 4, images: [], services: [], note: 8.8, notes: [9, 8.9, 8.7]},
    {name: 'Madina', stars: 3, images: [], services: [], note: 7.5, notes: [7.2, 7.4, 8]},
    {name: 'FourPoint', stars: 4, images: [], services: [], note: 9.0, notes: [8.9, 9.2, 9.1]}
  ];
  constructor(private gallery: Gallery) { }

  ngOnInit(): void {
    this.tabSelected(0);
    this.hotels.map(hotel => {
      hotel.services = this.shuffleArray(this.services);
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

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return [...array];
  }
}
