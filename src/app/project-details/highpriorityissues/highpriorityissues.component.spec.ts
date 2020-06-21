import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighpriorityissuesComponent } from './highpriorityissues.component';

describe('HighpriorityissuesComponent', () => {
  let component: HighpriorityissuesComponent;
  let fixture: ComponentFixture<HighpriorityissuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighpriorityissuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighpriorityissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
