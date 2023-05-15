import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

import {EmployeeComponent} from './employee.component';
import { EmployeeService } from '../services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeComponent', () => {

  let httpMock: HttpTestingController;
  let service: EmployeeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
      imports: [HttpClientModule, HttpClientTestingModule, MatDialogModule],
      providers: [
        EmployeeService,
      { provide: MatDialogRef, useValue: {} } 
    ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EmployeeService);

  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };

    expect(comp).toBeTruthy();
  }));

  xit('should load direct reports into directReports array', (done) => {
    const employee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      position: 'Manager',
      directReports: [2, 3]
    };

    const emp1 = { id: 2, firstName: 'Jane', lastName: 'Smith', position: 'Developer' };
    const emp2 = { id: 3, firstName: 'Mike', lastName: 'Johnson', position: 'Tester' };
    const reports = [emp1, emp2];

    const url = '/api/employees/';
    const urlParam = { param: 'id', value: '2' };
    const urlWithParam = `${url}?${urlParam.param}=${urlParam.value}`;
    service.get(emp1.id);

    //const req = httpMock.expectOne(urlWithParam);
    const req = httpMock.expectOne('/api/employees/2');
    req.flush(emp1);

    httpMock.verify();
  });



});
