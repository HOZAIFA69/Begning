import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer';
import { DataService } from 'src/app/services/dataService';

@Injectable({
  providedIn: 'root'
})

export class CustomerService extends DataService<Customer> {


  constructor(httpClient: HttpClient) {
    super(httpClient, "https://localhost:7049/api/Customers")
  }

  GetCustomersIncludeInvoice(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.apiUrl}/GetCustomersIncludeInvoice/${id}`);
  }
}

































