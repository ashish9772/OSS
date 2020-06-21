import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../core/services/idea.service';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {
  empDetails: any = [];
  clonedemp: { [s: string]: any; } = {};
  displayDialog: boolean;
  newemp: boolean;
  empadd: any = {};
  constructor(private ideaservice: IdeaService) { }

  ngOnInit() {
    this.ideaservice.getAllEmpIdea().subscribe(value => this.empDetails = value);
  }
  onRowEditInit(emp: any) {
    this.clonedemp[emp.index] = { ...emp };
  }
  onRowEditSave(rowData) {
    delete this.clonedemp[rowData.vin];
  }
  onRowEditCancel(emp: any, index: number) {
    this.empDetails[index] = this.clonedemp[emp.index];
    // tslint:disable-next-line:quotemark
    delete this.clonedemp[emp.index];
  }
  showDialogToAdd() {
    this.newemp = true;
    this.empadd = {};
    // tslint:disable-next-line:no-string-literal
    this.empadd['empName'] = 'BINU';
    this.displayDialog = true;
  }
  save() {
    if (this.newemp) {
      let lastObject = this.empDetails[this.empDetails.length - 1];
      let getIndexValue = lastObject['index'] + 1;
      this.empadd['index'] = getIndexValue;
      this.empDetails.push(this.empadd);
      this.displayDialog = false;
    }
  }
  closedialog() {
    this.displayDialog = false;
  }

}
