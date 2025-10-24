export interface PaymentUpdateResponse {
  paymentId: number;
  creationDate: string; // LocalDateTime -> string ISO
  reference: string;
  status: string;
  message: string;
  cancelDescription?: string;
  updatedAt?: string; // LocalDateTime -> string ISO
}
