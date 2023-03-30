export class Invoice {
  id: number;
  customerId: number;
  invoiceValue: number;
  invoiceDate: Date;
  state: state
}

export enum state {
  Paid = 0,
  Pending = 1,
}
