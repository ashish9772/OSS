import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { RecruitmentComponent } from './recruitment/recruitment.component';

@NgModule({
  declarations: [RecruitmentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabViewModule,
    RecruitmentRoutingModule
  ]
})
export class RecruitmentModule { }
