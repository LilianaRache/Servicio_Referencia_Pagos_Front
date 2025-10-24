import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReferenceDialogComponent } from './cancel-reference-dialog.component';

describe('CancelReferenceDialogComponent', () => {
  let component: CancelReferenceDialogComponent;
  let fixture: ComponentFixture<CancelReferenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelReferenceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelReferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
