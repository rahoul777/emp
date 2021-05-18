import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../appModels/empployee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = '/api/v1/employees';
  constructor(public http: HttpClient) { }

  addEmployee(emp: Employee) {
    return this.http.post<Employee[]>(this.url, emp);
  }
  getEmployeeList() {
    return this.http.get<Employee[]>(this.url);
  }
  deleteEmployee(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
  updateEmployee(emp: Employee) {
    return this.http.put<Employee[]>(`${this.url}/${emp._id}`, emp);
  }
}
