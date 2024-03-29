import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { ProductoComponent } from './producto/producto.component';
// import { DetalleModule } from './detalle/detalle.module'
import { DetalleComponent } from './detalle/detalle.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartComponent } from './cart/cart.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { RevisarComponent } from './revisar/revisar.component';
import { PuntoComponent } from './punto/punto.component';
import { NgSelect2Module } from 'select2';
import { StockComponent } from './stock/stock.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { SearchComponent } from './search/search.component';
import { OrdenComponent } from './orden/orden.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { CalculadorComponent } from './calculador/calculador.component';
import { LinkpagoComponent } from './linkpago/linkpago.component';
import { VentarapidaComponent } from './ventarapida/ventarapida.component';
import { ModalventaComponent } from './ventarapida/modalventa/modalventa.component';
import { TasacambioComponent } from './tasacambio/tasacambio.component';
import { AccordionComponent } from './accordion/accordion.component';
const appRoutes: Routes = [
	{ path: '', component: ProductoComponent },
	{ path: 'producto', component: ProductoComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'registro', component: RegistroComponent },
	{ path: 'detalle', component: DetalleComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'revisar', component: RevisarComponent },
	{ path: 'punto', component: PuntoComponent },
	{ path: 'stock', component: StockComponent },
	{ path: 'maestros', component: MaestrosComponent },
	{ path: 'orden', component: OrdenComponent },
	{ path: 'cont', component: ContabilidadComponent },
	{ path: 'calculador', component: CalculadorComponent },
	{ path: 'generador', component: LinkpagoComponent },
	{ path: 'venta', component: VentarapidaComponent },
	{ path: 'tasa', component: TasacambioComponent },
	
	{ path: '**', redirectTo: '/login' }
];

@NgModule({

  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    // DetalleModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    AutocompleteLibModule,
    GooglePlaceModule,

  ],
  declarations: [
    AppComponent,
    ProductoComponent,
    CartComponent,
    RegistroComponent,
    LoginComponent,
    RevisarComponent,
    PuntoComponent,
    StockComponent,
    MaestrosComponent,
    TopmenuComponent,
    SearchComponent,
    OrdenComponent,
    DetalleComponent,
    ContabilidadComponent,
    CalculadorComponent,
    LinkpagoComponent,
    VentarapidaComponent,
    ModalventaComponent,
    TasacambioComponent,
    AccordionComponent
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DetalleComponent,ModalventaComponent]
})
export class AppModule { }
