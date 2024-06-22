import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProyectoComponent } from './registrar-proyecto.component';

describe('RegistrarProyectoComponent', () => {
  let component: RegistrarProyectoComponent;
  let fixture: ComponentFixture<RegistrarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
