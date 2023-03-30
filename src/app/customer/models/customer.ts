import { Invoice } from "src/app/invoice/models/invoice";

export class Customer {
  id: number;
  name: string;
  phone: string;
  invoices: Invoice[];
}
