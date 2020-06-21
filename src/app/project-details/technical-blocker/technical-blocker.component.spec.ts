import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalBlockerComponent } from './technical-blocker.component';

describe('TechnicalBlockerComponent', () => {
  let component: TechnicalBlockerComponent;
  let fixture: ComponentFixture<TechnicalBlockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalBlockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalBlockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
