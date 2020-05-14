import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { map, catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  storeData(data: any[]) {
    return this.http.post('https://angular-data-submit.firebaseio.com/data.json', data);
  }

  getData() {
    // console.log(localStorage.getItem('access_token'));
    // return this.http.get<{ access_token: string }>(
    //   'https://angular-data-submit.firebaseio.com/data.json'
    // );
    return this.http.get(
      'https://angular-data-submit.firebaseio.com/data.json'
    );
      // .pipe(map(
      //   (response: Response) => {
      //     const data = response.json();
      //     return data;
      //   }
      // ))
      // .pipe(catchError(
      //   (error: Response) => {
      //     return Observable.throw('Something went wrong');
      //   }
      // ));
  }
}
