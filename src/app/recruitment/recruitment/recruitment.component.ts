import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import * as jsPDF from 'jspdf';
import { RecruitmentService } from '../../core/services/recruitment.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  uidata: any = [];
  form: FormGroup;
  getForDownload;
  constructor(private recruitmentService: RecruitmentService, private fb: FormBuilder) { }
  @ViewChild('uiquestions') reportContent: ElementRef;
  
  reuritmentfun() {
    // tslint:disable-next-line:prefer-const
    let controlArray = this.form.get('uiquestions') as FormArray;
    Object.keys(this.uidata).forEach((i) => {
      controlArray.push(
        this.fb.group({
          questions: new FormControl(this.uidata[i].questions),
          code: new FormControl(this.uidata[i].code),
          options: new FormControl(this.uidata[i].options),
          answer: new FormControl('')
        })
      );
    });
  }
  bindAns(value, i) {
    // tslint:disable-next-line:no-string-literal
    this.form['controls']['uiquestions']['controls'][i]['controls'].answer.patchValue(value);
  }
  ngOnInit() {
    console.log("component is loaded");
    this.recruitmentService.getUIData().subscribe(data => {
      this.uidata = data;
      if (this.uidata.length > 0) {
        this.form = new FormGroup({
          uiquestions: this.fb.array([])
        });
        this.reuritmentfun();
      }
    });
  }
  submitForm(form, tech) {
    this.getForDownload = form;
    // tslint:disable-next-line:no-unused-expression
  }
  download() {
    // tslint:disable-next-line:prefer-const
    let i = 1;
    const content = this.reportContent.nativeElement;
    console.log(content);

    // tslint:disable-next-line:prefer-const
    let doc = new jsPDF();
    // let pageHeight = doc.internal.pageSize.height;
    // let y = 500;
    // doc.setFontSize(12);
    // this.getForDownload.uiquestions.forEach((employee, index) => {
    //   doc.text(10, i * 10, 'Q ' + [index] + ': ' + employee.questions);
    //   i++;
    //   doc.text(10, i * 10, 'Code:' + employee.code);
    //   i++;
    //   doc.text(10, i * 10, 'Options:');
    //   i++;
    //   console.log(employee.options);
    //   employee.options.forEach((ele, index1) => {
    //     doc.text(10, i * 10, index1 + ')' + ele);
    //     i++;
    //   });
    //   doc.text(10, i * 10, 'Answer:' + employee.answer);
    //   i++;
    // });
    let options = { pagesplit: true };
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'pagesplit':true
    });
    doc.save('Test.pdf');
  }
}
