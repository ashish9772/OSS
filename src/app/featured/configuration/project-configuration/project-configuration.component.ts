import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as moment from 'moment';
export interface ROLE {
  adminRole: boolean,
  id: number,
  role: string
}
export interface MEMBER {
  email: string,
  ein: string,
  projectId: string,
  name: string,
  role: ROLE[],
  skill: string,
  type: string
}
@Component({
  selector: 'app-project-configuration',
  templateUrl: './project-configuration.component.html',
  styleUrls: ['./project-configuration.component.scss']
})
export class ProjectConfigurationComponent implements OnInit {

  //[{"ein":"muthakur1979@gmail.com","projectID":"1","name":"Mukesh2","email":"muthakur1979@gmail.com","skill":"Delivery","role":[{"groupName":"Technical","roleDescription":"Technical Manager"}]},{"ein":"mukeshtechhead@gmail.com","projectID":"1","name":"Mukesh1","email":"mukeshtechhead@gmail.com","skill":"Java","role":[{"groupName":"Technical","roleDescription":"Technical Architect"}]},{"ein":"vikasgupta78@gmail.com","projectID":"2","name":"Vikas Sir ","email":"vikasgupta78@gmail.com","skill":"stakeholder","role":[{"groupName":"Technical","roleDescription":"Technical Architect"}]},{"ein":"namans331@gmail.com","projectID":"97","name":"namans331@gmail.com","email":"namans331@gmail.com","skill":"UI","role":[{"groupName":"Technical","roleDescription":"Technical Architect"}]},{"ein":"kkmishragcp@gmail.com","projectID":"97","name":"Babs Bro","email":"kkmishragcp@gmail.com","skill":"Java","role":[{"groupName":"Technical","roleDescription":"Technical Manager"}]},{"ein":"manojkthakur@gmail.com","projectID":"","name":"Manoj","email":"manojkthakur@gmail.com","skill":"Delivery","role":[]}]
  //{"Design":["Design Manager","Design Lead","Designer"],"Stake Holder":["Stake Holder Admin","Stake Holder Member"],"Technical":["Technical Manager","Technical Architect","Technical Lead","Developer"],"Infra":["Infra Lead","Infra Developer"],"Delivery":["Delivery Manager","Delivery Manager"],"Admin":["Project Admin","Super Admin"],"Testing":["Test Manager","Test Lead","Tester"]}
  projConfigForm: FormGroup;
  membersFreez: any[]
  members: MEMBER[] = [ {} as MEMBER ];
  addMemEvent$ = new BehaviorSubject(null);
  removeMemEvent$ = new BehaviorSubject(null);
  defaultStartDate = moment().toISOString();
  defaultEndDate = moment().toISOString();
  defaultActualEndDate = null;
  constructor(private fb: FormBuilder) {
    let m = moment;
  }

  ngOnInit(): void {
    this.membersFreez = [
      {"ein":"muthakur1979@gmail.com","projectID":"1","name":"Mukesh2","email":"muthakur1979@gmail.com","skill":"Delivery","role":[{"role": "Tech Manager"}]},
      {"ein":"mukeshtechhead@gmail.com","projectID":"1","name":"Mukesh1","email":"mukeshtechhead@gmail.com","skill":"Java","role":[{"role":"Technical Architect"}]},
      {"ein":"vikasgupta78@gmail.com","projectID":"2","name":"Vikas Sir ","email":"vikasgupta78@gmail.com","skill":"stakeholder","role":[{"role":"Technical Architect"}]},
      {"ein":"namans331@gmail.com","projectID":"97","name":"namans331@gmail.com","email":"namans331@gmail.com","skill":"UI","role":[{"role":"Technical Architect"}]},
      {"ein":"kkmishragcp@gmail.com","projectID":"97","name":"Babs Bro","email":"kkmishragcp@gmail.com","skill":"Java","role":[{"role":"Technical Manager"}]},
      {"ein":"manojkthakur@gmail.com","projectID":"","name":"Manoj","email":"manojkthakur@gmail.com","skill":"Delivery","role":[{"role":"Delivery Head"}]}];
    this.projConfigForm = this.fb.group({
      projectId: ['', Validators.required],
      projectName: ['21', Validators.required],
      pStartDate: [this.defaultStartDate, Validators.required],
      pEndDate: [this.defaultEndDate, Validators.required],
      aStartDate: [''],
      aEndDate: [''],
      notes: [''],
      projectMembers: this.fb.array([])
    });

    this.getFormArray('projectMembers').controls = this.genMemCtrls();
    
    // add member to the array
    this.addMemEvent$
    .pipe(
      filter(a => a)
    )
    .subscribe(
      add => {
        this.insertMem()
      }
    )

    // remove member to the array
    // based on the index
    this.removeMemEvent$.subscribe(
      index => {
        this.removeMem(index)
      }
    )

    // start Date changes
    // change end date 
    this.getFormCntrl('pStartDate').valueChanges.subscribe(
      (value) => {
        this.defaultStartDate = moment(value).toISOString();
        this.getFormCntrl('pEndDate').patchValue('');
      }
    )

    // actual date changes
    // change actual end date
    this.getFormCntrl('aStartDate').valueChanges.subscribe(
      (value) => {
        this.getFormCntrl('aEndDate').patchValue('');
        this.defaultActualEndDate = moment(value).toISOString();
      }
    )


  }


  getFormCntrl(cntrl: string): FormControl{
    return this.projConfigForm.get(cntrl) as FormControl
  }

  getFormArray(array: string): FormArray {
    const fa = this.projConfigForm.get(array) as FormArray;
    return fa;
  }

  insertMem(){
    const mem = { } as MEMBER;
    this.members.push(mem)
    this.members = [...this.members];
    const ctrl = this.fb.control('');
    const subs = this.listenForMemValueChanges(ctrl)
    mem['subs'] = subs;

    const projectMemFormArray = this.getFormArray('projectMembers');
    projectMemFormArray.insert(projectMemFormArray.controls.length, ctrl)
  }

  removeMem(index: number){
    this.members.splice(index,1);
    this.members = [ ...this.members ];
    const projectMemFormArray = this.getFormArray('projectMembers')
    projectMemFormArray.removeAt(index)
  }

  genMemCtrls(): FormControl[]{
    return this.members.map(mem => {
      const ctrl = this.fb.control('');
      const subs = this.listenForMemValueChanges(ctrl)
      mem['subs'] = subs;
      return ctrl;
    });
  }

  listenForMemValueChanges(ctrl: FormControl): Subscription{
    const ctrlRef = ctrl;
    return ctrl.valueChanges
    .pipe(
      map(value => {
        return {
          refIndex: this.membersFreez.findIndex(mem => mem.email === value),
          renderIndex: this.getFormArray('projectMembers').controls.findIndex( memCtrl => ctrlRef === memCtrl )
        }
      })
    )
    .subscribe((value) => {
      this.members[value.renderIndex] = this.membersFreez[value.refIndex] ? this.membersFreez[value.refIndex] : {}
    });
  }

  
}
