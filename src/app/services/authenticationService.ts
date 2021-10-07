import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {

    baseURL: string = "https://localhost:44307/";

    constructor(private http: HttpClient) { }

    login(user: User) {
        return this.http.post<any>(this.baseURL + 'Auth/Login', user);
    }

    logOut() {
        localStorage.removeItem("userToken");
        localStorage.clear();
    }
}