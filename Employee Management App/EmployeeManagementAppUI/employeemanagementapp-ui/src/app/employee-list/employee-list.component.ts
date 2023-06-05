import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../models/ui-models/employee.model';
import { EmployeeService } from './employee.service';
import {Title} from "@angular/platform-browser";
import {FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['firstName',
                                'lastName',
                                'dateOfBirth',
                                'email',
                                'mobile',
                                'department',
                                'edit'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = "";
  isNotAuthorized = true;
  newUser = true;
  isAuthorized = false;
  hide = true;
  loginEmail = '';
  loginPassword ='';
  //@Output() authorizeStart = new EventEmitter<boolean>();

  constructor(private employeeService: EmployeeService, private titleService:Title,
    private snackbar: MatSnackBar) {
    this.titleService.setTitle("Employee Management App")
  }

  @ViewChild('loginForm') loginForm?: NgForm;


  ngOnInit(): void {
    //Fetching employees
    this.employeeService.getEmployees()
      .subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);

        if(this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }

          this.dataSource.sort = this.matSort;
      }
    );
  }

  filterEmployees() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

  onAuthorize() {
    this.newUser = false;
    this.isNotAuthorized = false;
    console.log("isAuthorized: " + this.isAuthorized);
    console.log("isNotAuthorized: " + this.isNotAuthorized);

  }
  onLogin(){
    this.newUser = true;
    this.isAuthorized = true;
    this.isNotAuthorized = true;
    this.snackbar.open('You are now logged in.', undefined, {
      duration: 2000
    });
  }

  isValid() {
    return this.loginForm?.form.valid
  }



}
