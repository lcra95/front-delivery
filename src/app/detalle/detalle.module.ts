import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './../search/search.component'

@NgModule({
    imports: [ 
        RouterModule, 
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule
    ],
    declarations: [ 
        DetalleComponent
    ],
    exports: [ DetalleComponent]
})

export class DetalleModule {}