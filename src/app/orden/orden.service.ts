import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'
@Injectable({
	providedIn: 'root'
})
export class OrdenService {

	constructor(private http: HttpClient) { }
	getOrdens(param) {
		let url = Const.URL + '/ordenfull';
		return this.http.get(url, { params: param });
	}
	EditOrden(param) {
		let url = Const.URL + '/orden';
		return this.http.put(url, param );
	}
}
