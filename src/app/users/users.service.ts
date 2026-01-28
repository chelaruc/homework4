import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UsersService {
  api = 'https://api.github.com';
  constructor(private http: HttpClient) {}

  getUsers(since: number = 0 ) {
    return this.http.get<any[]>(`${this.api}/users`, {
      params: {
        since,
        per_page: 10
      }
    });
  }

  getUser(userName: string) {
    return this.http.get<any>(`${this.api}/users/${userName}`);
  }

  getUserRepos(userName: string) {
    return this.http.get<any[]>(`${this.api}/users/${userName}/repos`);
  }
}
