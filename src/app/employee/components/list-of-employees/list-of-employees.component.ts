import {Component, OnInit} from '@angular/core';
import {EmployeeModel} from "../../model/employee.model";
import {EmployeeManagementService} from "../../services/employee-management.service";
import {first} from "rxjs";

@Component({
  selector: 'app-list-of-employees',
  templateUrl: './list-of-employees.component.html',
  styleUrls: ['./list-of-employees.component.scss']
})
export class ListOfEmployeesComponent implements OnInit {

  employees: EmployeeModel[] = [];

  constructor(private employeeService: EmployeeManagementService) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees.data;
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  deleteEmployee(id: number) {
    const employee = this.employees.find(x => x.id === id);
    if (!employee) return;
    this.employeeService.deleteEmployee(id)
      .pipe(first())
      .subscribe(() => this.employees = this.employees.filter(x => x.id !== id));
  }

}
