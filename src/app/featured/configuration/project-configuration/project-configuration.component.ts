import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { map, filter, tap, delay } from 'rxjs/operators';
import * as moment from 'moment';
import { isNull } from 'util';
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
  type: string,
  subs?: Subscription
}
@Component({
  selector: 'app-project-configuration',
  templateUrl: './project-configuration.component.html',
  styleUrls: ['./project-configuration.component.scss']
})
export class ProjectConfigurationComponent implements OnInit {

  projConfigForm: FormGroup;
  
  //members info from the network call
  //no add/delete opr is done on this instance
  membersFreez: any[]

  //the table content is generated based on this array
  //form-contorls are mapped to each item of the array
  //hence value of the table is derived from the form-control
  // [M] ==> [FC] => [value]
  //any addition/deletion of the member item
  //insertMem/removeMem function has to be invoked
  //to have a sync 
  members: MEMBER[] = [  ];

  // add/remove button event to add the row in the table
  addMemEvent$ = new BehaviorSubject(null);
  removeMemEvent$ = new BehaviorSubject(null);
  
  //dates default values
  defaultStartDate = moment().toISOString();
  defaultEndDate = moment().toISOString();
  defaultActualEndDate = null;
  

  submiting: boolean = false;
  
  constructor(private fb: FormBuilder) {  }


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
      projectName: ['', Validators.required],
      pStartDate: [this.defaultStartDate, Validators.required],
      pEndDate: [this.defaultEndDate, Validators.required],
      aStartDate: [''],
      aEndDate: [''],
      notes: [''],
      projectMembers: this.fb.array([])
    });

    
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

    // remove member from the array
    // based on the index
    // unsub to the listerner attached to the form control
    this.removeMemEvent$.pipe(filter(_ => !isNull(_))).subscribe(
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


  private getFormCntrl(cntrl: string): FormControl{
    return this.projConfigForm.get(cntrl) as FormControl
  }

  private getFormArray(array: string): FormArray {
    const fa = this.projConfigForm.get(array) as FormArray;
    return fa;
  }

  /*
    prepare an empty member object
    push to the members array
    create the formcontrol 
    listen to the changes on the form-control
    add the subscription token to the memeber object
    remove the subscription token when form-contorl is removed
  */
  insertMem(){
    const mem = { } as MEMBER;
    this.members.push(mem)
    this.members = [...this.members];
    const ctrl = this.fb.control('');
    const subs = this.listenForMemValueChanges(ctrl)
    mem.subs = subs;

    const projectMemFormArray = this.getFormArray('projectMembers');
    projectMemFormArray.insert(projectMemFormArray.controls.length, ctrl)
  }

  //update the memebers array 
  //unsub for the events on the fc
  //remove the fc from fa
  // [M] ==> [fc] , must be in sync
  removeMem(index: number){
    this.members[index].subs.unsubscribe();
    this.members.splice(index,1);
    this.members = [ ...this.members ];
    const projectMemFormArray = this.getFormArray('projectMembers')
  
    projectMemFormArray.removeAt(index)
  }

  // private genMemCtrls(): FormControl[]{
  //   return this.members.map(mem => {
  //     const ctrl = this.fb.control('');
  //     const subs = this.listenForMemValueChanges(ctrl)
  //     mem.subs = subs;
  //     return ctrl;
  //   });
  // }


  // when the value of the contorl Changes 
  // read the info related to the value selecetd 
  // to represent the same in the table
  listenForMemValueChanges(ctrl: FormControl): Subscription{
    const ctrlRef = ctrl;
    return ctrl.valueChanges
    .pipe(
      map(value => {
        // fc-value ==> memeberFreez ==> index of item , this index will be used to get the complete info of the member
        // fc ==> fa ==> index, this index is used to update the member with the full info
        return {
          refIndex: this.membersFreez.findIndex(mem => mem.email === value),
          renderIndex: this.getFormArray('projectMembers').controls.findIndex( memCtrl => ctrlRef === memCtrl )
        }
      })
    )
    .subscribe((value) => {
      // member object is updated with the full info of the member
      this.members[value.renderIndex] = this.membersFreez[value.refIndex] ? { ...this.members[value.renderIndex], ...this.membersFreez[value.refIndex] } : {}
    });
  }

  submitProjectConfig(){
    of(1).pipe(
      tap(_ => this.submiting = true ),
      delay(400),
      tap(_ => this.submiting = false, _ => this.submiting = false)
    ).subscribe(
      ( data ) => {
        console.log(data)
      },
      () => {}, 
      () => {
        this.projectConfigformReset();
    })
    
  }

  resetProjectConfig(event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.projectConfigformReset();
  }

  private resetMembers(){
    this.members = [];
    this.getFormArray('projectMembers').controls = [];
  }


  private projectConfigformReset(){
    this.projConfigForm.reset({
      projectId: '',
      projectName: '',
      pStartDate: this.defaultStartDate,
      pEndDate: this.defaultEndDate,
      aStartDate: '',
      aEndDate: '',
      notes: '',
      projectMembers: this.fb.array([])
    });
    this.resetMembers()

  }
  
}
