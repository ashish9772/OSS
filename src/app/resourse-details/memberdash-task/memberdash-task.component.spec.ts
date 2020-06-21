import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberdashTaskComponent } from './memberdash-task.component';

describe('MemberdashTaskComponent', () => {
  let component: MemberdashTaskComponent;
  let fixture: ComponentFixture<MemberdashTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberdashTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberdashTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
