import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  businessLeadsForm: FormGroup;
  createUserForm: FormGroup;
  showResourceForm = false;
  submitted = false;
  showWarning = false;
  msg;
  constructor(private apiservice: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      ein: new FormControl()
    });
    this.businessLeadsForm = this.fb.group({
      // projectId: ['', Validators.required],
      // projectName: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientDesignation: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  searchEin() {
    let data = {
      ein: this.createUserForm.controls['ein'].value
    };
    this.apiservice.getUserDetail('ngwfmt/resources/userdetails/userdetails', data).subscribe(data => {
      
      if (!data.Warning) {
        this.showWarning = false;
        this.showResourceForm = true;
        this.businessLeadsForm.controls['clientName'].setValue(data.NAME);
        this.businessLeadsForm.controls['clientEmail'].setValue(data.mail);
      } else {
        this.showWarning = true;
        this.showResourceForm = false;
        this.msg = 'Warning ' + " " + data.Warning;
      }
    });
  }



  submitBussinessLeadsForm() {
    this.submitted = true;
    // api call to submit data
    setTimeout(() => {

      this.showResourceForm = false;
      this.businessLeadsForm.reset();
      this.createUserForm.reset();
    }, 2000);
    setTimeout(() => {
      this.submitted = false;
    }, 5000);

    const data = {
      clientName: this.businessLeadsForm.controls['clientName'].value,
      clientMail: this.businessLeadsForm.controls['clientEmail'].value,
      clientDesignation: this.businessLeadsForm.controls['clientDesignation'].value,
      notes: this.businessLeadsForm.controls['notes'].value,
    };
    this.apiservice.resourceManagementData(environment.api_url + 'project-util/leads', data).subscribe((res) => {
     
    });
  }

}
