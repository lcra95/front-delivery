import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'
@Injectable({
  providedIn: 'root'
})
export class TasacambioService {

  constructor(private http: HttpClient) { }
  calulo(params) {
		let url = Const.URL + '/calculoenvio';
		return this.http.get(url, { params: params});
	}
  tasa(params = null) {
    var p = ''
    if (params !=null){
      p = "?tasa="+params
    }
		let url = Const.URL + '/tasa' + p;
		return this.http.get(url);
	}
}
