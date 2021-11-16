export class Department{
  DepartmentId: number;
  DepartmentName: string;


  constructor(obj? : any) {
    this.DepartmentId = obj.StudentId;
    this.DepartmentName = obj.StudentName;
  }
}
