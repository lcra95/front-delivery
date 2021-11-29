import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentarapidaComponent } from './ventarapida.component';

describe('VentarapidaComponent', () => {
  let component: VentarapidaComponent;
  let fixture: ComponentFixture<VentarapidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentarapidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentarapidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
