export interface PaymentReferenceResponse {
  paymentId: number;
  amount: number;
  reference: string;
  description: string;
  dueDate: string;
  status: string;
  callBackURL: string;
  callbackACKID?: string; 
  cancelDescription?: string; 
  authorizationNumber?: string; 
  paymentDate?: string; 
}