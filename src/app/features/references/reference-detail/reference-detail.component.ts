import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentReferenceService } from 'src/app/core/services/payment-reference.service';
import { PaymentReferenceResponse } from 'src/app/core/models/payment-reference-response';
import { ApiResponse } from 'src/app/core/models/api-response';


@Component({
  selector: 'app-reference-detail',
  templateUrl: './reference-detail.component.html',
  styleUrls: ['./reference-detail.component.scss']
})
export class ReferenceDetailComponent implements OnInit {

  @Input() referenceString!: string;  
  @Input() paymentId!: number;        

  reference?: PaymentReferenceResponse;
  isLoading = true;

  constructor(
    private referenceService: PaymentReferenceService) { }

   ngOnInit(): void {
    if (this.referenceString && this.paymentId) {
      this.referenceService.findById(this.referenceString, this.paymentId).subscribe({
        next: (response: ApiResponse<PaymentReferenceResponse>) => {
          this.reference = response.data; 
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar la referencia', err);
          this.isLoading = false;
        }
      });
    } else {
      console.warn('No se recibieron reference o paymentId');
      this.isLoading = false;
    }
  }

  downloadPdf(): void {
    if (!this.reference) return;

    const id = this.reference.paymentId!;
    this.referenceService.downloadPdf(id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comprobante_${this.reference?.reference}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: err => console.error('Error al descargar PDF', err)
    });
  }
}







