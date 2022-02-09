import { Component, OnInit } from '@angular/core';
import { OrdenService } from './orden.service'
import * as moment from 'moment';
import swal from 'sweetalert';
import { text } from '@angular/core/src/render3/instructions';
import $ from 'jquery'
import { Const } from './../const/url'
@Component({
	selector: 'app-orden',
	templateUrl: './orden.component.html',
	styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

	constructor(private OrdenService: OrdenService) { }
	hoy: string = moment(new Date()).format("DD-MM-YYYY");
	ordenes = []
	ordenes1
	//hoy ="30-08-2020"

	ngOnInit() {
		this.ordenes = []
		var param = {
			"id_sucursal" :  1,
			"fecha": this.hoy,
			"estado" : 1
		}
		this.OrdenService.getOrdens(param).subscribe(data=>{
			this.ordenes1 = data
			for(var i = 0; i < this.ordenes1.length; i++){
				if(this.ordenes1[i].tipo_pago != 3){
					this.ordenes.push(this.ordenes1[i])
				}else{
					if(this.ordenes1[i].pagado == 1){
						this.ordenes.push(this.ordenes1[i])
					}
				}
				if(this.ordenes1[i].estado ==  "Pendiente"){
					$("#alerta").innerHTML +='<audio src="/src/assets/audio/SD_ALERT_8.mp3" autoplay></audio>'
				}
			}
		})

	}
	filter(id){
		this.ordenes = []
		var param = {
			"id_sucursal" :  1,
			"fecha": this.hoy,
			"estado" : id
		}
		this.OrdenService.getOrdens(param).subscribe(data=>{
			
			this.ordenes1 = data
			for(var i = 0; i < this.ordenes1.length; i++){
				if(this.ordenes1[i].tipo_pago != 3){
					this.ordenes.push(this.ordenes1[i])
				}else{
					if(this.ordenes1[i].pagado == 1){
						this.ordenes.push(this.ordenes1[i])
					}
				}
				if(this.ordenes1[i].estado ==  "Pendiente"){
					$("#alerta").innerHTML +='<audio src="/src/assets/audio/SD_ALERT_8.mp3" autoplay></audio>'
				}
			}
		})
	}
	imprimir(id, estado){
		var params = {
			"id" : id,
			"estado": estado,
			"informada" : 1
		}
		this.download(id)
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
	download(id) {

		const linkSource = Const.URL + "/imprimir-orden/"+id.toString();
		const downloadLink = document.createElement("a");
		downloadLink.href = linkSource;
		downloadLink.target = '_blank';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		downloadLink.remove();
	}
}
