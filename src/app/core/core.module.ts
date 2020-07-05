import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeaderInterceptor } from './interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true }
  ]
})
export class CoreModule { }
