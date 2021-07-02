import { Component, OnInit } from '@angular/core';
import { CalculadorService } from './calculador.service';
@Component({
  selector: 'app-calculador',
  templateUrl: './calculador.component.html',
  styleUrls: ['./calculador.component.css']
})
export class CalculadorComponent implements OnInit {
	fadreess = '';
	place_id = '';
	options = {
		componentRestrictions: {
			country: ['CL']
		}
	}
  direccion
  sucursal
  origen
  destino
  distancia
  monto
  constructor(private CalculadorService: CalculadorService) { }

  ngOnInit() {
  }
	public handleAddressChange(address: any) {
		this.fadreess = address
		this.place_id = this.fadreess["place_id"];
		this.destino = 'place_id:'+this.fadreess["place_id"];
    this.origen = this.sucursal   
		
	}
  calcular(){
    this.CalculadorService.calcular(this.origen, this.destino).subscribe(data=>{
      if(data["estado"]==1){
        this.distancia = data["distancia"]
        this.monto = data["monto"]
      }
      if(data["estado"]==0){
        this.distancia = data["distancia"]
        this.monto = "Distancia no cubierta"
      }

      
    })
  }
  limpiar(){
    this.distancia = ''
    this.monto = ''
    this.direccion = ''

  }
  origin(){
    this.origen = this.sucursal

  }
}
