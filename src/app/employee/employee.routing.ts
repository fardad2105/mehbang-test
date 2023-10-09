import {RouterModule, Routes} from "@angular/router";
import {CreateEmployeeComponent} from "./components/create-employee/create-employee.component";
import {ListOfEmployeesComponent} from "./components/list-of-employees/list-of-employees.component";

const routes: Routes = [
  {path: '', redirectTo: 'employee-list', pathMatch: 'full'},
  {path: 'employee-list', component: ListOfEmployeesComponent},
  {path: 'create', component: CreateEmployeeComponent},
  {path: 'update/:id', component: CreateEmployeeComponent}
]


export const EmployeeRoutes = RouterModule.forChild(routes);
