export interface PaymentCreateResponse {
  paymentId: number;
  reference: string;
  amount: number;
  description: string;
  creationDate: string; // LocalDateTime -> string en ISO
  status: string;
  message: string;
}