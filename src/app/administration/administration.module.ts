import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration/administration.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { LeadsComponent } from './leads/leads.component';
import { ResourceManagementComponent } from './resource-management/resource-management.component';
import { EventsComponent } from './events/events.component';
import { RevenueComponent } from './revenue/revenue.component';
import { AdminEditAddModule} from '../admin-edit-add/admin-edit-add.module';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [AdministrationComponent,
    ManageUserComponent,
    ManageProfileComponent,
    ProfileComponent,
    LeadsComponent,
    ResourceManagementComponent,
    EventsComponent,
    RevenueComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule, 
    InputTextareaModule,     
    AdministrationRoutingModule,
    AdminEditAddModule,
  ]
})
export class AdministrationModule { }
