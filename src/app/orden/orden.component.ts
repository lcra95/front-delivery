import { Component, OnInit } from '@angular/core';
import { OrdenService } from './orden.service'
import * as moment from 'moment';
import swal from 'sweetalert';
import { text } from '@angular/core/src/render3/instructions';
@Component({
	selector: 'app-orden',
	templateUrl: './orden.component.html',
	styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

	constructor(private OrdenService: OrdenService) { }
	hoy: string = moment(new Date()).format("DD-MM-YYYY");
	ordenes
	ngOnInit() {
		var param = {
			"id_sucursal" :  1,
			"fecha": this.hoy,
			"estado" : 1
		}
		this.OrdenService.getOrdens(param).subscribe(data=>{
			this.ordenes = data
		})

	}
	filter(id){
		var param = {
			"id_sucursal" :  1,
			"fecha": this.hoy,
			"estado" : id
		}
		this.OrdenService.getOrdens(param).subscribe(data=>{
			this.ordenes = data
		})
	}
	imprimir(id, estado){
		var params = {
			"id" : id,
			"estado": estado
		}
		this.OrdenService.EditOrden(params).subscribe(response =>{
			if(response["estado"]== 1){
				swal({
					title : "Orden Actualizada",
					timer : 1000,
					icon: "success",
				})
				this.filter(1)
			}else{

			}
			
		})
	}
}
