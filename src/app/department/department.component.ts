import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { DepartmentModalComponent } from '../departmentModal/departmentModal.component';
import { Department } from '../model/department.model';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departmentForm!: FormGroup;
  submitted = true;
  isEdit = false;
  departments: Department[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private dialog: MatDialog ) {}


  ngOnInit() {
    this.departmentForm = this.fb.group({
     DepartmentId: [""],
     DepartmentName:["", Validators.required]
    })

    this.departmentService.getAllDepartments().subscribe(data => {
      if(data.length > 0){
      this.departments = data;
      }
    })
  }

  get f(){
    return this.departmentForm.controls
  }

  onSubmit(){
    this.submitted = true;
    if(this.departmentForm.invalid){
    return;
  }
 let DepartmentId = this.route.snapshot.paramMap.get('id');
 if(DepartmentId){
   this.isEdit = true;
  this.departmentService.updateDepartment(this.departmentForm.value)
  .pipe(first())
  .subscribe(
    data => {
      this.router.navigate(['index']);
      this.departmentForm.reset();
    },
    error => {
      alert(error);
    });
 }else{

  this.departmentService.insertDepartment(this.departmentForm.value)
  .subscribe(data => {
    this.router.navigate(['index']);
    if(this.departmentForm.status){
      this.departmentForm.reset();
    }
  },
    error => {
      alert(error);
    });
}
  }

  deleteDepartment(departments: Department): void{
    this.departmentService.deleteDepartment(departments.DepartmentId)
    .subscribe(data => {
      this.departments = this.departments.filter(u => u !== departments);
    })
  }

  updateDepartment(departments: Department): void{
    this.router.navigate(['app-department', departments.DepartmentId])
  };

  addDepartment() {
    this.dialog.open(DepartmentModalComponent)
  };

}
