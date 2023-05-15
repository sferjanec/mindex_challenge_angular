import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';

import {EmployeeListComponent} from './employee-list.component';
import {EmployeeService} from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input('employee') employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
let comp: EmployeeListComponent;
let fixture: ComponentFixture<EmployeeListComponent>;

describe('EmployeeListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
        GridListComponent,
        GridTileComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy}
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));

  it('should log the employee last name when handleEditEmployee is called', () => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    const employee: Employee = { 
      id: 1, 
      firstName: 'John', 
      lastName: 'Doe', 
      position: 'manager',
      directReports: [2,3], 
      compensation: 120000 
    };

    spyOn(console, 'log');
    comp.handleEditEmployee(employee);

    expect(console.log).toHaveBeenCalledWith(`editEmployee clicked: ${employee.lastName}`);
  });

  it('should log the employee last name when handleDeleteEmployee is called', () => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    const employee: Employee = { 
      id: 1, 
      firstName: 'John', 
      lastName: 'Doe', 
      position: 'manager',
      directReports: [2,3], 
      compensation: 120000 
    };

    spyOn(console, 'log');
    comp.handleDeleteEmployee(employee);

    expect(console.log).toHaveBeenCalledWith(`deleteEmployee clicked: ${employee.lastName}`);
  });


});
