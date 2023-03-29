import { Customer } from './../models/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  title: string;
  customerForm: FormGroup;
  customer = new Customer();
  id: number;

  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.id = + this.activatedRoute.snapshot.paramMap.get('id');

    this.customerService.getById(this.id).subscribe(
      (customer: Customer) => this.displayCustomerOnForm(customer),
      (err: any) => console.log(err),
    );

    this.createForm();
  }

  createForm() {
    this.customerForm = this.fb.group({
      id: [0],
      name: [''],
      phone: ['']
    });
  }

  displayCustomerOnForm(customer: Customer): void {
    this.customerForm.reset();
    this.customer = customer;

    if (this.customer.id == 0) {
      this.title = 'Create Customer';

    } else {

      this.title = 'Edit Customer';
    }
    this.customerForm.setValue({
      id: this.customer.id,
      name: this.customer.name,
      phone: this.customer.phone
    });
  }
  Save() {
    debugger;
    const formValue = this.customerForm.value;

    if (formValue.id === 0) {
      this.customerService.create(formValue).subscribe(
        (customer: Customer) => this.onSaveComlete(),
        (err: any) => console.log(err)
      );
    } else {
      this.customerService.update(formValue).subscribe(
        (customer: Customer) => this.onSaveComlete(),
        (err: any) => console.log(err));
    }
  }

  onSaveComlete() {
    this.router.navigate(['customers']);
  }
}

