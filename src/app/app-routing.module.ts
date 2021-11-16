import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'app-navigation', component: NavigationComponent},
  { path: 'app-dashboard', component: DashboardComponent},
  { path: 'app-student', component: StudentComponent},
  { path: 'app-course', component: CourseComponent},
  { path: 'app-department', component: DepartmentComponent}

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
