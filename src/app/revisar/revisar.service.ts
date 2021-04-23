import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RevisarService {

  constructor(private http: HttpClient) { }
  getTipoEntrega() {
    let url = Const.URL + '/tipoentrega';
    return this.http.get(url);
  }
  getTipoPago() {
    let url = Const.URL + '/tipopago';
    return this.http.get(url);
  }
  getCuenta() {
    let url = Const.URL + '/clientecuenta?id_cliente=1';
    return this.http.get(url);
  }
  personafull(id) {
    let url = Const.URL + '/personafull?id='+id;
    return this.http.get(url);
  }
  getplaces(id) {
    let url = Const.URL + '/getplace?id='+id;
    return this.http.get(url);
  }
  setOrden(params){
    let url = Const.URL + '/orden';
    return this.http.post(url, params);
  }
  setPagoOnLine(params){
    var headers = {
      "Authorization": Const.tokenPayKu 
    }
    let url = Const.urlPago + '/transaction';
    return this.http.post(url, params, {headers: headers});
  }
  setNewDireccion(params){
    let url = Const.URL + '/direccion';
    return this.http.post(url, params);
  }
}
