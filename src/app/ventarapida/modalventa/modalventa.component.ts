import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/const/productos';
import swal from 'sweetalert';
@Component({
  selector: 'app-modalventa',
  templateUrl: './modalventa.component.html',
  styleUrls: ['./modalventa.component.css']
})
export class ModalventaComponent implements OnInit {
  nombre
  opciones1
  opciones
  opcion
  opcionsE
  mopcion = false
  eleccion 
  comentario
  id
  cantidad =1
  carro 
  items
  constructor() { }

  ngOnInit() {
    this.nombre 
    this.opciones1 = this.opciones

    
    if (this.opciones.length > 0){
      this.mopcion = true;
    }
    
  }
  cargar(index){
    if(this.eleccion == null){
      swal({
        title : "Elige una opcion",
        timer : 1000,
        icon: "error"
      })
      return
    }
    var temp = Stock.prod.menu[index]
    var selected = {
      
      "index": index,
      "nombre" : temp.nombre,
      "cantidad" : this.cantidad,
      "comentario" : this.comentario,
      "eleccion": this.eleccion,
      "precio" : temp.precio,
      "sub_total" : this.cantidad * temp.precio
    }
    this.carro = JSON.parse(sessionStorage.getItem('cart'))   
    this.carro.push(selected)
    sessionStorage.setItem('cart', JSON.stringify(this.carro))
  }

}
