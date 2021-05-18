import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(): void {
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
        console.log(res);
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

}
