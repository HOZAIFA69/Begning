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
  customer: Customer;
  id: number;

  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute) {
    this.id = + this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {


    this.customerService.getById(this.id).subscribe(
      data => this.customer = data,
      err => console.log(err),
    );

  }
}
