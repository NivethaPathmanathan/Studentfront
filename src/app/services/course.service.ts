import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Course } from '../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseurl: string = "http://localhost:60626/course";

  constructor(private http: HttpClient) { }

  getAllCourses():Observable<Course[]>{
    const url = this.baseurl + '/GetAllCourses'
    return this.http.get<Course[]>(url);
  }

  getSingleCourse(CourseId: number):Observable<Course[]> {
    return this.http.get<Course[]>(this.baseurl + '/' + CourseId);
  }

  insertCourse(course: Course) {
    const url = this.baseurl + '/InsertCourse'
    return this.http.post(url, course);
  }

  updateCourse(course: Course) {
    const url = this.baseurl + '/UpdateCourses'
    return this.http.put(url + '/' + course.CourseId, course);
  }

  deleteCourse(CourseId: number) {
    const url = this.baseurl + '/DeleteCourse'
    return this.http.delete(url + '/' + CourseId);
  }

}
