import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalventaComponent } from './modalventa.component';

describe('ModalventaComponent', () => {
  let component: ModalventaComponent;
  let fixture: ComponentFixture<ModalventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
