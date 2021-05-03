import { Component, OnInit } from '@angular/core';
import { MaestrosService } from './maestros.service'
import { ProductoService } from './../producto/producto.service'
@Component({
	selector: 'app-maestros',
	templateUrl: './maestros.component.html',
	styleUrls: ['./maestros.component.css']
})
export class MaestrosComponent implements OnInit {
	registroProd = []
	newReg = false;
	tiposProd 
	ivas 
	file = null
	constructor(private MaestrosService : MaestrosService, private ProductoService: ProductoService ) { }

	ngOnInit() {
	}
	newProducto(){
		this.ProductoService.getTipoProductos().subscribe(data => {
			this.tiposProd = data['response'].data.info;
			
		});
		this.MaestrosService.getIvas().subscribe(data => {
			this.ivas = data['response'].data.info;
			
		});
		this.newReg = true
	}
	setProducto(){
		var image = null
		if(this.registroProd["imagen"]){
			image = this.registroProd["imagen"]
		}
		var json = {

			"nombre": this.registroProd["nombre"],
			"descripcion": this.registroProd["descripcion"],
			"sku": this.registroProd["sku"],
			"barcode": this.registroProd["barcode"],
			"id_tipo_producto": this.registroProd["tipo_producto"],
			"precio" : this.registroProd["precio"],
			"id_iva" : this.registroProd["iva"],
			"imagen" : this.file,
			"id_cliente" : 1
		}
		// console.log(json);
		
		// return;
		this.MaestrosService.setProducto(json).subscribe(response =>{
			console.log(response);
			
		})
	}
	onFileSelected(event){
		this.file = event.target.files[0]
		console.log(event);
		
	}
}
