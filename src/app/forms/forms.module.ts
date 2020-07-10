import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FORMLY_CONFIG } from './constants'

//export const FORMLY_CONFIG = new InjectionToken<AppConfig>('FORMLY_CONFIG');
@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule
  ],
  exports: [InputComponent]
})
export class FormsModule { 
  static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: FormsModule,
      providers: [{ provide: FORMLY_CONFIG, useValue: config, multi: true }],
    }
  }
}
