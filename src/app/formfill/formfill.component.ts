import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-formfill',
  templateUrl: './formfill.component.html',
  styleUrls: ['./formfill.component.css']
})
export class FormfillComponent implements OnInit, CanComponentDeactivate {

  title = 'My first angular form';
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  changesSaved = false;
  data = [];
  countries: string[] = ['INDIA', 'USA', 'UK', 'Canada']; 

  Data: Array<any> = [
    { name: 'Pear', value: 'pear' },
    { name: 'Plum', value: 'plum' },
    { name: 'Kiwi', value: 'kiwi' },
    { name: 'Apple', value: 'apple' },
    { name: 'Lime', value: 'lime' }
  ];

  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private serverService: ServerService) { }

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('', [
          Validators.required,
          this.forbiddenNames.bind(this),
          Validators.minLength(3)
        ]),
        email: new FormControl(
          '',
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
        address: new FormControl('', [
          Validators.required,
        ]),
        image: new FormControl('', [
          Validators.required,
        ]),
      }), 
      gender: new FormControl('male'),
      country: new FormControl('', Validators.required),
      checkArray: new FormArray([], Validators.required),
      hobbies: new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    // this.signupForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );

  }

  onSubmit() {

    // const abc = this.signupForm.get('userData.username').value;
    // console.log(abc);

    // const abc = this.signupForm.get('image').value;
    // console.log(abc);

    // console.log(this.signupForm);
    // this.changesSaved = true;
    // alert('Form have been saved..!');
    // this.router.navigate(['/']);

    //this.signupForm.reset();

    let formObj = this.signupForm.getRawValue(); // {name: '', description: ''}

    // console.log(formObj);

    // let serializedForm = JSON.stringify(formObj);

    // console.log(serializedForm);
    
    // this.data = [{
    //   name: this.signupForm.get('userData.username').value,
    //   email: this.signupForm.get('userData.email').value,
    //   address: this.signupForm.get('userData.address').value,
    //   image: this.signupForm.get('userData.image').value,
    //   gender: this.signupForm.get('gender').value,
    //   country: this.signupForm.get('country').value,
    //   checkArray: this.signupForm.get('checkArray').value,
    //   hobbies: this.signupForm.get('hobbies').value, 
    //   }];

    // console.log(this.data);

    // this.http.post('https://angular-data-submit.firebaseio.com/data.json', serializedForm)
    // .subscribe(res => {
    //   console.log(res);
    //   alert('Form have been saved into firebase..!');
    // })

    this.serverService.storeData(formObj)
      .subscribe(res => {
        console.log(res);
        alert('Form have been saved into firebase..!');
      },error => console.log(error))
    this.changesSaved = true;
  }

  // onSelectedFile(event) {
  //   // console.log(event.target.files);
  //   if (event.target.files.length > 0) {

  //     const file = event.target.files[0]['name'];
  //     // alert(file);
  //     this.signupForm.get('userData.image').setValue(file);

  //     // const file = event.target.files[0];
  //     // this.signupForm.patchValue({
  //     //   image: file
  //     // });

  //   }
  // }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.signupForm.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
