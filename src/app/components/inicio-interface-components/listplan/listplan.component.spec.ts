import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListplanComponent } from './listplan.component';

describe('ListplanComponent', () => {
  let component: ListplanComponent;
  let fixture: ComponentFixture<ListplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
