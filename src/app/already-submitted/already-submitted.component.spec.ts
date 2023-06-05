import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadySubmittedComponent } from './already-submitted.component';

describe('AlreadySubmittedComponent', () => {
  let component: AlreadySubmittedComponent;
  let fixture: ComponentFixture<AlreadySubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadySubmittedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadySubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
