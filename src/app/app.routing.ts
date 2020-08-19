import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { ProductoComponent } from './producto/producto.component';
import { CartComponent } from './cart/cart.component';


const appRoutes: Routes = [
	// { path: '', component: AppComponent },
	{ path: 'producto', component: ProductoComponent },
	{ path: 'cart', component: CartComponent },

	{ path: '**', redirectTo: '/producto' }
];

export const routing = RouterModule.forRoot(appRoutes);
