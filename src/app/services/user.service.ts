import { Injectable } from '@angular/core';

// models
import { User } from '../models/user.models'

// import config
import { SERVER_URL } from '../config/config'

// import http

import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Injectable()
export class UserService {
  baseUrl: string;
  user: User;
  constructor(private http: Http) {

  }


  public login (session: any){
    return this.http.post(SERVER_URL+'/sessions', session).map(res => res.json());
  }

}
