export interface PaymentCancelRequest {
  reference: string;
  status: '03';
  updateDescription: string;
}
