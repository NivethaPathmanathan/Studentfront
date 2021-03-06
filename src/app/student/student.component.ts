import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Course } from '../model/course.model';
import { Department } from '../model/department.model';
import { Student } from '../model/student.model';
import { CourseService } from '../services/course.service';
import { DepartmentService } from '../services/department.service';
import { StudentService } from '../services/student.service';
import { StudentModalComponent } from '../studentModal/studentModal.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentForm!: FormGroup;
  genderForm! :FormGroup;
  departments : Department[] = [];
  courses : Course[] = [];
  submitted = true;
  courseList : Course[] = [];
  students: Student[] = [];

  //department = [{'id':1, 'name':'IT'}, {'id':2, 'name': 'Engineering'}, {'id':3, 'name': 'Business'}];
  //course = [{'id':1, 'name':'SE'}, {'id':2, 'name': 'CSNE'}, {'id':3, 'name': 'Cyber'}];
  isEdit = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private departmentService : DepartmentService,
    private courseService : CourseService,
    private dialog : MatDialog
    ) {}


  ngOnInit() {
    this.studentForm = this.fb.group({
     StudentId: [""],
     StudentName:["", Validators.required],
     ContactNo: ["", Validators.pattern("[0-9]*")],
     Address:["", Validators.required],
     DOB:[new Date(), Validators.required],

    //  this.genderForm = this.fb.group({
    //   gender: ["", Validators.required]
    // }),
    	DepartmentId :["", Validators.required],
    	CourseId :["", Validators.required],
    })

    this.departmentService.getAllDepartments().subscribe(resp => {
      this.departments = resp;
      console.log(this.departments);
    })

    this.courseService.getAllCourses().subscribe(resp => {
     // this.courses = resp;
     if(resp.length > 0){
       resp.forEach(r => this.courses.push(new Course(r)))
    //  this.courses = JSON.parse(resp.toString());
     }
     console.log(this.courses)
    })


    this.studentService.getAllStudents().subscribe(data => {
      if(data.length > 0){
        data.forEach(d => this.students.push(new Student(d)))
      }
    })

    this.courseService.getAllCourses().subscribe(data => {
      if(data.length > 0){
        data.forEach(d => this.courses.push(new Course(d)))
      }
    })

    this.departmentService.getAllDepartments().subscribe(data => {
      if(data.length > 0){
      this.departments = data;
      }
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

  deleteStudent(students: Student): void {
    this.studentService.deleteStudent(students.StudentId)
      .subscribe(data => {
        this.students = this.students.filter(u => u !== students);
      })
  };


  updateStudent(students: Student): void {
    this.router.navigate(['app-student', students.StudentId]);

  };

  addStudent(): void {
    this.dialog.open(StudentModalComponent)
  };

}
