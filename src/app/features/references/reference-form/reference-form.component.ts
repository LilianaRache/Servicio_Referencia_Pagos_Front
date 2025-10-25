import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentReferenceService } from '../../../core/services/payment-reference.service';
import { PaymentCreateRequest } from 'src/app/core/models/payment-create-request';
import { PaymentCreateResponse } from 'src/app/core/models/payment-create-response';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reference-form',
  templateUrl: './reference-form.component.html'
})
export class ReferenceFormComponent {
  model: PaymentCreateRequest = {
    externalId: '',
    amount: 0,
    description: '',
    dueDate: '',
    callbackURL: ''
  };

  loading = false;
  error = '';

  constructor(
    private svc: PaymentReferenceService,
    public router: Router,
    public dialogRef?: MatDialogRef<ReferenceFormComponent>, // opcional para soporte modal
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) { }


  private formatDateToLocal(date: any): string {
    const parsedDate = new Date(date);
    return formatDate(parsedDate, 'yyyy-MM-dd\'T\'HH:mm:ss', 'en-US');
  }


  submit() {
    if (!this.isValid()) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.model.dueDate) {
      this.model.dueDate = this.formatDateToLocal(this.model.dueDate);
    }

    this.svc.create(this.model).subscribe({
      next: (res) => {
        const payment: PaymentCreateResponse = res.data;
        alert(`Referencia creada: ${payment.reference || payment.paymentId}`);

        // ✅ si está en modal, cerramos y devolvemos el resultado
        if (this.dialogRef) {
          this.dialogRef.close(this.model);
        } else {
          // ✅ si no está en modal, navegamos como antes
          this.router.navigate(['/references']);
        }
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error creando referencia';
        this.loading = false;
      }
    });
  }

  cancel() {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['/references']);
    }
  }

  private isValid(): boolean {
    return !!(
      this.model.externalId &&
      this.model.amount > 0 &&
      this.model.description &&
      this.model.dueDate &&
      this.model.callbackURL
    );
  }
}