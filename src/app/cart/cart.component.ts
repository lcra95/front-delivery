import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Const } from '../const/url';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	constructor(private router: Router) { }
	cart
	total = 0
	iva = 0
	subtotal = 0
	bruto = 0
	urlImage = Const.URL+'/imagen/'
	ngOnInit() {
		this.cart = JSON.parse(sessionStorage.getItem("cart"));
		this.calculate()
	}
	finalizar(){
		if(sessionStorage.getItem('user')){
			this.router.navigate(['/revisar'] );
		}else{
			this.router.navigate(['/revisar'] );
		}
	}
	change(index){
		this.cart[index].iva = this.cart[index].fix_iva * this.cart[index].cantidad
		this.cart[index].precio_bruto = this.cart[index].fix_bruto * this.cart[index].cantidad
		this.cart[index].sub_total = this.cart[index].precio * this.cart[index].cantidad
		this.calculate()
	}
	retira(index){
		this.cart.splice(index,1)
		this.calculate()
	}
	calculate(){
		this.total = 0
		this.iva = 0
		this.subtotal = 0
		this.bruto = 0

		
		if (this.cart.length > 0){
			for (var i = 0; i < this.cart.length; i++){
			
				this.iva = this.iva + this.cart[i].iva 
				this.bruto = this.bruto + this.cart[i].precio_bruto
				this.total =  this.total + this.cart[i].sub_total
				
			}
			
		}	
		sessionStorage.setItem("cart", JSON.stringify(this.cart))
	}
}
