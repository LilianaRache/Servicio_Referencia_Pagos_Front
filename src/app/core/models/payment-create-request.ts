export interface PaymentCreateRequest {
  externalId: string;
  amount: number; // BigDecimal -> number
  description: string;
  dueDate: string; // yyyy-MM-ddTHH:mm:ss
  callbackURL: string;
}