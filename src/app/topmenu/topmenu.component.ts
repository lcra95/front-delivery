import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductoService } from './../producto/producto.service'
import { Router } from '@angular/router';
import * as moment from 'moment';
import swal from 'sweetalert';
import { Const } from '../const/url';
@Component({
	selector: 'app-topmenu',
	templateUrl: './topmenu.component.html',
	styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
	message: string = "Hello Angular!"
	perfil = "1"
	@Output() messageEvent = new EventEmitter<string>();
	constructor(private router: Router) { }
	count = null
	ngOnInit() {
		// let apertura = '17:30:00'
		// let output = moment(new Date()).format("H:m:s");
		
		// if(apertura < output){
		// 	swal({
		// 		title: "Aviso Importante",
		// 		text: "En este momento no recibimos pedidos a través del Menú Online. Iniciaremos la recepcion de pedidos a las 5:30pm",
		// 		icon: "warning",
		// 		dangerMode: true,
		// 		closeOnClickOutside: false
		// 	  })
		// 	  .then(willDelete => {
		// 		if (willDelete) {
		// 			window.location.replace(Const.host)
				  
		// 		}
		// 	  });
		// }
	}
	home(){
		this.router.navigate(['/producto'] );
	}
}
