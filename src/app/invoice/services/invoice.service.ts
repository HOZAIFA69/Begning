import { Invoice } from 'src/app/invoice/models/invoice';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/dataService';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService extends DataService<Invoice> {

  constructor(httpClient: HttpClient) { super(httpClient, "https://localhost:7049/api/Invoices") }
}

