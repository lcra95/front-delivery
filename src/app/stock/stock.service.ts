import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'

@Injectable({
	providedIn: 'root'
})
export class StockService {

	constructor(private http: HttpClient) { }
	getSucursales() {
		let url = Const.URL + '/sucursal';
		return this.http.get(url);
	}
	getStock(params) {
		var filtro = '?'
		if(params.sku){
			filtro +='&sku=' +params.sku
		}
		if(params.id_sucursal){
			filtro +='&id_sucursal=' +params.id_sucursal
		}
		if (params.producto){
			filtro +='&producto=' +params.producto
		}
		let url = Const.URL + '/stock'+filtro;
		return this.http.get(url);
	}
	setRecepcion(params) {
		let url = Const.URL + '/recepcion';
		return this.http.post(url, params);
	}
}
