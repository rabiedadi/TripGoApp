import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {

  constructor(private sharedS: SharedService) {}
  lgScreen = false;
  states = this.sharedS.states;
  minDate1: Date;
  minDate2: Date;
  Date1: Date;
  Date2: Date;
  personalInfo: {adults: number, children: number, rooms: number} = {adults: 2, children: 0, rooms: 1};

  ngOnInit(): void {
    if (window.screen.width < 768) { // phones and small tabs
      this.lgScreen = true;
    }
    this.minDate1 = new Date();
    this.minDate1.setDate(this.minDate1.getDate() + 1);
  }

  date1Selected(e) {
    this.Date1 = new Date(e.value);
    this.minDate2 = new Date(e.value);
    this.minDate2.setDate(this.minDate2.getDate() + 1);
  }
  date2Selected(e) {
    this.Date2 = new Date(e.value);
  }

  dateClass = (d: Date) => {
    if (!this.minDate2) { return undefined; }
    if (this.Date2 && d.getDate() >= this.minDate2.getDate()
      && d.getDate() < this.Date2.getDate()
      && d.getMonth() === this.minDate2.getMonth()) {
      return 'check-in-to-out-date';
    }
    if (d.getDate() ===  this.minDate2.getDate() - 1 && d.getMonth() === this.minDate2.getMonth()) {
      return 'check-in-out-date';
    }
    return undefined;
  }

  showPersInfoPanel() {
    const persInfoPanel = document.getElementsByClassName('menu-panel')[0];
    const persInfoOverlay = document.getElementsByClassName('menu-panel-overlay')[0];
    document.getElementsByTagName('body')[0].appendChild(persInfoOverlay);
    persInfoPanel.classList.toggle('hidden');
  }
}
