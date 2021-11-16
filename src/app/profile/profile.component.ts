import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../model/course.model';
import { Department } from '../model/department.model';
import { Student } from '../model/student.model';
import { CourseService } from '../services/course.service';
import { DepartmentService } from '../services/department.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // private _allSdnt: Observable<Student[]>;
  // public get allSdnt(): Observable<Student[]> {
  //   return this._allSdnt;
  // }

  // public set allSdnt(value: Observable<Student[]>) {
  //   this._allSdnt = value;
  // }
  students: Student[] = [];
  courses: Course[] = [];
  departments: Department[] = [];
  constructor(private router: Router,
   private studentService: StudentService,
   private courseService: CourseService,
   private departmentService: DepartmentService) {

      }

  // loadDisplay(){
  //   this.allSdnt = this.studentService.getAllStudents();
  // }

  ngOnInit() {
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

  getstudent(){
  }

  deleteStudent(students: Student): void {
    this.studentService.deleteStudent(students.StudentId)
      .subscribe(data => {
        this.students = this.students.filter(u => u !== students);
      })
  };

  deleteCourse(courses: Course): void{
    this.courseService.deleteCourse(courses.CourseId)
    .subscribe(data => {
      this.courses = this.courses.filter(u => u !== courses);
    })
  }

  deleteDepartment(departments: Department): void{
    this.departmentService.deleteDepartment(departments.DepartmentId)
    .subscribe(data => {
      this.departments = this.departments.filter(u => u !== departments);
    })
  }


  updateStudent(students: Student): void {
    this.router.navigate(['app-student', students.StudentId]);

  };

  updateCourse(courses: Course): void{
    this.router.navigate(['app-course', courses.CourseId]);
  };

  updateDepartment(departments: Department): void{
    this.router.navigate(['app-department', departments.DepartmentId])
  };

}
