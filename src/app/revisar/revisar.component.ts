import { Component, OnInit } from '@angular/core';
import { RevisarService } from './revisar.service';
import { RegistroService } from './../registro/registro.service'
import { Const } from './../const/url';
import swal from 'sweetalert';

@Component({
	selector: 'app-revisar',
	templateUrl: './revisar.component.html',
	styleUrls: ['./revisar.component.css']
})
export class RevisarComponent implements OnInit {
	registro = []
	entregas
	pagos
	tipo_entrega
	direcciones = []
	delivery = false;
	carros
	Stotal = 0
	items
	iva = 0
	total = 0
	kilometros = 1.3
	mDelivery = 1000
	cuentas
	transfer = false
	tipo_pago
	dirselect = null
	sinDtotal
	newDir = false
	tipos
	comunas
	constructor(private RevisarService: RevisarService, private RegistroService: RegistroService) { }

	ngOnInit() {
		
		this.carros = JSON.parse(sessionStorage.getItem('cart'));
		this.items = this.carros.length;
		if (this.carros.length > 0) {
			for (var i = 0; i < this.carros.length; i++) {

				this.Stotal = this.Stotal + this.carros[i].precio_bruto
				this.iva = this.iva + this.carros[i].iva;
				this.total = this.total + this.carros[i].sub_total
			}
		}
		

	
		this.RevisarService.getTipoEntrega().subscribe(data => {
			this.entregas = data['response'].data.info
		})
		this.RevisarService.getTipoPago().subscribe(data => {
			this.pagos = data['response'].data.info
		})
	}
	setTipoEntrega() {
		if (this.tipo_entrega == 3) {
			this.delivery = true;
			this.total = this.mDelivery + this.total
			this.direcciones = JSON.parse(sessionStorage.getItem('user')).data[0].direcciones

		} else {
			this.dirselect = null
			if(this.delivery){
				this.total = this.total - this.mDelivery
			}
			this.delivery = false;
		}

	}
	setTipoPago() {
		if (this.tipo_pago == 2){
			this.transfer = true;
			this.RevisarService.getCuenta().subscribe(data => {
				this.cuentas = data['response'].data.info
			})
		}else{
			this.transfer = false;
		}
	}
	finalizar(){
		var userInfo = JSON.parse(sessionStorage.getItem('user'));
		var cartInfo = JSON.parse(sessionStorage.getItem('cart'));
		var jsonOrder = {
			"id_creador": userInfo.data[0].id_usuario,
			"id_persona": userInfo.data[0].id,
			"id_tipo_entrega": this.tipo_entrega,
			"id_sucursal": 1,
			"id_direccion" : this.dirselect,
			"pago":{
				"monto": this.total,
				"id_tipo_pago": this.tipo_pago,
				"voucher": null,
				"comprobante": null
			},
			"detalle": cartInfo
		}
		this.RevisarService.setOrden(jsonOrder).subscribe(response=>{
			if(response["estado"] == 1){
				if(this.tipo_pago == 3){
					var PayKu = {
						"email": userInfo.data[0].correo,
						"order": response["orden"],
						"subject": "Compra en linea",
						"amount" : this.total,
						"payment": 1,
						"urlreturn": Const.host + "/producto",
						//"urlreturn": "http://nrquena.ddns.net:5000" + "/producto",
						"urlnotify": Const.URL + "/pagoenlinea"
					}
					this.RevisarService.setPagoOnLine(PayKu).subscribe(response =>{
						if (response["id"]) {
							sessionStorage.removeItem('cart');
							var cart = [];
							sessionStorage.setItem("cart",JSON.stringify(cart))
							window.location.replace(response["url"])
						}
						
					})
				}else{
					sessionStorage.removeItem('cart');
					var cart = [];
					sessionStorage.setItem("cart",JSON.stringify(cart))
					window.location.replace(Const.host +'/producto')
				}
			}
			
		})
		
	}
	newDire(){
		this.newDir = true;
		this.RegistroService.getComunas().subscribe(data=>{
			this.comunas = data['response'].data.info
		})
		this.RegistroService.getTipoDireccion().subscribe(data=>{
			this.tipos = data['response'].data.info
		})
	}
	guardarDir(){
		var dept = null;
		var er = false;
		var msj = "Debe llenar todos los campos son obligatorios"

		if(!this.registro['tipo']){
			er = true
		}
		if(!this.registro['comuna']){
			er = true
		}
		if(!this.registro['direccion']){
			er = true
		}
		if(!this.registro['numerod']){
			er = true
		}
		if(er){ 
			swal({

				title: "Campos Obligatorios",
				text : msj,
				timer: 1500,
				icon: "error"
			})
			return;
		}
		if(this.registro['departamento']){
			dept = this.registro['departamento']
		}
		var userInfo = JSON.parse(sessionStorage.getItem('user'));	
		var jsonDir = {
			"id_comuna" : this.registro['comuna'],
			"direccion_escrita": this.registro['direccion'],
			"numero" : this.registro['numerod'],
			"id_tipo_direccion": this.registro['tipo'],
			"departamento": dept,
			"id_persona": userInfo.data[0].id
		}
		var desComuna = ''
		var tipoDesc = ''
		this.RevisarService.setNewDireccion(jsonDir).subscribe(response => {
			if(response["estado"] == 1){
				swal({

					title: "OK!",
					text : response["msj"],
					timer: 1500,
					icon: "success"
				})
				for(var x = 0; x < this.comunas.length; x++){
					if(this.comunas[x].id = this.registro['comuna'] ){
						desComuna = this.comunas[x].nombre
					}
				}
				for(var y = 0; y < this.tipos.length; y++){
					if(this.tipos[y].id = this.registro['tipo'] ){
						tipoDesc = this.tipos[y].nombre
					}
				}
				this.RevisarService.personafull(userInfo.data[0].id).subscribe(persona =>{
					userInfo.data = persona;
					sessionStorage.setItem("user", JSON.stringify(userInfo))
					this.newDir = false;
					this.setTipoEntrega()
					this.dirselect = response["id_direccion"]
				})


			}else{
				swal({

					title: "Error al registrar",
					text : response["msj"],
					timer: 1500,
					icon: "error"
				})
			}
			
		})
	}
}
