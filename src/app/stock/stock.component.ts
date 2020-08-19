import { Component, OnInit } from '@angular/core';
import { StockService } from './stock.service';
import { PuntoService } from './../punto/punto.service'

@Component({
	selector: 'app-stock',
	templateUrl: './stock.component.html',
	styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
	documentos
	nombre = null
	sucursales
	producto
	prodSelected = []
	sucursal = null
	sucur = null
	tipo_documento
	folio
	observacion = ''
	new = true;
	productos
	sku = null
	constructor(private PuntoService: PuntoService, private StockService: StockService) { }

	ngOnInit() {

		this.PuntoService.getTipoDocumento().subscribe(data=>{
			this.documentos = data['response'].data.info
		})	
		this.StockService.getSucursales().subscribe(data=>{
			this.sucursales = data['response'].data.info
		})
		this.filtrar();

	}
	addProd(){
		
		this.PuntoService.findSku(this.producto).subscribe(data =>{
			data[0].total = data[0].cantidad * data[0].precio
			var count = 0
			if (this.prodSelected.length > 0){
				for(var i = 0; i < this.prodSelected.length; i++){
					if(this.prodSelected[i].sku == data[0].sku ){
						this.prodSelected[i].cantidad = this.prodSelected[i].cantidad + 1;
						this.change(i)
						count++
					}
				}
				if(count == 0){
					this.prodSelected.push(data[0])
				}
			}else{	
				this.prodSelected.push(data[0])	
			}	
			this.producto = ''
		})
	}
	change(index){
		this.prodSelected[index].total = this.prodSelected[index].cantidad * this.prodSelected[index].precio
				
	}
	retira(index){
		this.prodSelected.splice(index,1)
		
	}
	registrarStock(){

		var userInfo = JSON.parse(sessionStorage.getItem('user'));		
		var cartInfo = [];
		var error = false;
		var msj ='Los siguientes campos son obligatorios';

		if (!JSON.parse(sessionStorage.getItem('user'))){
			alert("Necesitas iniciar sesión")
			return
		}
		if(this.prodSelected.length == 0){
			error = true;
			msj = "Debe seleccionar productos antes de registrar el stock";
		}
		if(!this.sucursal){
			msj +='\n - Sucursal';
			error = true 
		}
		if(!this.tipo_documento){
			error = true
			msj +='\n - Documento';
		}
		if(!this.folio){
			error = true;
			msj +='\n - Folio';
		}
		if(error){
			alert(msj);
			return;
		}

		for(var i = 0; i < this.prodSelected.length; i++){
			var tmp = {
				"id" : this.prodSelected[i].id,
				"cantidad" :  this.prodSelected[i].cantidad,
				"precio_neto" : this.prodSelected[i].precio,
			}
			cartInfo.push(tmp)
		}

		var jsonOrder = {
			"id_creador": userInfo.data[0].id_usuario,
			"documento": this.folio,
			"observacion": this.observacion,
			"id_sucursal": this.sucursal,
			"id_tipo_documento" : this.tipo_documento,
			"detalle": cartInfo
		}
		
		this.StockService.setRecepcion(jsonOrder).subscribe(response =>{
			if(response["estado"] == 1){
				this.prodSelected = []
				this.folio = ''
				this.sucursal = ''
				this.tipo_documento = ''
				this.observacion = ''
				alert(response["msj"])
			}
			
		})
		
		
	}
	filtrar(){
		var params = {
			"sku" : this.sku,
			"id_sucursal" : this.sucur,
			"producto": this.nombre
		}
		this.StockService.getStock(params).subscribe(data =>{
			this.productos = data['response'].data.info
		})
	}
	limpiar(){
		this.sku = null
		this.sucur = null
		this.nombre = null
		this.filtrar()
	}
}
