import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  btnStudent = () =>{
    this.router.navigate(['/app-student']);
  }

  btnDepartment = () =>{
    this.router.navigate(['/app-department']);
  }


  btnCourse = () =>{
    this.router.navigate(['/app-course']);
  }

}
