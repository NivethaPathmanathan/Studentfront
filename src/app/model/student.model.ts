export class Student{
  StudentId: number;
  StudentName: string;
  ContactNo: number;
  DOB: Date;
  Gender: string;
  Address: string;
  DepartmentName : string;
  CourseName : string;


  constructor(obj? : any) {
    this.StudentId = obj.StudentId;
    this.StudentName = obj.StudentName;
    this.ContactNo = obj.ContactNo;
    this.DOB = obj.DOB;
    this.Gender = obj.Gender;
    this.Address = obj.Address;
    this.DepartmentName = obj.Department.DepartmentName;
    this.CourseName = obj.Course.CourseName;
  }
}
