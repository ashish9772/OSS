import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: any = [{
    name: 'Mukesh',
    pass: 'Hello'
  }, {
    name: 'Asish',
    pass: 'Welcome'
  }];
  isloggedIn: boolean = false;
  constructor(private loginservice: LoginService) { }

  loginCredentials(username, password): Observable<any> {
    return this.loginservice.getLoginUser(username, password)
      .pipe(
        map(users => {
          // let user = users.filter(user => (user.name === username) && (user.pass === password));
          if (users && users.name == username && users.pass == password) {
            this.isloggedIn = true;
            localStorage.setItem('userDetails', users);
            return this.isloggedIn;
          } else {
            this.isloggedIn = false;
            return this.isloggedIn;
          }

        })
      );
  }
}
