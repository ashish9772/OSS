import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from '../../shared/api.service';
import { TaskDetailsServiceService } from '../task-details-service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-project-documents',
  templateUrl: './project-documents.component.html',
  styleUrls: ['./project-documents.component.scss']
})
export class ProjectDocumentsComponent implements OnInit {
  taskProjectName: string;
  fileToUpload: File = null;
  disableButton = true;
  uploadFileName: string = '';
  projectDocuments: FormGroup;
  taskProjectID: any;
  date = new Date();
  month = this.date.getUTCMonth() + 1;
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();
  modalReference: any;
  formData = new FormData();
  fileDetails: any = {};
  uploadedFiles: any[] = [];
  extension: any;
  fileNamepath: any;
  NoteMSG: string = '';
  fileUploadDetails: any = [];
  fledecshow = false;
  hideFizeSize = false;
  filesizemsg: string = '';
  //uploadFileName: any;
  constructor(config: NgbModalConfig, private modalService: NgbModal, private apiservice: ApiService, private taskService: TaskDetailsServiceService, private spinner: NgxSpinnerService) { }
  // myUploader(event) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  //   console.log('upload file', this.uploadedFiles);
  // }
  ngOnInit() {
    this.projectDocuments = new FormGroup({
      description: new FormControl(''),
      uploadFile: new FormControl('')
    });
    this.taskService.taskPrjectI$.subscribe(data => {
      this.taskProjectID = data;
      console.log('dataTest', this.taskProjectID);
    });
    this.taskService.taskProjectName$.subscribe(data => {
      this.taskProjectName = data;
      console.log('task project Name', this.taskProjectName);
    });
    // this.apiservice.getValue(environment.api_url + 'project-util/file-details/' + this.taskProjectID).subscribe(data => {
    //   this.fileUploadDetails = data;
    //   console.log('get file', this.fileUploadDetails);
    // })
    this.taskService.addProjectDocument$.subscribe(data => {
      this.fileUploadDetails = data;
    });
  }
  openCreateTask(content) {
    this.modalReference = this.modalService.open(content);
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
  }
  uploadDocuments(files: FileList) {
    this.fileToUpload = files.item(0);
    let totalSize = this.fileToUpload.size;
    let totalSizeMB = totalSize / Math.pow(1024, 2);
    console.log(totalSizeMB, 'totalSize')
    if (totalSizeMB < 25) {
      this.hideFizeSize = false;
      this.filesizemsg = '';
      this.formData.append('file', this.fileToUpload);
      this.fileNamepath = this.fileToUpload.name;
      this.extension = this.fileToUpload.type;
      this.uploadFileName = this.fileToUpload.name;
      this.disableButton = false;
      this.fledecshow = true;
    } else {
      this.hideFizeSize = true;
      this.filesizemsg = 'File size exceeds maximum limit 25 MB.';
    }
  }


  downloadFile(value) {
    console.log('file ID', value);
    window.location.href = "http://10.54.156.153:61001/oss/project-util/download/" + value;
  }
  remoevFile(value) {
    this.spinner.show();
    this.apiservice.deleteFile(environment.api_url + 'project-util/file-delete/' + value).subscribe(data => {
      this.apiservice.getValue(environment.api_url + 'project-util/file-details/' + this.taskProjectID).subscribe(data => {
        this.fileUploadDetails = data;
        this.taskService.addProjectDocument.next(data);
        console.log('get file', this.fileUploadDetails);
      }, err => {
        this.spinner.hide();
      });
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }
  submitDocuments() {
    this.spinner.show();
    this.fileDetails = {
      fileName: this.fileNamepath,
      fileType: this.extension,
      createdBy: localStorage.getItem('EINVALUE'),
      createdDate: this.today,
      projectId: this.taskProjectID,
      projectName : this.taskProjectName,
      description: this.projectDocuments.controls['description'].value
    }
    this.apiservice.importSurvetSheet(this.formData, this.fileDetails).subscribe(
      (importRes) => {
        this.NoteMSG = 'FILE UPLOADED SUCCESSFULLY'
        this.projectDocuments.reset();
        this.disableButton = true;
        this.uploadFileName = '';
        this.fledecshow = false;
        console.log('importRes', importRes);
        setTimeout(() => {
          this.NoteMSG = '';
        }, 3000);
        this.apiservice.getValue(environment.api_url + 'project-util/file-details/' + this.taskProjectID).subscribe(data => {
          this.fileUploadDetails = data;
          this.taskService.addProjectDocument.next(data);
          console.log('get file', this.fileUploadDetails);
          this.spinner.hide();
        }, err =>{
          this.spinner.hide();
        })
      }, err =>{
        this.spinner.hide();
      }
    );
  }
}
