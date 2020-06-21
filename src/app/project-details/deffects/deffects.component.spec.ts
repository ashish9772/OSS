import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeffectsComponent } from './deffects.component';

describe('DeffectsComponent', () => {
  let component: DeffectsComponent;
  let fixture: ComponentFixture<DeffectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeffectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
