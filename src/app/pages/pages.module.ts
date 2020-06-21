import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    TableModule,
    ChartModule,
    PagesRoutingModule,FormsModule
    //DropdownModule
  ]
})
export class PagesModule { }
