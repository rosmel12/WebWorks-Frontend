import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMetodoPagoComponent } from './registrar-metodo-pago.component';

describe('RegistrarMetodoPagoComponent', () => {
  let component: RegistrarMetodoPagoComponent;
  let fixture: ComponentFixture<RegistrarMetodoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarMetodoPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarMetodoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
