import { InvoiceService } from './../../invoice/services/invoice.service';
import { state, Invoice } from './../../invoice/models/invoice';
import { Customer } from './../models/customer';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { CustomerService } from './../services/customer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-single-view',
  templateUrl: './customer-single-view.component.html',
  styleUrls: ['./customer-single-view.component.css']
})

export class CustomerSingleViewComponent implements OnInit, OnDestroy {
  title = 'Customer details'
  customer = new Customer();
  id: number;
  public state = state;
  enumKeys = [];
  invoiceForm: FormGroup;


  constructor(private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.activatedRoute.paramMap.subscribe(pram => {
      this.id = +pram.get('id')
    });

    this.enumKeys = Object.keys(this.state).filter(f => !isNaN(Number(f)));
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.customerService.GetCustomersIncludeInvoice(this.id).subscribe(
      (data: Customer) => {
        this.customer = data;
        this.createInvoiceForm(this.customer);
      },
      (err: any) => console.log(err),
      (onCompleted: void) => console.log(JSON.stringify(this.customer))
    );
  }



  createInvoiceForm(customer: Customer) {
    this.customer = customer;

    this.invoiceForm = this.fb.group({
      'customerId': [this.customer.id, [Validators.required]],
      'invoiceValue': ['', [Validators.required]],
      'state': ['', [Validators.required]],
    });
  }

  saveInvoice() {
    let formValue = this.invoiceForm.value;
    formValue.state = Number.parseInt(formValue.state);

    this.invoiceService.create(formValue).subscribe(
      (data: Invoice) => this.onSaveComlete(data.customerId),
      (err: HttpErrorResponse) => console.log(this.handleError(err)),
    );
  }

  onSaveComlete(id: number) {
    document.getElementById('closeInvoiceModal').click();
    this.ngOnInit();
  }

  deteteInvoice(id: number) {
    debugger;

    this.invoiceService.delete(id).subscribe(
      response => {
        console.log(response);
        this.toastr.success("deleted");

      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.message);

      }
    );

  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0)
      console.log(error.error);
    else
      console.error(`The backend return ${error.status} the body :${error.message}`);
  }
}
