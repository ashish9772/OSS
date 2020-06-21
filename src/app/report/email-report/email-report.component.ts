import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-email-report',
  templateUrl: './email-report.component.html',
  styleUrls: ['./email-report.component.scss']
})
export class EmailReportComponent implements OnInit {

  addCCMailList = false;
  projectData: any;
  projectId = '';
  projectName = '';
  sendEmail = false;
  hideProjSelect = false;
  @ViewChild('projtId') projId : ElementRef;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.projectData$.subscribe((res) => {
      console.log("res management : ", res);
      this.projectData = res;
      console.log(this.projectData)
    })
  }

  onChange() {
    this.sendEmail = true;
    this.hideProjSelect = true;
    this.projId.nativeElement.blur();
    this.projectData.forEach(element => {
      if (this.projectId === element.projectID) {
        this.projectName = element.projectName;
      }
    });
  }

  onFocus() {
    this.projectId= '';
    this.sendEmail = false;
  }
  onDownload() {
    
  }
onCancel(){
  this.projectId= '';
  this.hideProjSelect = false;
  this.sendEmail = false;
  this.addCCMailList= false;
}
onValueChange(event){
  console.log("event data :",event)
}
addCCEmailList(check){
  console.log("check")
  this.addCCMailList = check;
}
}
