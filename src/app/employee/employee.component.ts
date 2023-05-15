import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { mergeMap, toArray } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

import {  MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../dialog-component/employee-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() editEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() deleteEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();
  employees: Employee[] = [];
  totalReports: number = 0;
  directReports: Employee[] = [];
  

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {    
  }

  ngOnInit() {
    this.countReports(this.employee);
    this.getDirectReports(this.employee);
  }
  
  countReports(employee: Employee) {
    if(employee.directReports) {
      this.totalReports += employee.directReports.length;
      console.log(this.totalReports);

      employee.directReports.forEach(id => {
        console.log(`id: ${id}, for employee ${employee}`)
        this.employeeService.get(id).subscribe(emp => {
          if (emp.directReports) {
            console.log(`direct report: ${emp}`)
            this.countReports(emp);
          }
        });
      });
    }
  }

  getDirectReports(employee: Employee) {
    if(employee.directReports) {
      this.directReports = [];
      forkJoin(
        employee.directReports.map(id => 
          this.employeeService.get(id)))
      .pipe(
        mergeMap(reports => reports), toArray()
      )
      .subscribe(reports => {
        console.log('reports feeding array: ',reports);
        this.directReports = reports;
        console.log('loaded into directReports',this.directReports);
      });
    }
  }

  editReport(emp: Employee) {
    this.editEmployee.emit(emp);
    this.openDialog('edit', 'Edit Employee Compensation', emp);

  }
  
  deleteReport(emp: Employee) {
    this.deleteEmployee.emit(emp);
    this.openDialog('delete', 'Delete Employee', emp);
  }

  openDialog(mode:string, title: string, employee: Employee) {
      console.log(`In openDialog: ${employee.id} ${mode}`)
     const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: { mode, title, employee }
  
     });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmDelete') {
        this.deleteEmployee.emit(this.employee);
      } else if (result === 'saveCompensation') {
        // Handle the saveCompensation event
        this.editEmployee.emit(this.employee);
      }
    });
  }

}
