import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss']
})
export class DownloadReportComponent implements OnInit {

  projectData: any;
  projectId = '';
  projectName = '';
  showDownload = false;
  @ViewChild('projtId') projId : ElementRef;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // debugger
    this.apiService.projectData$.subscribe((res) => {
      console.log("res management : ", res);
      this.projectData = res;
      console.log(this.projectData)
    })

    // this.apiService.getProjectId(environment.api_url + 'project/config').subscribe((res) => {
    //   console.log("res management : ", res);
    //   this.projectData = res;
    //   console.log(this.projectData)
    // });
  }

  onChange() {
    this.showDownload = true;
    this.projId.nativeElement.blur();
    this.projectData.forEach(element => {
      if (this.projectId === element.projectID) {
        this.projectName = element.projectName;
      }
    });
  }
  downloadFile() {
    // console.log('file ID', value);
   
   this.apiService.downloadFile("http://10.54.156.153:61001/oss/report/download/" + this.projectId);
  }
  onFocus() {
    this.projectId= '';
    this.showDownload = false;
  }

  myFunction(){
    console.log("changes")
  }

}
