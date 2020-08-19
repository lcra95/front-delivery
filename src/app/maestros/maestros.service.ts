import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'

@Injectable({
	providedIn: 'root'
})
export class MaestrosService {

	constructor(private http: HttpClient) { }
	getIvas() {
		let url = Const.URL + '/iva';
		return this.http.get(url);
	}
	setProducto(params) {
		let url = Const.URL + '/producto';
		return this.http.post(url, params);
	}
}
