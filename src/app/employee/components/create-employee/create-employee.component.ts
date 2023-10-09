import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {EmployeeManagementService} from "../../services/employee-management.service";
import {Status} from "../../model/status.enum";
import {EmployeeDtoModel} from "../../model/employee.model";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required])
  });

  isAddMode!: boolean;
  status!: number;
  id!: string;

  constructor(private toastr: ToastrService,
              private employeeService: EmployeeManagementService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.employeeService.getEmployeeById(Number(this.id))
        .pipe(first())
        .subscribe({
          next: (value) => {
            this.form.patchValue({
              name: value.data.employee_name,
              salary: value.data.employee_salary,
              age: value.data.employee_age
            })
          },
          error: (err) => {
            this.toastr.error(err.message, "please try again")
          }
        })
    }
  }

  getFormControl(path: string) {
    return this.form.get(path)!;
  }

  private beforeSubmitForm(): boolean {
    if (this.form.invalid) {
      this.toastr.error('Please notice your fill information', 'Major Error', {
        timeOut: 300,
      });
      return false;
    } else return true;
  }

  private afterSubmitForm() {
    if (this.status == Status.badRequest) {
      this.toastr.error('Employee information is duplicate');
    } else if (!this.isAddMode) {
      this.toastr.success('Employee updated successfully');
      this.router.navigate(['/employee/employee-list'])
    } else {
      this.toastr.success('Employee created successfully');
      this.router.navigate(['/employee/employee-list'])
    }

    this.form.reset();
  }

  onSubmit() {
    if (this.beforeSubmitForm()) {
      if (!this.isAddMode) {
        this.status = this.employeeService.updateEmployee(
          Number(this.id),
          this.form.value as EmployeeDtoModel
        );
      } else {
        this.status = this.employeeService.createEmployee(
          this.form.value as EmployeeDtoModel
        );
      }

      this.afterSubmitForm();
    }
  }

}
