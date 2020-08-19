import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'

@Injectable({
  providedIn: 'root'
})
export class PuntoService {

  constructor(private http: HttpClient) { }

  findSku(sku) {
    let url = Const.URL + '/sku?sku=' + sku;
    return this.http.get(url);
  }
  getTipoDocumento() {
    let url = Const.URL + '/tipodocumento';
    return this.http.get(url);
  }
  searchcliente(rut) {
    let url = Const.URL + '/searchcliente?identificacion=' + rut;
    return this.http.get(url);
  }

}
