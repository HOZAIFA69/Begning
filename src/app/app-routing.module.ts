import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerSingleViewComponent } from './customer/customer-single-view/customer-single-view.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'customers'
  },
  {
    path: 'customers', component: CustomerListComponent
  },
  {
    path: 'customer/details/:id', component: CustomerSingleViewComponent
  },
  {
    path: 'customer/edit/:id', component: CustomerFormComponent
  },
  {
    path: 'customer/create/:id', component: CustomerFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
