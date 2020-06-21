import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  cols: any[];
  profiles: any[] = [];
  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'Id', header: 'Id' },
      { field: 'Profile_Name', header: 'Profile Name' },
      { field: 'created_on', header: 'Created On' },
      { field: 'modified_on', header: 'Modified On' }
    ];

    this.profiles = [{ Id: '123', Profile_Name: 'Admin', created_on: new Date(), modified_on: new Date()},
    { Id: '124', Profile_Name: 'Manager', created_on: new Date(), modified_on: new Date()},
    { Id: '125', Profile_Name: 'Developer', created_on: new Date(), modified_on: new Date()},
    { Id: '126', Profile_Name: 'Team Lead', created_on: new Date(), modified_on: new Date() }];
  }

}
