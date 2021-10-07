import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent {
  formInstance: FormGroup;

  isDatePickerReadonly: boolean = false;

  constructor(public dialogRef: MatDialogRef<AccountAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account) {
    this.formInstance = new FormGroup({
      "Id": new FormControl(''),
      "UserId": new FormControl(''),
      "AccountNo": new FormControl('', Validators.required),
      "CreatedAt": new FormControl(new Date(), Validators.required),
      "Amount": new FormControl('', Validators.required)
    });

    if (data !== null) {
      this.formInstance.setValue(data);
      this.isDatePickerReadonly = true;
    }

  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(this.formInstance.value);
  }
}
