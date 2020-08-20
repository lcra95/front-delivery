import { Component, OnInit } from '@angular/core';
import { PuntoService } from './punto.service';
import { RevisarService } from './../revisar/revisar.service'
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from './../registro/registro.service';
import swal from 'sweetalert'
import { Const } from './../const/url';
@Component({
	selector: 'app-punto',
	templateUrl: './punto.component.html',
	styleUrls: ['./punto.component.css']
})
export class PuntoComponent implements OnInit {
	
	producto
	prodSelected = []
	total = 0
	iva = 0
	stotal = 0
	documentos
	tipo_documento
	cliente = false;
	rut_cliente
	infoCliente = null
	isClient = false
	direcciones= []
	pagos
	tipo_pago
	dirselect = null
	nCliente = false
	regiones
	registro = []
	comunas
	userInfo = false
	sucursales 
	constructor(private PuntoService: PuntoService, private RevisarService: RevisarService,  private toastr: ToastrService, private RegistroService: RegistroService) { }

	ngOnInit() {
		this.userInfo = JSON.parse(sessionStorage.getItem('user'));	
		if(!this.userInfo){
			window.location.replace(Const.host +'/login')
			return;
		}else{

			this.sucursales = this.userInfo["data"][0]["sucursales"] 
		}
		this.PuntoService.getTipoDocumento().subscribe(data=>{
			this.documentos = data['response'].data.info
		})	
		this.RevisarService.getTipoPago().subscribe(data => {
			this.pagos = data['response'].data.info
		})
		this.RegistroService.getRegiones().subscribe(data => {
			this.regiones = data['response'].data.info
		})
		
	}
	addProd(){
		
		this.PuntoService.findSku(this.producto).subscribe(data =>{
			data[0].total = data[0].cantidad * data[0].precio
			data[0].iva = data[0].cantidad * data[0].fix_iva
			data[0].precio_bruto = data[0].cantidad * data[0].fix_precio_bruto
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
			
			this.calculate();
			this.producto = ''
		})
	}
	change(index){
		this.prodSelected[index].total = this.prodSelected[index].cantidad * this.prodSelected[index].precio;
		this.prodSelected[index].iva = this.prodSelected[index].cantidad * this.prodSelected[index].fix_iva
		this.prodSelected[index].precio_bruto = this.prodSelected[index].cantidad * this.prodSelected[index].fix_precio_bruto
		
		this.calculate()
	}
	calculate(){
		this.total = 0
		this.iva = 0
		this.stotal = 0
		for(var i = 0; i < this.prodSelected.length; i++){
			this.total = this.total + this.prodSelected[i].total
			this.iva = this.iva + this.prodSelected[i].iva
			this.stotal = this.stotal + this.prodSelected[i].precio_bruto
		}
	}
	retira(index){
		this.prodSelected.splice(index,1)
		this.calculate()
	}
	setTipoDoc(){
		if(this.tipo_documento != 39){
			this.cliente = true
			this.infoCliente =[]
			this.isClient = false
			this.rut_cliente = ''
		}else{
			this.cliente = false
		}
	}
	searchcliente(){

		this.PuntoService.searchcliente(this.rut_cliente).subscribe(data=>{
			if (data["estado"]== 1 ) {
				this.isClient = true
				this.direcciones = data["data"][0].direcciones
			}else{
				this.nCliente = true;
				this.registro["identificacion"] = this.rut_cliente;
			}
			this.infoCliente = data["data"][0];
			
		})

	}

	registrarVenta(){
		if (!sessionStorage.getItem('user')){
			swal({

				title: "Error",
				text : "Debes iniciar sesión para realizar una venta",
				timer: 1500,
				icon: "error"
			})
			return
		}
			
		var cartInfo = []
		var persona = this.userInfo["data"][0].id

		if (this.infoCliente){
			persona =  this.infoCliente.id
		}

		for(var i = 0; i < this.prodSelected.length; i++){
			var tmp = {
				"id" : this.prodSelected[i].id,
				"cantidad" :  this.prodSelected[i].cantidad,
				"precio" : this.prodSelected[i].precio,
				"iva" : this.prodSelected[i].iva,
				"precio_bruto": this.prodSelected[i].precio_bruto,
				"sub_total": this.prodSelected[i].total,

			}
			cartInfo.push(tmp)
		}

		var jsonOrder = {
			"id_creador": this.userInfo["data"][0].id_usuario,
			"id_persona": persona,
			"id_tipo_entrega": 1,
			"id_sucursal": 1,
			"id_direccion" : this.dirselect,
			"id_tipo_documento" : this.tipo_documento,
			"pago":{
				"monto": this.total,
				"id_tipo_pago": this.tipo_pago,
				"voucher": null,
				"comprobante": null
			},
			"detalle": cartInfo
		}
		this.RevisarService.setOrden(jsonOrder).subscribe(response=>{
			if (response["estado"] == 1){
				this.cliente = false
				this.dirselect = null;
				this.prodSelected = [];
				this.tipo_documento = null,
				this.tipo_pago = null
				this.total = 0
				this.iva = 0
				this.stotal = 0
				this.infoCliente =null
			}
			swal({

				title: "Muy Bien",
				text : "La venta ha sido registrada con exito",
				timer: 1500,
				icon: "Success"
			})	
		})
		
		
	}
	provinciaSelect() {
		
		this.RegistroService.getComunasProvincia(this.registro["region"]).subscribe(data => {
			this.comunas = data['response'].data.info
		})
	}
	addCliente() {

	  	var er = false;
		var msj = "Todos los campos son obligatorios";

		if (!this.registro['tipo_persona']) {
			er = true
		}
		if (!this.registro['identificacion']) {
			er = true
		}
		if (!this.registro['nombre']) {
			er = true
		}
		if (!this.registro['email']) {
			er = true
		}
		if (!this.registro['fono']) {
			er = true
		}
		if (!this.registro['giro']) {
			er = true
		}
		if (!this.registro['region']) {
			er = true
		}
		if (!this.registro['comuna']) {
			er = true
		}
		if (!this.registro['direccion']) {
			er = true
		}
		if (er) {
			swal({

				title: "Error",
				text : msj,
				timer: 1500,
				icon: "error"
			})
			return;
		}
		var jsPersona = {
			"id_tipo_direccion": this.registro['tipo_persona'],
			"identificacion": this.registro['identificacion'],
			"nombre": this.registro['nombre'],
			"email": this.registro['email'],
			"numero": this.registro['fono'],
			"giro": this.registro['giro'],
			"id_comuna": this.registro['comuna'],
			"id_region": this.registro['region'],
			"direccion": this.registro['direccion'],
			"registro": 2
		}
		this.RegistroService.setRegistro(jsPersona).subscribe(data => {
			if(data["estado"] == 1){				
				this.rut_cliente = this.registro['identificacion'];
				this.searchcliente();
				this.nCliente= false
			}

		})
	}

}
