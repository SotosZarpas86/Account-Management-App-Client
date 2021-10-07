import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AccountService {

    baseURL: string = "https://localhost:44307/";

    token: string | null = localStorage.getItem("userToken");

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        })
    };

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    }

    getAll(): Observable<any> {
        let accountsUrl = this.baseURL + 'Account/GetAll';
        return this.http.get(accountsUrl, this.httpOptions);
    }

    getAllWithPaging(pageNumber: number, pageSize: number): Observable<any> {       
        let accountsUrl = this.baseURL + 'Account/GetAllWithPaging?pageNumber=' + pageNumber + '&pageSize=' + pageSize;
        return this.http.get(accountsUrl, this.httpOptions);
    }

    add(account: Account) {
        return this.http.post<any>(this.baseURL + 'Account', account, this.httpOptions);
    }

    edit(Id: number, account: Account) {
        return this.http.put<any>(this.baseURL + 'Account', account, this.httpOptions);
    }

    remove(Id: number) {
        return this.http.delete<any>(this.baseURL + 'Account/' + Id, this.httpOptions);
    }

    private getToken(): string {
        return 'Bearer ' + localStorage.getItem("userToken")
    }
}