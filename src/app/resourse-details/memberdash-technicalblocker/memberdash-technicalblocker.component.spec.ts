import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberdashTechnicalblockerComponent } from './memberdash-technicalblocker.component';

describe('MemberdashTechnicalblockerComponent', () => {
  let component: MemberdashTechnicalblockerComponent;
  let fixture: ComponentFixture<MemberdashTechnicalblockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberdashTechnicalblockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberdashTechnicalblockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
