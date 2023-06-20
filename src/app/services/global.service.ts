import { Injectable } from '@angular/core';
import {HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  formOption (use_authorization = false, token = null) {
    console.log("usethis", token)
    const options = {
      headers: new HttpHeaders()
      .set('Authorization',  `${token}`)
      .set('Content-Type' , 'application/json')
    };
    return options;
  }
}
