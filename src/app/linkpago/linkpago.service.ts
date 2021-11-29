import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'
@Injectable({
  providedIn: 'root'
})
export class LinkpagoService {

  constructor(private http: HttpClient) { }
  generar(params){

    let url = Const.URL + '/pagop'
    return this.http.post(url, params);
  }
}
