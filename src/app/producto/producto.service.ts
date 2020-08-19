import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'
@Injectable({
	providedIn: 'root'
})
export class ProductoService {

	constructor(private http: HttpClient) { }

	getProductos(param) {
		let url = Const.URL + '/productos';
		return this.http.get(url,{ params: param});
	}
	getTipoProductos() {
		let url = Const.URL + '/tipoproducto';
		return this.http.get(url);
	}
	getProductoDetalle(id) {
		let url = Const.URL + '/producto/detalle';
		let parametros = {
			id: id,
		}
		return this.http.get(url, { params: parametros });
	}
}
