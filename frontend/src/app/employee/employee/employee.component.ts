import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/appModels/empployee.model';
import { EmployeeService } from '../../appServices/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empForm!: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  employees: Employee[] = [];

  constructor(private fb: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployee();
    this.empForm = this.fb.group({
      _id: [''],
      name: ['Ex. Alex Johnson', Validators.required],
      position: ['Ex. Full Stack Developer', Validators.required],
      dept: ['Development']      
    });
  }
  onEmpSubmit() {
    if (this.empForm.valid) {
      console.log('Form Data' + this.empForm.value);
      this.empService.addEmployee(this.empForm.value).subscribe((res) => {
        this.getEmployee();
      },
      (err) => {
        console.log(err);
      });
    }
  }
  onAddEmployee() {
    this.showModal = true;
  }
  onCloseModal() {
    this.showModal = false;
  }
  getEmployee() {
    this.empService.getEmployeeList().subscribe((res) => {
      this.employees = res;
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
  onDeleteEmployee(emp: Employee) {
    if (confirm(`Do you want to delete employee ${emp.name}?`)) {
      this.empService.deleteEmployee(emp._id).subscribe((res) => {
        this.getEmployee();
      }, (err) => {
        console.log(err);
      });
    }
  }

}
