import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfEmployeesComponent } from './components/list-of-employees/list-of-employees.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import {EmployeeRoutes} from "./employee.routing";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {BootstrapInputFeedbackDirective} from "./directives/bootstrap-input-feedback.directive";
import {BootstrapInputValidationDirective} from "./directives/bootstrap-input-validation.directive";



@NgModule({
  declarations: [
    ListOfEmployeesComponent,
    CreateEmployeeComponent,
    BootstrapInputFeedbackDirective,
    BootstrapInputValidationDirective
  ],
    imports: [
        CommonModule,
        RouterModule,
        EmployeeRoutes,
        ReactiveFormsModule
    ]
})
export class EmployeeModule { }
