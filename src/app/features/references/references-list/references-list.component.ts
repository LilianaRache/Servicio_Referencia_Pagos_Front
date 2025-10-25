import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentReferenceService } from '../../../core/services/payment-reference.service';
import { PaymentReferenceResponse } from '../../../core/models/payment-reference-response';
import { CancelReferenceDialogComponent } from '../cancel-reference-dialog/cancel-reference-dialog.component';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReferenceFormComponent } from '../reference-form/reference-form.component';

@Component({
  selector: 'app-references-list',
  templateUrl: './references-list.component.html',
  styleUrls: ['./references-list.component.scss']
})
export class ReferencesListComponent implements OnInit {

  list: PaymentReferenceResponse[] = [];
  loading = false;
  error = '';
  searchReferenceValue: string = '';
  searchPaymentIdValue: string = '';


  displayedColumns: string[] = ['reference', 'paymentId', 'description', 'amount', 'status', 'actions'];

  filterForm: FormGroup;

  constructor(
    private svc: PaymentReferenceService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {

    this.filterForm = this.fb.group({
      startDate: ['2025-01-01T00:00:00'],
      endDate: [this.formatDateToLocal(new Date())],
      status: ['01'] // default: Created
    });
  }

  ngOnInit() {
    this.applyFilter();
  }


  formatDateToLocal(date: Date): string {
    return formatDate(date, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
  }


  loadAll(startDate: string, endDate: string, status: string) {
    this.loading = true;
    this.error = '';

    this.svc.findAll(startDate, endDate, status).subscribe({
      next: (response) => {
        this.list = response.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Error cargando referencias';
        this.loading = false;
      }
    });
  }

  applyFilter() {
    const { startDate, endDate, status } = this.filterForm.value;
    this.loadAll(startDate, endDate, status);
  }


  searchReference() {
    const ref = (this.searchReferenceValue || '').trim();
    const payId = Number(this.searchPaymentIdValue);

    if (!ref || !payId) {
      this.error = 'Debes ingresar Referencia y Payment ID para buscar.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.svc.findById(ref, payId).subscribe({
      next: (response) => {
        if (response?.data) {
          this.list = [response.data];
        } else {
          this.list = [];
          this.error = 'No se encontró la referencia.';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'No se encontró la referencia.';
        this.list = [];
        this.loading = false;
      }
    });
  }

  // 🔄 Limpiar búsqueda
  clearSearch() {
    this.searchReferenceValue = '';
    this.searchPaymentIdValue = '';
    this.error = '';
    this.applyFilter();
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ReferenceFormComponent, {
      width: '500px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.svc.create(result).subscribe({
          next: () => this.applyFilter(),
          error: () => alert('❌ No se pudo crear la referencia')
        });
      }
    });
  }

  view(id?: number) {
    if (id) this.router.navigate(['/references', id]);
  }

  cancel(reference: PaymentReferenceResponse) {
    const dialogRef = this.dialog.open(CancelReferenceDialogComponent, {
      width: '400px',
      data: { ...reference }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.svc.update(result).subscribe({
          next: () => this.applyFilter(),
          error: () => alert('No se pudo cancelar la referencia')
        });
      }
    });
  }

  downloadPdf(reference: PaymentReferenceResponse): void {
    if (!reference || !reference.paymentId) {
      console.warn('No se encontró el ID del pago');
      return;
    }

    this.svc.downloadPdf(reference.paymentId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comprobante_${reference.reference}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: err => {
        console.error('Error al descargar PDF', err);
        alert('❌ No se pudo descargar el comprobante.');
      }
    });
  }

  getStatusLabel(status: string) {
    switch (status) {
      case '01': return 'Created';
      case '02': return 'Paid';
      case '03': return 'Canceled';
      case '04': return 'Expired';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case '01': return 'status-active';
      case '02': return 'status-pending';
      case '03': return 'status-cancelled';
      case '04': return 'status-expired';
      default: return '';
    }
  }

}
