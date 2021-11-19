import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { StudentComponent } from './student/student.component';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CourseComponent } from './course/course.component';
import { DepartmentComponent } from './department/department.component';
import { HomeComponent } from './home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DepartmentModalComponent } from './departmentModal/departmentModal.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    StudentComponent,
    CourseComponent,
    DepartmentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    BsDatepickerModule.forRoot(),
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DepartmentModalComponent]
})
export class AppModule { }
