import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Course } from '../model/course.model';
import { Department } from '../model/department.model';
import { CourseService } from '../services/course.service';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-courseModal',
  templateUrl: './courseModal.component.html',
  styleUrls: ['./courseModal.component.css']
})
export class CourseModalComponent implements OnInit {

  courseForm!: FormGroup;
  departments : Department[] = [];
  submitted = true;
  isEdit = false;
  courses: Course[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private courseService : CourseService,
    private dialog: MatDialog
    ) {}


  ngOnInit() {
  this.courseForm = this.fb.group({
    CourseId: [""],
    CourseName:["", Validators.required],
    Duration: ["", Validators.pattern("[0-9]*")],
    DepartmentId:["", Validators.required]
   })

 }

 get f(){
   return this.courseForm.controls
 }


 onSubmit(){
   this.submitted = true;
   if(this.courseForm.invalid){
   return;
 }
let CourseId = this.route.snapshot.paramMap.get('id');
if(CourseId){
  this.isEdit = true;
 this.courseService.updateCourse(this.courseForm.value)
 .pipe(first())
 .subscribe(
   data => {
     this.router.navigate(['index']);
     this.courseForm.reset();
   },
   error => {
     alert(error);
   });
}else{

 this.courseService.insertCourse(this.courseForm.value)
 .subscribe(data => {
   this.router.navigate(['index']);
   if(this.courseForm.status){
     this.courseForm.reset();
   }
 },
   error => {
     alert(error);
   });
}
 }
 addCourse(): void {
  this.router.navigate(['app-course']);
  };

}
