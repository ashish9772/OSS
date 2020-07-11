import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, toArray, tap, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-project-configuration',
  templateUrl: './project-configuration.component.html',
  styleUrls: ['./project-configuration.component.scss']
})
export class ProjectConfigurationComponent implements OnInit {

  //[{"ein":"muthakur1979@gmail.com","projectID":"1","name":"Mukesh2","email":"muthakur1979@gmail.com","skill":"Delivery","role":[{"groupName":"Technical","roleDescription":"Technical Manager"}]},{"ein":"mukeshtechhead@gmail.com","projectID":"1","name":"Mukesh1","email":"mukeshtechhead@gmail.com","skill":"Java","role":[{"groupName":"Technical","roleDescription":"Technical Architect"}]},{"ein":"vikasgupta78@gmail.com","projectID":"2","name":"Vikas Sir ","email":"vikasgupta78@gmail.com","skill":"stakeholder","role":[{"groupName":"Technical","roleDescription":"Technical Architect"}]},{"ein":"namans331@gmail.com","projectID":"97","name":"namans331@gmail.com","email":"namans331@gmail.com","skill":"UI","role":[{"groupName":"Technical","roleDescription":"Technical Architect"}]},{"ein":"kkmishragcp@gmail.com","projectID":"97","name":"Babs Bro","email":"kkmishragcp@gmail.com","skill":"Java","role":[{"groupName":"Technical","roleDescription":"Technical Manager"}]},{"ein":"manojkthakur@gmail.com","projectID":"","name":"Manoj","email":"manojkthakur@gmail.com","skill":"Delivery","role":[]}]
  //{"Design":["Design Manager","Design Lead","Designer"],"Stake Holder":["Stake Holder Admin","Stake Holder Member"],"Technical":["Technical Manager","Technical Architect","Technical Lead","Developer"],"Infra":["Infra Lead","Infra Developer"],"Delivery":["Delivery Manager","Delivery Manager"],"Admin":["Project Admin","Super Admin"],"Testing":["Test Manager","Test Lead","Tester"]}
  projConfigForm: FormGroup;
  filteredStreets: Observable<string[]>;
  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.projConfigForm = this.fb.group({
      projectId: ['', Validators.required],
      projectName: ['', Validators.required],
      pStartDate: [null, Validators.required],
      pEndDate: ['', Validators.required],
      aStartDate: [''],
      aEndDate: [''],
      notes: [''],
      projectMembers: this.fb.array([
        this.fb.control(""),
        this.fb.control(""),
        this.fb.control("")
      ])
    });

    this.filteredStreets = this.getFormArray('projectMembers').controls[1].valueChanges.pipe(
      startWith(''),
      map(_ => ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'])
    )
  }

  getFormCntrl(cntrl: string): FormControl{
    return this.projConfigForm.get(cntrl) as FormControl
  }

  getFormArray(array: string): FormArray {
    const fa = this.projConfigForm.get(array) as FormArray;
    return fa;
  }

}
