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
    return this.http.post(this.url, emp);
  }
}
