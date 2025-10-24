import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response';
import { PaymentReferenceResponse } from '../models/payment-reference-response';
import { Observable } from 'rxjs';
import { PaymentCreateResponse } from '../models/payment-create-response';
import { PaymentCreateRequest } from '../models/payment-create-request';
import { PaymentCancelRequest } from '../models/payment-cancel-request';
import { PaymentUpdateResponse } from '../models/payment-update-response';

@Injectable({ providedIn: 'root' })
export class PaymentReferenceService {

  private base = `${environment.apiBaseUrl}/v1`;

  constructor(private http: HttpClient) { }

  create(model: PaymentCreateRequest): Observable<ApiResponse<PaymentCreateResponse>> {
    return this.http.post<ApiResponse<PaymentCreateResponse>>(
      `${environment.apiBaseUrl}/payments`,
      model
    );
  }


  findById(reference: string, paymentId: number) {
    const url = `${environment.apiBaseUrl}/payment/${reference}/${paymentId}`;
    return this.http.get<ApiResponse<PaymentReferenceResponse>>(url);
  }

  findAll(startCreationDate: string, endCreationDate: string): Observable<ApiResponse<PaymentReferenceResponse[]>> {
    const url = `${this.base}/payments/search`;

    const params = {
      startCreationDate,
      endCreationDate
    };

    return this.http.get<ApiResponse<PaymentReferenceResponse[]>>(url, { params });
  }

  update(request: PaymentCancelRequest): Observable<ApiResponse<PaymentUpdateResponse>> {
  const url = `${this.base}/payment/cancel`;
  return this.http.put<ApiResponse<PaymentUpdateResponse>>(url, request);
}

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.base}/${id}/pdf`, {
      responseType: 'blob' // 👈 importante para recibir archivos binarios
    });
  }


}
