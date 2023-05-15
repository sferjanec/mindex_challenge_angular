import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-component',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
  message: string = ""
  cancelButtonText = "Cancel"
  mode: string;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>) {
    if (data) {
      console.log(`data: ${data.mode}`)
      this.mode = data.mode;
      this.title = data.title;
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
   // this.dialogRef.updateSize('300vw','300vw')
  }

  ngOnInit() {
    console.log('mode:',this.mode);
  }

  submitForm() {
    console.log('form submitted');
  }

  confirmDelete() {
    console.log('confirm delete clicked');
    this.dialogRef.close(true);
  }

  onConfirmClick(): void {
    console.log('onConfirmClick');
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(true);
  }


}
