import { ProjectConfigComponent } from './../admin-edit-add/project-config/project-config.component';
import { RevenueComponent } from './revenue/revenue.component';
import { ResourceManagementComponent } from './resource-management/resource-management.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AuthguardService } from '../core/authguard/authguard.service';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { LeadsComponent } from './leads/leads.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'leads',
        component: LeadsComponent
      },
      {
        path: 'resource-management',
        component: ResourceManagementComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'revenue',
        component: RevenueComponent
      },
      {
        path: 'projectConfiguration',
        component: ProjectConfigComponent
      }
    ]
  },
  // { path: 'user', component: ManageUserComponent },
  // { path: 'manageprofile', component: ManageProfileComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
