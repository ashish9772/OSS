import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberdashDefectsComponent } from './memberdash-defects.component';

describe('MemberdashDefectsComponent', () => {
  let component: MemberdashDefectsComponent;
  let fixture: ComponentFixture<MemberdashDefectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberdashDefectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberdashDefectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
