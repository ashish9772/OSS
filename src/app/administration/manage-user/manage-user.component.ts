import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  cols: any[];
  users: any[] = [];
  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'EIN', header: 'EIN' },
      { field: 'Full_Name', header: 'Full Name' },
      { field: 'Profile_Name', header: 'Profile Name' },
      { field: 'User_Id', header: 'User Id' }
    ];

    this.users = [{ EIN: '612656312', Full_Name: 'Mukesh', Profile_Name: 'Manager', User_Id: '123' },
    { EIN: '612600555', Full_Name: 'Ashish', Profile_Name: 'Developer', User_Id: '124' },
    { EIN: '362564545', Full_Name: 'Naman', Profile_Name: 'Developer', User_Id: '125' },
    { EIN: '612656312', Full_Name: 'Surendra', Profile_Name: 'Team Lead', User_Id: '126' }];
  }

}
