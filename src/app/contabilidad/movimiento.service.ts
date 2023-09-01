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
	getMovimientos(fecha_inicio) {
		let url = Const.URL + '/movimiento?fecha_ini='+fecha_inicio;
		return this.http.get(url);
	}
	getMesAnio() {
		let url = Const.URL + '/current-month-year';
		return this.http.get(url);
	}
	getLunes(anio, mes) {
		console.log("Here", anio, mes);
		
		let url = Const.URL + '/mondays/'+anio+'/'+mes;
		return this.http.get(url);
	}
}
