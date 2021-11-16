export class Course{
  CourseId: number;
  CourseName: string;
  Duration: number;
  DepartmentId: number;
  DepartmentName: string;


  constructor(obj? : any) {
    this.CourseId = obj.CourseId;
    this.CourseName = obj.CourseName;
    this.Duration = obj.Duration;
    this.DepartmentId = obj.DepartmentId
    this.DepartmentName = obj.Department.DepartmentName;
  }
}
