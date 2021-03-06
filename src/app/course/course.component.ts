import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CourseModalComponent } from '../courseModal/courseModal.component';
import { Course } from '../model/course.model';
import { Department } from '../model/department.model';
import { CourseService } from '../services/course.service';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseForm!: FormGroup;
  departments : Department[] = [];
  submitted = true;
  isEdit = false;
  courses: Course[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService : DepartmentService,
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

   this.courseService.getAllCourses().subscribe(resp => {
    // this.courses = resp;
    if(resp.length > 0){
      resp.forEach(r => this.courses.push(new Course(r)))
   //  this.courses = JSON.parse(resp.toString());
    }
    console.log(this.courses)
   })

   this.courseService.getAllCourses().subscribe(data => {
    if(data.length > 0){
      data.forEach(d => this.courses.push(new Course(d)))
    }
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

 deleteCourse(courses: Course): void{
  this.courseService.deleteCourse(courses.CourseId)
  .subscribe(data => {
    this.courses = this.courses.filter(u => u !== courses);
  })
}

updateCourse(courses: Course): void{
  this.router.navigate(['app-course', courses.CourseId]);
};

addCourse(): void {
this.dialog.open(CourseModalComponent)
};

}
