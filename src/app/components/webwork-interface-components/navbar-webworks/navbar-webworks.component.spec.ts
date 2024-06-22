import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWebworksComponent } from './navbar-webworks.component';

describe('NavbarWebworksComponent', () => {
  let component: NavbarWebworksComponent;
  let fixture: ComponentFixture<NavbarWebworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarWebworksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarWebworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
