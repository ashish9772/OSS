import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberdashHighpriorityComponent } from './memberdash-highpriority.component';

describe('MemberdashHighpriorityComponent', () => {
  let component: MemberdashHighpriorityComponent;
  let fixture: ComponentFixture<MemberdashHighpriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberdashHighpriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberdashHighpriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
