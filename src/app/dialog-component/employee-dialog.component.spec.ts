import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDialogComponent } from './employee-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogComponentComponent', () => {
  let component: EmployeeDialogComponent;
  let fixture: ComponentFixture<EmployeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
        { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the edit form dialog', () => {
    component.mode = 'edit';
    component.title = 'Edit Employee Compensation';
  
    fixture.detectChanges();
    const dialogTitle = fixture.nativeElement.querySelector('h3').textContent;
    const formField = fixture.nativeElement.querySelector('input');
  
    expect(dialogTitle).toContain('Edit Employee Compensation');
    expect(formField).toBeTruthy();
  });

});
