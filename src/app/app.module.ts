import { ApiService } from './shared/api.service';
import { LoginService } from './service/login.service';
import { InterceptorService } from './shared/app.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthguardService } from './core/authguard/authguard.service';
//{  provide:  HTTP_INTERCEPTORS,  useClass:  InterceptorService,  multi:  true },
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [ LoginService, ApiService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
