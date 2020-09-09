import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';

  guestsInfos: {
    fullName: string,
    email: string;
  }[] = [];
  roomsNb = 3;
  phone = '';
  constructor() {
    for (let i = 0; i < this.roomsNb; i++) {
      this.guestsInfos.push({fullName: '', email: ''});
    }
  }

  ngOnInit(): void {
  }

  inputFocusedBlurred(event: any, state: boolean) {
    state ?
        (event.target as HTMLElement).parentElement.classList.add('input-focused') :
        (event.target as HTMLElement).parentElement.classList.remove('input-focused')
    ;
  }

  passToStep3() {
    const step3Sections = document.getElementsByClassName('step3-section');
    const step2Sections = document.getElementsByClassName('step2-section');
    for (let i = 0; i < step2Sections.length; i++) {
      (step2Sections[i] as HTMLElement).style.opacity = '0';
      setTimeout(_ => {
        (step2Sections[i] as HTMLElement).style.display = 'none';
      }, 1500);
    }
    setTimeout(_ => {
      for (let i = 0; i < step3Sections.length; i++) {
        (step3Sections[i] as HTMLElement).style.display = 'flex';
        (step3Sections[i] as HTMLElement).style.opacity = '1';
      }
      (document.querySelector('.progress-step.active') as HTMLElement).classList.remove('active');
      (document.querySelector('.progress-step.inactive') as HTMLElement).classList.add('active');
      (document.querySelector('.progress-step.inactive') as HTMLElement).classList.remove('inactive');
    }, 1500);
  }
}
