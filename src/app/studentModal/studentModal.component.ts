import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Course } from '../model/course.model';
import { Department } from '../model/department.model';
import { Student } from '../model/student.model';
import { CourseService } from '../services/course.service';
import { DepartmentService } from '../services/department.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-studentModal',
  templateUrl: './studentModal.component.html',
  styleUrls: ['./studentModal.component.css']
})
export class StudentModalComponent implements OnInit {

  studentForm!: FormGroup;
  genderForm! :FormGroup;
  departments : Department[] = [];
  courses : Course[] = [];
  submitted = true;
  courseList : Course[] = [];
  students: Student[] = [];
  isEdit = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private departmentService : DepartmentService,
    private courseService : CourseService
    ) {}


  ngOnInit() {
    this.studentForm = this.fb.group({
     StudentId: [""],
     StudentName:["", Validators.required],
     ContactNo: ["", Validators.pattern("[0-9]*")],
     Address:["", Validators.required],
     DOB:[new Date(), Validators.required],
     DepartmentId :["", Validators.required],
     CourseId :["", Validators.required],
    })

  }

  get f(){
    return this.studentForm.controls
  }


  changed(value: any){
    const DepartmentId = value;
    this.courseList = this.courses.filter((x) =>  x.DepartmentId == DepartmentId);
  }

  onSubmit(){
    this.submitted = true;
    if(this.studentForm.invalid){
    return;
  }
 let StudentId = this.route.snapshot.paramMap.get('id');
 if(StudentId){
   this.isEdit = true;
  this.studentService.updateStudent(this.studentForm.value)
  .pipe(first())
  .subscribe(
    data => {
      this.router.navigate(['index']);
      this.studentForm.reset();
    },
    error => {
      alert(error);
    });
 }else{

  this.studentService.insertStudent(this.studentForm.value)
  .subscribe(data => {
    this.router.navigate(['index']);
    if(this.studentForm.status){
      this.studentForm.reset();
    }
  },
    error => {
      alert(error);
    });
}
  }


  getstudent(){
  }

  addStudent(): void {
    this.router.navigate(['app-student']);
  };

}
