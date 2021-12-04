import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/const/productos';
import { Const } from 'src/app/const/url';
import swal from 'sweetalert';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-modalventa',
  templateUrl: './modalventa.component.html',
  styleUrls: ['./modalventa.component.css']
})
export class ModalventaComponent implements OnInit {
  nombre
  opciones1
  ingredientes
  opcion
  opcionsE
  mopcion = false
  eleccion
  comentario
  id
  cantidad = 1
  carro
  items
  urlImage = Const.URL + '/imagen/'
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {

    this.opciones1 = this.ingredientes


    if (this.ingredientes.length > 0) {
      this.mopcion = true;
    }

  }
  cargar(index) {
    console.log(index);
    // return
    if (this.ingredientes.length > 0 && this.eleccion == null) {

      swal({
        title: "Elige una opcion",
        timer: 1000,
        icon: "error"
      })
      return
    }
    var prod = null;
    var menu = JSON.parse(sessionStorage.getItem('menu'))
    for (var i = 0; i < menu.length; i++) {
      if (menu[i].id == index) {
        prod = menu[i]
        break
      }
    }
    var sub_total = prod.precio * this.cantidad
    var agcart = {
      "id": prod.id,
      "nombre": prod.nombre,
      "precio": prod.precio,
      "precio_bruto": prod.fix_precio_bruto * this.cantidad,
      "cantidad": this.cantidad,
      "sub_total": sub_total,
      "detalle": this.comentario,
      "eleccion": this.eleccion,
      "descripcion": prod.descripcion,
      "imagen": prod.imagen,
      "iva": prod.fix_iva * prod.cantidad,
      "fix_iva": prod.fix_iva,
      "fix_bruto": prod.fix_precio_bruto
    }

    this.carro = JSON.parse(sessionStorage.getItem('cart'))
    this.carro.push(agcart)
    sessionStorage.setItem('cart', JSON.stringify(this.carro))
    this.bsModalRef.hide();
    swal({
      title: "Producto Agregado",
      timer: 1000,
      icon: "success"
    })
  }

}
