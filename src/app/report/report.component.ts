import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.apiService.shareProjectData();
  }

}
