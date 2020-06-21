import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { TeamInformationRoutingModule } from './team-information-routing.module';
import { TeamInformationComponent } from './team-information/team-information.component';



@NgModule({
  declarations: [TeamInformationComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    TableModule,
    NgbModule,
    TeamInformationRoutingModule
  ]
})
export class TeamInformationModule { }
