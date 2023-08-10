import { EMPTY, Observable, catchError } from 'rxjs';
import { Customer } from './../models/customer';
import { CustomerService } from './../services/customer.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  changeDetection : ChangeDetectionStrategy.Default
})
export class CustomerListComponent implements OnInit {
  title = 'Customers';
  customers$: Observable<Customer[]>;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customers$ = this.customerService.getAll().pipe(
      catchError(err => {
        console.error(err);
        return EMPTY;
      }));
  }

}
