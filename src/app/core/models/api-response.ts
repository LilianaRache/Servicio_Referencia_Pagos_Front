export interface ApiResponse<T> {
  responseCode: number;
  responseMessage: string;
  data: T;
}