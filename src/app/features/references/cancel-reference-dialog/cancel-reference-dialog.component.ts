import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentCancelRequest } from 'src/app/core/models/payment-cancel-request';

@Component({
  selector: 'app-cancel-reference-dialog',
  templateUrl: './cancel-reference-dialog.component.html',
  styleUrls: ['./cancel-reference-dialog.component.scss']
})
export class CancelReferenceDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CancelReferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentCancelRequest
  ) {}

  onConfirm() {
    this.dialogRef.close(this.data);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
