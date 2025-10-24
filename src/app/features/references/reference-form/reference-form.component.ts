import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentReferenceService } from '../../../core/services/payment-reference.service';
import { PaymentCreateRequest } from 'src/app/core/models/payment-create-request';
import { PaymentCreateResponse } from 'src/app/core/models/payment-create-response';

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

  constructor(private svc: PaymentReferenceService, public router: Router) {}

  submit() {
    if (!this.isValid()) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    this.loading = true;
    this.error = '';

    this.svc.create(this.model).subscribe({
      next: (res) => {
        const payment: PaymentCreateResponse = res.data;
        alert(`Referencia creada: ${payment.reference || payment.paymentId}`);
        this.router.navigate(['/references']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error creando referencia';
        this.loading = false;
      }
    });
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
