import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departmentForm!: FormGroup;
  //departments : Department[] = [];
  submitted = true;
  //departmentList : Department[] = [];

  //department = [{'id':1, 'name':'IT'}, {'id':2, 'name': 'Engineering'}, {'id':3, 'name': 'Business'}];
  //department = [{'id':1, 'name':'SE'}, {'id':2, 'name': 'CSNE'}, {'id':3, 'name': 'Cyber'}];
  isEdit = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService) {}


  ngOnInit() {
    this.departmentForm = this.fb.group({
     DepartmentId: [""],
     DepartmentName:["", Validators.required]
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

}
