import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentReferenceService } from '../../../core/services/payment-reference.service';
import { PaymentReferenceResponse } from '../../../core/models/payment-reference-response';
import { ApiResponse } from 'src/app/core/models/api-response';
import { CancelReferenceDialogComponent } from '../cancel-reference-dialog/cancel-reference-dialog.component';

@Component({
  selector: 'app-references-list',
  templateUrl: './references-list.component.html',
  styleUrls: ['./references-list.component.scss']
})
export class ReferencesListComponent implements OnInit {

  list: PaymentReferenceResponse[] = [];
  loading = false;
  error = '';

  displayedColumns: string[] = ['reference', 'description', 'amount', 'status', 'actions'];

  constructor(
    private svc: PaymentReferenceService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
  this.loading = true;
  const startDate = '2025-01-01T00:00:00';
  const endDate = new Date().toISOString();

  this.svc.findAll(startDate, endDate).subscribe({
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

  view(id?: number) {
    if (id) this.router.navigate(['/references', id]);
  }

  cancel(reference: PaymentReferenceResponse) {
    const dialogRef = this.dialog.open(CancelReferenceDialogComponent, {
      width: '400px',
      data: { ...reference }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // result trae la info modificada para cancelar
        this.svc.update(result).subscribe({
          next: () => this.loadAll(),
          error: () => alert('No se pudo cancelar la referencia')
        });
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
    default: return '';
  }
}

}
