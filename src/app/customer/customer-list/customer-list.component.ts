import { Customer } from './../models/customer';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit  {
  title = 'Customers';
  customers : Customer[];

  constructor(private customerService: CustomerService ) {
  }

  ngOnInit(): void {
    this.customerService.getAll().subscribe(
      data => this.customers = data,
      err=> console.log(err),
    );
  }

}
