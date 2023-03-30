import { state } from './../../invoice/models/invoice';
import { Customer } from './../models/customer';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-single-view',
  templateUrl: './customer-single-view.component.html',
  styleUrls: ['./customer-single-view.component.css']
})

export class CustomerSingleViewComponent implements OnInit {
  title = 'Customer details'
  customer = new Customer();
  id: number;
  public state = state;

  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute) {
    this.id = + this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.customerService.GetCustomersIncludeInvoice(this.id).subscribe(
      (data : Customer) => this.customer = data,
      (err: any) => console.log(err),
      (onCompleted : void) => console.log(JSON.stringify(this.customer))
    );

  }
}
