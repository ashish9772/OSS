import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberdashRiskComponent } from './memberdash-risk.component';

describe('MemberdashRiskComponent', () => {
  let component: MemberdashRiskComponent;
  let fixture: ComponentFixture<MemberdashRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberdashRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberdashRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
