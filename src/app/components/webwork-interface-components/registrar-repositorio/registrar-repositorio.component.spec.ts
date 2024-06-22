import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRepositorioComponent } from './registrar-repositorio.component';

describe('RegistrarRepositorioComponent', () => {
  let component: RegistrarRepositorioComponent;
  let fixture: ComponentFixture<RegistrarRepositorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarRepositorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarRepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
