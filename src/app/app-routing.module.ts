import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { DepartmentComponent } from './department/department.component';
import { HomeComponent } from './home/home.component';
import { DepartmentModalComponent } from './departmentModal/departmentModal.component';

const routes: Routes = [
  { path: 'app-student', component: StudentComponent },
  { path: 'app-navigation', component: NavigationComponent},
  { path: 'app-student', component: StudentComponent},
  { path: 'app-course', component: CourseComponent},
  { path: 'app-department', component: DepartmentComponent},
  { path: '', component: HomeComponent},
  { path: 'app-departmentModal', component: DepartmentModalComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
