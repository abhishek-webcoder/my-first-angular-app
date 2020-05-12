import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msg = 'Please login to fill up the form..!';
  constructor(private router: Router, private authService: AuthService, private serverService: ServerService) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.router.navigate(['form']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getDataButton () {
    this.serverService.getData()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

}
