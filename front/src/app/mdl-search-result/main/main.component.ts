import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthState} from '../../store/reducers/auth.reducers';
import {Gallery, GalleryItem, ImageItem} from '@ngx-gallery/core';

@Component({
  selector: 'app-main-result',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  selectedTab = 1;
  items: GalleryItem[] = [];
  data = [
    {
      srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    },
    {
      srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
      previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    },
    {
      srcUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      previewUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
    },
    {
      srcUrl: 'https://iphonesoft.fr/images/_082019/fond-ecran-dynamique-macos-wallpaper-club.jpg',
      previewUrl: 'https://iphonesoft.fr/images/_082019/fond-ecran-dynamique-macos-wallpaper-club.jpg'
    }
  ];
  constructor(private gallery: Gallery) { }

  ngOnInit(): void {
    this.tabSelected(0);
    this.items = this.data.map(item =>
      new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );
    this.gallery.ref().load(this.items);
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
}
