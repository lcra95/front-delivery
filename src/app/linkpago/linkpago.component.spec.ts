import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkpagoComponent } from './linkpago.component';

describe('LinkpagoComponent', () => {
  let component: LinkpagoComponent;
  let fixture: ComponentFixture<LinkpagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkpagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
