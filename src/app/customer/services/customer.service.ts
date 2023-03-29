import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = "https://localhost:7049/api/Customers";

  constructor(private HttpClient: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.HttpClient.get<Customer[]>(`${this.baseUrl}/GetAll`);
  }

  getById(id: number): Observable<Customer> {
    if (id === 0)
      return of(this.intiCustomer());
    else
      return this.HttpClient.get<Customer>(`${this.baseUrl}/GetById/${id}`);
  }
  create(customer: Customer) : Observable<Customer>{
   return this.HttpClient.post<Customer>(`${this.baseUrl}/add`,customer);
  }

  update(customer: Customer) : Observable<Customer>  {
   return  this.HttpClient.put<Customer>(`${this.baseUrl}/Update/${customer.id}`, customer);
  }

  delete(id: number) {
    this.HttpClient.delete(`${this.baseUrl}/Delete/${id}`);
  }
  private intiCustomer(): Customer {
    return {
      id: 0,
      name: '',
      phone: '',
    }
  }
}
