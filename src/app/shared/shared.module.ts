import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { WidgetComponent } from './components/widget/widget.component';



@NgModule({
  declarations: [HeaderComponent, SideNavComponent, WidgetComponent],
  imports: [
    CommonModule
  ], 
  exports: [HeaderComponent, SideNavComponent, WidgetComponent]
})
export class SharedModule { }
