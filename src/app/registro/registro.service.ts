import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'
@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    constructor(private http: HttpClient) { }
    
    getComunas() {

        let url = Const.URL + '/comuna';
        return this.http.get(url);

    }
    getRegiones() {

        let url = Const.URL + '/provincia';
        return this.http.get(url);

    }
    getTipoDireccion() {
        let url = Const.URL + '/tipodireccion';
        return this.http.get(url);
    }
    setRegistro(params){
        let url = Const.URL + '/persona';
        return this.http.post(url, params);
    }
    sendinBlue(params){
        var headers = {
            "api-key": Const.tokenMail
        }
        let url =  Const.urlMail
        return this.http.post(url, params, {headers: headers});
    }
    getComunasProvincia(_id) {

        let url = Const.URL + '/comunaprovincia?provincia=' + _id;
        return this.http.get(url);

    }
}
