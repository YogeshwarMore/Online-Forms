import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionClosedComponent } from './submission-closed.component';

describe('SubmissionClosedComponent', () => {
  let component: SubmissionClosedComponent;
  let fixture: ComponentFixture<SubmissionClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionClosedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
