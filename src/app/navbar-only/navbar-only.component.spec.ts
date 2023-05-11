import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOnlyComponent } from './navbar-only.component';

describe('NavbarOnlyComponent', () => {
  let component: NavbarOnlyComponent;
  let fixture: ComponentFixture<NavbarOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarOnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
