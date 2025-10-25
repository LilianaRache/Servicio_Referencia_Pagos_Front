import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-cancel-popup',
  templateUrl: './confirm-cancel-popup.component.html',
  styleUrls: ['./confirm-cancel-popup.component.scss']
})
export class ConfirmCancelPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmCancelPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
    this.snackBar.open('Referencia cancelada correctamente', 'Cerrar', { duration: 3000 });
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
