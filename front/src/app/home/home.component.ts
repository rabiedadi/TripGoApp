import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../mdl-shared/shared.service';
import {Observable} from 'rxjs';
import {AuthState} from '../store/reducers/auth.reducers';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.states';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  authState$: Observable<AuthState>;

  constructor(private sharedS: SharedService,
              private store: Store<AppState>) {
    this.authState$ = store.select(state => state.auth);
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    document.getElementsByClassName('content')[0].classList.add('content-bg');
  }
}

