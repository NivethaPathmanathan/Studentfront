import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Department } from 'src/app/model/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departmentModal',
  templateUrl: './departmentModal.component.html',
  styleUrls: ['./departmentModal.component.css']
})
export class DepartmentModalComponent implements OnInit {


  departmentForm!: FormGroup;
  submitted = true;
  isEdit = false;
  departments: Department[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService) {}


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
  addDepartment(): void {
    this.router.navigate(['app-department']);
  };

}
