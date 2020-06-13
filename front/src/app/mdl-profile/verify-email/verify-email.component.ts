import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../services/profile.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  token: string;
  constructor(private route: ActivatedRoute,
              private profileS: ProfileService,
              private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  verifyEmail() {
    this.profileS.VerifyEmail(this.token).subscribe(_ => this.router.navigate(['/profile']));
  }
}
