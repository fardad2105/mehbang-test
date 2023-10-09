import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EmployeeModel} from "../model/employee.model";
import {environment} from "../../../environments/environment";
import {shareReplay} from "rxjs";
import {Status} from "../model/status.enum";

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {

  constructor(private httpClient: HttpClient) {
  }

  getEmployees() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/employees`)
      .pipe(shareReplay())
  }

  getEmployeeById(id: number) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/employee/${id}`)
      .pipe(shareReplay())
  }

  createEmployee(employee: {name: string, salary: string, age: string}) {
    let isAdded =  this.httpClient.post(`${environment.apiUrl}/create`, employee);
    return isAdded ? Status.success : Status.badRequest;
  }

  updateEmployee(id: number, newEmployee: {name: string, salary: string, age: string}) {
    let isUpdated =  this.httpClient.put(`${environment.apiUrl}/update/${id}`, newEmployee);
    return isUpdated ? Status.success : Status.badRequest;
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete(`${environment}/delete/${id}`);
  }
}
