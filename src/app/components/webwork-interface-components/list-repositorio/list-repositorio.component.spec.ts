import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepositorioComponent } from './list-repositorio.component';

describe('ListRepositorioComponent', () => {
  let component: ListRepositorioComponent;
  let fixture: ComponentFixture<ListRepositorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRepositorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
