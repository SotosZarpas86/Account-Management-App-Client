import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from '../../services/accountService'
import { Account } from 'src/app/models/account';
import { MatDialog } from '@angular/material/dialog';
import { AccountAddComponent } from '../account-add/account-add.component';
import { PageEvent } from '@angular/material/paginator';
import { AuthenticationGuardService } from 'src/app/services/authenticationGuardService';
import { AuthenticationService } from 'src/app/services/authenticationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  title = 'List of Accounts';

  displayedColumns: string[] = ['AccountNo', 'CreatedAt', 'Amount'];
  columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  dataSource = new MatTableDataSource<Account>();

  length: number = 0;
  pageSize: number = 10;
  pageEvent: PageEvent | undefined;

  constructor(private accountService: AccountService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.GetAccountsList(1, this.pageSize);
  }

  public getMore(event: PageEvent) {
    this.GetAccountsList(event.pageIndex + 1, event.pageSize);
    return event;
  }

  public GetAccountsList(pageIndex: number, pageSize: number) {
    this.accountService.getAllWithPaging(pageIndex, pageSize)
      .subscribe(
        (response) => {
          this.dataSource.data = response.Data;
          this.length = response.SumOfRecords;
        },
        (error) => {
          console.log(error);
        })
  }

  add() {
    const dialogRef = this.dialog.open(AccountAddComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.add(result)
          .subscribe(
            (response) => {
              // const data = this.dataSource.data;
              // data.push(response.Data);
              // this.dataSource.data = data;
              this.GetAccountsList(1, this.pageSize);
            },
            (error) => {
              console.log(error);
            })
      }
    });
  }

  edit(data: Account) {
    const dialogRef = this.dialog.open(AccountAddComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.edit(result.Id, result)
          .subscribe(
            (response) => {
              const data = this.dataSource.data;
              data.map((account, i) => {
                if (account.Id == response.Data.Id) {
                  data[i] = response.Data;
                }
              });
              this.dataSource.data = data;
            },
            (error) => {
              console.log(error);
            })
      }
    });
  }

  delete(Id: any) {
    this.accountService.remove(Id)
      .subscribe(
        (response) => {
          const data = this.dataSource.data;
          data.forEach((element, index) => {
            if (element.Id === response.Data) {
              data.splice(index, 1);
            }
          });
          this.dataSource.data = data;
        },
        (error) => {
          console.log(error);
        })
  }

  logout() {
    this.authenticationService.logOut();
    this.router.navigate(["/login"]);
  }
}
