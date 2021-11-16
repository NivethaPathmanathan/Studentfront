import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseurl: string = "http://localhost:60626/student";

  constructor(private http: HttpClient) { }

  getAllStudents():Observable<Student[]>{
    const url = this.baseurl + '/GetAllStudents'
    return this.http.get<Student[]>(url);
  }

  getSingleStudent(StudentId: number):Observable<Student[]> {
    return this.http.get<Student[]>(this.baseurl + '/' + StudentId);
  }

  insertStudent(student: Student) {
    const url = this.baseurl + '/InsertStudent'
    return this.http.post(url, student);
  }

  updateStudent(student: Student) {
    const url = this.baseurl + '/UpdateStudents'
    return this.http.put(url + '/' + student.StudentId, student);
  }

  deleteStudent(StudentId: number) {
    const url = this.baseurl + '/DeleteStudent'
    return this.http.delete(url + '/' + StudentId);
  }

}
