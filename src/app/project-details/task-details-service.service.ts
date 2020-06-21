import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsServiceService {
  taskPrjectID = new BehaviorSubject('');
  taskPrjectI$ = this.taskPrjectID.asObservable();

  taskProjectName = new BehaviorSubject('');
  taskProjectName$ = this.taskProjectName.asObservable();
  
  allProjectdata = new BehaviorSubject([]);
  allProjectdata$ = this.allProjectdata.asObservable();

  addMenberDefectsData = new BehaviorSubject([]);
  addMenberTasksData = new BehaviorSubject([]);
  addMenberIdeasData = new BehaviorSubject([]);
  addMenberPriorityIssueFormData = new BehaviorSubject([]);
  addMenberRiskFormData = new BehaviorSubject([]);
  addMenberTechnicalBlockerFormData = new BehaviorSubject([]);

  addMenberDefectsData$ = this.addMenberDefectsData.asObservable();
  addMenberTasksData$ = this.addMenberTasksData.asObservable();
  addMenberIdeasData$ = this.addMenberIdeasData.asObservable();
  addMenberPriorityIssueFormData$ = this.addMenberPriorityIssueFormData.asObservable();
  addMenberRiskFormData$ = this.addMenberRiskFormData.asObservable();
  addMenberTechnicalBlockerFormData$ = this.addMenberTechnicalBlockerFormData.asObservable();

  //Notes update
  totalNoteCount = new BehaviorSubject('');
  totalNoteCount$ = this.totalNoteCount.asObservable();


  teamMemberDetails: any = [];
  memberData = [];

  activeItem;
  addProjectDocument = new BehaviorSubject([]);
  addProjectDocument$ = this.addProjectDocument.asObservable();

  extracttaskDetails = new BehaviorSubject([]);
  addDefectsData = new BehaviorSubject([]);
  addMileStoneFormData = new BehaviorSubject([]);
  // addMileStoneTasksData = new BehaviorSubject([]);
  addPriorityIssueFormData = new BehaviorSubject([]);
  addRiskFormData = new BehaviorSubject([]);
  addTechnicalBlockerFormData = new BehaviorSubject([]);
  addNotesForm = new BehaviorSubject([]);
  eextracttaskDetails$ = this.extracttaskDetails.asObservable();
  riskObservable$ = this.addRiskFormData.asObservable();
  technicalBlocker$ = this.addTechnicalBlockerFormData.asObservable();
  highpriorityissue$ = this.addPriorityIssueFormData.asObservable();
  milestone$ = this.addMileStoneFormData.asObservable();
  // mileStoneTasks$ = this.addMileStoneTasksData.asObservable();
  notes$ = this.addNotesForm.asObservable();
  addDefectdata$ = this.addDefectsData.asObservable();
  constructor() {
    this.activeItem = 0;
  }

  storeData(data) {
    this.extracttaskDetails.next(data);
  }

  getNameByEIN(ein) {
    if (this.teamMemberDetails.length > 0) {
      const finalData = this.teamMemberDetails.filter((data) => {
        if (data.ein === ein) {
          return true;
        }
      });
      if (finalData.length > 0) {
        const name = finalData[0].name;
        return name;
      }

    }

  }
  resetValue(value, formdata) {
    const exclude: string[] = value;
    Object.keys(formdata.controls).forEach(key => {
      if (exclude.findIndex(q => q === key) !== -1) {
        formdata.get(key).reset();
      }
    });
  }


  getStartValue(val) {
    let startvalue = val;
    let date = new Date(startvalue.split('/').reverse().join('/'));
    date.setDate(date.getDate() + 1);
    return  date;
  }
  getEndValue(form, start, end) {
    let startDate = form.controls[start].value;
    if (startDate == '' || startDate == null || startDate == undefined) {
      alert(`Please select ${start}  Start date`);
      form.controls[end].setValue('');
    }
  }
  // getEndValue(form,formControl) {
  //   let  pstartvalue  =  form.controls[formControl].value;
  //   if  (this.newtaskcreate.controls['aStartDate'].value  ==  '') {
  //     alert('Please select Actual Start date');
  //     this.newtaskcreate.controls['aEndDate'].setValue('');
  //   }
  // }
}
