import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-resource-management',
  templateUrl: './resource-management.component.html',
  styleUrls: ['./resource-management.component.scss']
})
export class ResourceManagementComponent implements OnInit {

  resourceRequirementForm: FormGroup;

  projectData;
  submitted = false;


  constructor(private apiservice: ApiService, private fb: FormBuilder) { }

  ngOnInit() {

    this.resourceRequirementForm = this.fb.group({
      projectId: ['', Validators.required],
      projectName: ['', Validators.required],
      jobDescription: ['', Validators.required],
      skill: ['', Validators.required],
      tier: ['', Validators.required],
      noOfResources: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.apiservice.getProjectId(environment.api_url + 'project/config').subscribe((res) => {
      this.projectData = res;
    });

  //   this.apiservice.projectData$.subscribe((res) => {
  //     ("res management : ", res);
  //     this.projectData = res;
  //    
  //   });
  // }
  // onFocus(){
  //   this.resourceRequirementForm.patchValue({ projectName: " " });
  }
  onChange() {

    const projectId = this.resourceRequirementForm.controls['projectId'].value;
    this.projectData.forEach(element => {
      if (projectId === element.projectID) {
        this.resourceRequirementForm.patchValue({ projectName: element.projectName });
      }
    });

  }


  submitResourceReqForm() {
    this.submitted = true;

    // call api
    const data = {
      projectId: this.resourceRequirementForm.controls['projectId'].value,
      projectName: this.resourceRequirementForm.controls['projectName'].value,
      jobDescription: this.resourceRequirementForm.controls['jobDescription'].value,
      noResourceRequirement: "" + this.resourceRequirementForm.controls['noOfResources'].value,
      requirementSkill: this.resourceRequirementForm.controls['skill'].value,
      tier: this.resourceRequirementForm.controls['tier'].value,
      location: this.resourceRequirementForm.controls['location'].value
    };
    this.apiservice.resourceManagementData(environment.api_url + 'project-util/resource', data).subscribe((res) => {
   
    });

    setTimeout(() => {
      this.submitted = false;
    }, 5000);
    setTimeout(() => {
      this.resourceRequirementForm.reset();
    }, 3000);
  }
}
