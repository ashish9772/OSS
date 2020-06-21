import { MemberdashHighpriorityComponent } from './../../resourse-details/memberdash-highpriority/memberdash-highpriority.component';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { TaskDetailsServiceService } from '../task-details-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  taskProjectName: string;
  addNoteForm: FormGroup;
  NoteMSG;
  modalReference;
  notesData: any = [];
  taskProjectID:any;

  date = new Date();
  month = this.date.getUTCMonth() + 1;
  today = this.date.getUTCDate() + '/' + this.month + '/' + this.date.getUTCFullYear();
  constructor(private ApiService: ApiService, private taskService: TaskDetailsServiceService,private spinner: NgxSpinnerService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show()
    this.addNoteForm = new FormGroup({
      date: new FormControl(this.today, Validators.required),
      noteType: new FormControl('', Validators.required),      
      note: new FormControl('', Validators.required)
    });
    this.taskService.notes$.subscribe(data => {
      this.notesData = data;
    });
    this.taskService.taskPrjectI$.subscribe(data =>{
      this.taskProjectID = data;
      console.log('dataTest', this.taskProjectID)
    });
    this.taskService.taskProjectName$.subscribe(data => {
      this.taskProjectName = data;
      console.log('task project Name', this.taskProjectName);
    });
    this.spinner.hide()
  }

  openCreateTask(content) {
    this.modalReference = this.modalService.open(content);
    // this.newtaskcreate.controls['projectID'].setValue(this.taskService.taskPrjectID);
  }

  submitNote() {
    this.spinner.show()
    this.NoteMSG = '';
    const data = {
      projectID: this.taskProjectID,
      projectName : this.taskProjectName,
      notes: this.addNoteForm.controls['note'].value,
      createdBy: localStorage.getItem('EINVALUE'),
      assignName : this.taskService.getNameByEIN(localStorage.getItem('EINVALUE')),
      createdDate: this.addNoteForm.controls['date'].value,
      type: this.addNoteForm.controls['noteType'].value,
      projectNoteId: null
    }
    this.ApiService.postNote(environment.api_url + 'project-util/notes', data).subscribe((res) => {
      this.ApiService.getProjectId(environment.api_url + 'project-util/project/' + this.taskProjectID).subscribe((res) => {
      this.taskService.addNotesForm.next(res['projectNotes']);
      this.taskService.totalNoteCount.next(res['projectNotes']);
      this.spinner.hide()
    },err=>{
      this.spinner.hide();
    });
      console.log("response note data : ", res);
      this.NoteMSG = 'Data Submitted Successfully';
      setTimeout(() => {
        this.NoteMSG = '';
        this.taskService.resetValue(['noteType', 'createdBy', 'note'], this.addNoteForm)
        // this.addNoteForm.reset()
      }, 3000);
    },err=>{
      this.spinner.hide()
    });    
  }
  //.taskService resetValue(value, formdata) {
  //   const exclude: string[] = value;
  //   Object.keys(formdata.controls).forEach(key => {
  //     if (exclude.findIndex(q => q === key) !== -1) {
  //       formdata.get(key).reset();
  //     }
  //   });
  // }
  onReset() {
    this.taskService.resetValue(['noteType', 'createdBy', 'note'], this.addNoteForm)
  }

}
