import { Observable } from 'rxjs';
import { Invoice } from 'src/app/invoice/models/invoice';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = "https://localhost:7049/api/Invoices";
  constructor(private httpClient: HttpClient) { }

  create(invoice: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${this.baseUrl}`, invoice);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/Delete/${id}`);
  }
}
