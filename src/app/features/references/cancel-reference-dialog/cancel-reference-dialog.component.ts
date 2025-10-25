import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentCancelRequest } from 'src/app/core/models/payment-cancel-request';
import { ConfirmCancelPopupComponent } from '../confirm-cancel-popup/confirm-cancel-popup.component';

@Component({
  selector: 'app-cancel-reference-dialog',
  templateUrl: './cancel-reference-dialog.component.html',
  styleUrls: ['./cancel-reference-dialog.component.scss']
})
export class CancelReferenceDialogComponent {

  constructor(
    private dialog: MatDialog, // ✅ Inyectamos MatDialog para abrir popups
    private snackBar: MatSnackBar, // ✅ Inyectamos snackbar para mostrar mensajes
    public dialogRef: MatDialogRef<CancelReferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentCancelRequest
  ) {}

  // ✅ Confirma cancelación
  onConfirm(): void {
    const confirmDialog = this.dialog.open(ConfirmCancelPopupComponent, {
      width: '350px',
      data: { reference: this.data.reference }
    });

    confirmDialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Cambia el estado a '03' (Cancelado)
        this.data.status = '03';

        // Cierra el diálogo original devolviendo los datos modificados
        this.dialogRef.close(this.data);

        // ✅ Mostrar mensaje visual de confirmación
        this.snackBar.open(
          `Referencia ${this.data.reference} cancelada correctamente.`,
          'Cerrar',
          { duration: 3000, panelClass: ['success-snackbar'] }
        );
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
