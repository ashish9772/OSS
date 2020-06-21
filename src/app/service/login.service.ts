import { Observable } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { Injectable } from '@angular/core';
@Injectable()
export class LoginService {
    constructor(private apiService: ApiService) {

    }
    // tslint:disable-next-line:variable-name
    private _ein;
    // tslint:disable-next-line:variable-name
    private _groupName;
    public userProfileRole;
    set EIN(ein) {
        this._ein = window.localStorage.setItem('ein', ein);
    }
    get EIN(): string {
        return window.localStorage.getItem('ein');
    }
    set GroupName(groupName) {
        this._groupName = window.localStorage.setItem('groupName', groupName);
    }
    get GroupName() {
        return window.localStorage.getItem('groupName');
    }
    get UserProfile(): string {
        return window.localStorage.getItem('userProfile');
    }
    set UserProfile(userProfile) {
        this.userProfileRole = window.localStorage.setItem('userProfile', userProfile);
    }

    // getLoginUser(name, pass) {
    //     return this.apiService.get('/fetchCatelogueData/getNSDNames');
    //     this.apiService.get('user/:' + name + '/:' + pass)
    // }
    getLoginUser(name, pass): Observable<any> {
        return this.apiService.get('user/' + name + '/' + pass)
    }
}
