import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Department } from '../model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseurl: string = "http://localhost:60626/department";

  constructor(private http: HttpClient) { }

  getAllDepartments():Observable<Department[]>{
    const url = this.baseurl + '/GetAllDepartments'
    return this.http.get<Department[]>(url);
  }

  getSingleDepartment(DepartmentId: number):Observable<Department[]> {
    return this.http.get<Department[]>(this.baseurl + '/' + DepartmentId);
  }

  insertDepartment(department: Department) {
    const url = this.baseurl + '/InsertDepartment'
    return this.http.post(url, department);
  }

  updateDepartment(department: Department) {
    const url = this.baseurl + '/UpdateDepartments'
    return this.http.put(url + '/' + department.DepartmentId, department);
  }

  deleteDepartment(DepartmentId: number) {
    const url = this.baseurl + '/DeleteDepartment'
    return this.http.delete(url + '/' + DepartmentId);
  }

}
