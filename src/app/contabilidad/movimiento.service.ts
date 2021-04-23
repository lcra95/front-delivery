import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'
@Injectable({
	providedIn: 'root'
})
export class MovimientoService {

	constructor(private http: HttpClient) { }

	setRegistro(params) {
		let url = Const.URL + '/movimiento';
		return this.http.post(url, params);
	}
}
