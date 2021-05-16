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
		var formDta = new FormData()
		var headers = {"Content-Type" : "multipart/form-data;"}
		formDta.append("barcode", params.barcode)
		formDta.append("descripcion", params.descripcion)
		formDta.append("id_cliente", params.id_cliente)
		formDta.append("id_iva", params.id_iva)
		formDta.append("id_tipo_producto", params.id_tipo_producto)
		formDta.append("nombre", params.nombre)
		formDta.append("precio", params.precio)
		formDta.append("sku", params.sku)
		formDta.append("imagen", params.imagen)
		
		let url = Const.URL + '/producto';
		return this.http.post(`${url}`,formDta);
	}

}
