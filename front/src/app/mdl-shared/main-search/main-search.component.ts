import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {

  constructor(public sharedS: SharedService,
              private router: Router) {}
  xsScreen = false;

  ngOnInit(): void {
    this.xsScreen = window.matchMedia('only screen and (max-width: 760px)').matches;

    this.sharedS.minDate1 = new Date();
    this.sharedS.minDate1.setDate(this.sharedS.minDate1.getDate() + 1);
  }

  date1Selected(e) {
    this.sharedS.Date1 = new Date(e.value);
    this.sharedS.minDate2 = new Date(e.value);
    this.sharedS.minDate2.setDate(this.sharedS.minDate2.getDate() + 1);
  }
  date2Selected(e) {
    this.sharedS.Date2 = new Date(e.value);
  }

  dateClass = (d: Date) => {
    if (!this.sharedS.minDate2) { return undefined; }
    if (this.sharedS.Date2 && d.getDate() >= this.sharedS.minDate2.getDate()
      && d.getDate() < this.sharedS.Date2.getDate()
      && d.getMonth() === this.sharedS.minDate2.getMonth()) {
      return 'check-in-to-out-date';
    }
    if (d.getDate() ===  this.sharedS.minDate2.getDate() - 1 && d.getMonth() === this.sharedS.minDate2.getMonth()) {
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

  search() {
    if (this.sharedS.destination && this.sharedS.Date1 && this.sharedS.Date2 && this.sharedS.personalInfo) {
      this.router.navigate(['/result']);
    }
  }
}
