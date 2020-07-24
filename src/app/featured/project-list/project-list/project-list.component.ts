import { Component, OnInit, ContentChildren, AfterViewInit, ViewChildren, QueryList, Directive, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { isNull } from 'util';
import * as _ from 'lodash/fp';
//import * as Chart 
export interface PROJECTINFO {
  projectConfig: object,
  issues: object[],
  blockers: object[],
  defects: object[],
  mileStones: object[],
  risks: object[],
  projectNotes: object[],
  taskDetails: object[]
  statusCounts: {type: string, new: number, closed: number, open: number}[]
}

@Directive({
  selector: 'chart'
})
export class ChartDirective {

}
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, AfterViewInit {

  projectInfo: PROJECTINFO; 
  statCards: {} = {
    milestone: {id: 'milestone', theme: 'nightFade', name: 'Mile Stone'},
    highPriorityIssues: {id: 'highPriorityIssues', theme: 'green', name: 'High Priority Issues'},
    defects: {id: 'defects', theme: 'dark', name: 'Defects'},
    technicalBlocker: {id: 'technicalBlocker', theme: 'arielle', name: 'Technical Blocker'},
    risk: {id: 'risk', theme: 'nightFade', name: 'Risk'},
    task: {id: 'task', theme: 'green', name: 'Rask'}
  };

  statsStyle = new BehaviorSubject('column')

  projectNoteHidden: boolean = true;
  noteStyle = {
    height: '20px',
    overflow: 'hidden'
  };

  notesToggle$ = new BehaviorSubject(null)
  
  @ViewChildren("chart") charts: QueryList<ElementRef>;

  ngAfterViewInit() {
    //console.log(Chart)
    this.charts.forEach((_: ElementRef) => {
      //console.log(_.nativeElement)
      var myDoughnutChart = new Chart(_.nativeElement, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ]
          }],
          
          labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
        }
    });
    });
  }
  constructor() { 
    this.notesToggle$.pipe(
      
      filter(_ => !isNull(_)),
      map(_ => {
        if(_) {
          this.projectNoteHidden = !this.projectNoteHidden;
          this.noteStyle = {
            height: '20px',
            overflow: 'hidden'
          };
        }
        else {
          this.projectNoteHidden = !this.projectNoteHidden;
          this.noteStyle = {
            height: "fit-content",
            overflow: 'hidden'
          };
        }
      })
    )
    .subscribe();
  
  }

  ngOnInit(): void {
    of({"projectConfig":{"projectID":"1","projectName":"test","projectTeamMember":{"projectID":"1","projectMembers":[{"ein":"muthakur1979@gmail.com","projectID":"1","name":"Mukesh2","email":"muthakur1979@gmail.com","skill":"Delivery","role":[{"groupName":"Technical","roleDescription":"Technical Manager"}]},{"ein":"mukeshtechhead@gmail.com","projectID":"1","name":"Mukesh1","email":"mukeshtechhead@gmail.com","skill":"Java","role":[{"groupName":"Technical","roleDescription":"Technical Architect"}]}],"stakeHolders":[{"ein":"vikasgupta78@gmail.com","email":"vikasgupta78@gmail.com","name":"Vikas Sir "}]},"pStartDate":"04/07/2020","aStartDate":"05/07/2020","aEndDate":"17/07/2020","pEndDate":"11/07/2020","notes":"test","status":""},"issues":[{"issueId":"1","projectID":"1","projectName":"test","createdDate":"4/7/2020","createdBy":"namans331@gmail.com","assignName":null,"status":"New","description":"test","owner":"mukeshtechhead@gmail.com","ownerName":"Mukesh1","statusCount":null},{"issueId":"2","projectID":"1","projectName":"test","createdDate":"4/7/2020","createdBy":"namans331@gmail.com","assignName":null,"status":"New","description":"test 2","owner":"mukeshtechhead@gmail.com","ownerName":"Mukesh1","statusCount":null}],"blockers":[{"techinicalBlockerId":"1","projectId":"1","projectName":"test","createdBy":"namans331@gmail.com","assignName":null,"createdDate":"4/7/2020","area":"UI","technicalBlokerNotes":"UI ","owner":"muthakur1979@gmail.com","ownerName":"Mukesh2","description":"test technical blocker","analysis":"test","fixedDetails":"test","status":"New","statusCount":null}],"defects":[{"defectID":"2","projectID":"1","projectName":"test","assignName":"Mukesh1","summary":"test","status":"New","severity":"low","raisedOndate":"","priority":"1","environment":"","functionalarea":"","type":"","detectedinRelease":"","establishedRootCause":"","systemcomponent":"","actualFixDate":"","assignedTo":"mukeshtechhead@gmail.com","priAssignedToority":"","blockedTests":"","closedinphase":"","closingDate":"","comments":"1","description":"1","e2ERetestDate":"","estimatedFixDate":"","fixRequiredBy":"","manDaysLost":"","modified":"","productService":"","project":"","raisedBy":"","reOpenCount":"","reproducible":"","subject":"","testArea":"","testPhase":"","testType":"","statusCount":null}],"mileStones":[{"mileStoneId":"1","projectId":"1","projectName":"test","assignName":null,"notes":"test milestone 1","createdBy":"namans331@gmail.com","createdDate":"4/7/2020","status":"New","statusCount":null}],"risks":[{"rsikID":"1","projectId":"1","projectName":"test","createdBy":"namans331@gmail.com","assignName":null,"createdDate":"4/7/2020","notes":"Test for risk","owner":null,"status":"New","statusCount":null}],"projectNotes":[{"projectNoteId":"1","projectID":"1","notes":"test notes","createdBy":"namans331@gmail.com","assignName":null,"createdDate":"4/7/2020","type":"general"}],"taskDetails":[{"taskId":"1","assignedTo":"muthakur1979@gmail.com","assignName":"Mukesh2","projectID":"1","projectName":"test","taskDescription":"task creation for mukesh 2","aStartDate":"05/07/2020","pStartDate":"04/07/2020","aEndDate":"","pEndDate":"06/07/2020","status":"Open","name":null,"statusCount":null}],"statusCounts":[{"type":"task","new":0,"closed":0,"open":1},{"type":"risk","new":1,"closed":0,"open":0},{"type":"technicalBlocker","new":1,"closed":0,"open":0},{"type":"defects","new":1,"closed":0,"open":0},{"type":"highPriorityIssues","new":2,"closed":0,"open":0},{"type":"milestone","new":1,"closed":0,"open":0}]})
    .pipe(
      
    )
    .subscribe(data => this.projectInfo = data);
  }

}
