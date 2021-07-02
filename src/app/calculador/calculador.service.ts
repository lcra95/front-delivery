import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from './../const/url'
@Injectable({
    providedIn: 'root'
})
export class CalculadorService {

    constructor(private http: HttpClient) { }
    calcular(origen, destino) {
        var params = {
            "origins": origen,
            "destinations": destino,

        }
        let url = Const.URL + '/matrix'
        return this.http.get(url, {params: params});
    }
}
