import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCancelPopupComponent } from './confirm-cancel-popup.component';

describe('ConfirmCancelPopupComponent', () => {
  let component: ConfirmCancelPopupComponent;
  let fixture: ComponentFixture<ConfirmCancelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCancelPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCancelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
