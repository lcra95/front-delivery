import { Component, OnInit } from '@angular/core';
import { TasacambioService } from './tasacambio.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-tasacambio',
  templateUrl: './tasacambio.component.html',
  styleUrls: ['./tasacambio.component.css']
})
export class TasacambioComponent implements OnInit {
  tasa = 0.0320
  currency = "CLP"
  monto = 0
  precio_bs = 0
  precio_clp = 0
  bs_remesa = 0
  usd = 0
  clp_pagar = 0
  ganancia = 0
  margen = 0
  cobrar = 0
  constructor(private TasacambioService : TasacambioService) { }

  ngOnInit() {
    this.TasacambioService.tasa().subscribe(respuesta => {
      this.tasa = respuesta["tasa"]
    })
  }
  cambio() {
    this.TasacambioService.tasa(this.tasa).subscribe(respuesta => {
      if (respuesta) {
        swal({
          title: "Tasa Actualizada",
          timer: 1000,
          icon: "success"
        })
      }

    })
  }
  actualizartasa(){
    console.log(this.tasa);
    
  }
  calcular(){
    let params = {}
    if (this.currency == 'CLP' ){

      params = {
        tasa : this.tasa,
        clp : this.monto
      }
    } 
    if (this.currency == 'BS'){
      params = {
        tasa : this.tasa,
        bs : this.monto
      }
    }
    if (this.currency == 'USD'){
      params = {
        tasa : this.tasa,
        usd : this.monto
      }
    }
    this.TasacambioService.calulo(params).subscribe(resp =>{
      this.precio_bs = resp["bs_precio"]
      this.precio_clp = resp["clp_precio"]
      this.bs_remesa = resp["bs_comision"]
      this.usd = resp["usd_comprar"]
      this.cobrar = resp["clp_cambio"] 
      this.clp_pagar = resp["clp_cambio"] - resp["ganancia"]
      this.ganancia = resp["ganancia"]
      this.margen = resp["margen"]
      console.log(resp);
      
    })
  }

}
