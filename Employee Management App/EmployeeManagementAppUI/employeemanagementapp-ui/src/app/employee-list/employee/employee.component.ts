import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Department } from 'src/app/models/ui-models/department.model';
import { Employee } from 'src/app/models/ui-models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from '../employee.service';
import {Title} from "@angular/platform-browser";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  employeeId: string | null | undefined;
  employee: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    departmentId: '',
    profileImageURL: '',
    department: {
      departmentId: '',
      departmentName: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  departmentList: Department[] = [];
  isNewEmployee = false;
  isSingleView = false;
  isEdit = false;
  header = '';
  imageUrl = '';
  mobileText = '';
  isValid = false;

  @ViewChild('employeeInfoForm') employeeInfoForm?: NgForm;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly departmentService: DepartmentService,
    private snackbar: MatSnackBar,
    private router: Router,
    private titleService:Title) { }

  ngOnInit(): void {
    let routePath =''
    if (this.route.snapshot.url.length === 3) {
      routePath = this.route.snapshot.url[1].path.toString();
    }
    this.route.paramMap.subscribe(
      (params) => {
        this.employeeId = params.get('id');
        //fetch a single employee
        if (this.employeeId) {
          //determine which screen to display depending on route
          if(this.employeeId.toLowerCase() === 'Add'.toLowerCase() && !this.isSingleView) {
            //add new employee screen
            this.isNewEmployee = true;
            this.header = 'Add New Employee';
            this.titleService.setTitle("Add New Employee");
            this.setImage();

          } else if (routePath === 'View'.toLowerCase() && !this.isNewEmployee) {
            this.isSingleView = true;
            this.header = 'SINGLE VIEW';
            this.employeeService.getSingleEmployee(this.employeeId)
            .subscribe(
              (response) => {
                this.employee = response;
                this.titleService.setTitle("View - " + this.employee.firstName + " " + this.employee.lastName);
                this.setImage();
              }
            )
          }
          else {
            //editing employee screen
            this.isNewEmployee = false;
            this.isEdit = true;
            this.header = 'Edit Employee';
            this.employeeService.getEmployee(this.employeeId)
            .subscribe(
              (response) => {
                this.employee = response;
                this.titleService.setTitle("Edit - " + this.employee.firstName + " " + this.employee.lastName);
              }
            );
          }
          this.departmentService.getDepartmentList()
            .subscribe(
              (response) => {
                this.departmentList = response;
                this.setImage();
              },
            )
        }
      }
    );
  }

  onUpdate(): void {
    //calling method from employee service to update employee
    if (this.employeeInfoForm?.form.valid) {
      this.employeeService.updateEmployee(this.employee.id, this.employee)
      .subscribe(
        (response) => {
          this.snackbar.open('Employee successfully updated', undefined, {
            duration: 5000
          });
        }
      );
      setTimeout(() => {
        this.router.navigateByUrl('employees');
      }, 1000);
    }
  }

  onDelete(): void {
    //calling method from employee service to update employee
    this.employeeService.deleteEmployee(this.employee.id)
      .subscribe(
        (response) => {
          this.snackbar.open('Employee successfully deleted', undefined, {
            duration: 5000
          })
        }
      );
      setTimeout(() => {
        this.router.navigateByUrl('employees');
      }, 1000);
  }

  onAdd(): void {
    if (this.employeeInfoForm?.form.valid) {
      this.employee.mobile = Number(this.mobileText);
      this.employeeService.addEmployee(this.employee)
        .subscribe(
          (response) => {
            this.snackbar.open('Employee successfully added', undefined, {
              duration: 5000
            });
          this.router.navigateByUrl(`employees`);
          }
        );
    }
  }

  uploadImage(event: any): void {
    if(this.employeeId) {
      const file: File = event.target.files[0];
      this.employeeService.uploadImage(this.employee.id, file)
        .subscribe(
          (response) => {
            this.employee.profileImageURL = response;
            this.setImage();

            this.snackbar.open('Profile image successfully updated', undefined, {
              duration: 5000
            });
          }
        );
    }
  }

  private setImage(): void {
    if (this.employee.profileImageURL) {
      //fetch image by url to display on screen
      this.imageUrl = this.employeeService.getImagePath(this.employee.profileImageURL);
    } else {
      //display default image
      this.imageUrl = '/assets/defaultImage.png';
    }
  }

}
