import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OssLayoutComponent } from './oss-layout.component';

describe('OssLayoutComponent', () => {
  let component: OssLayoutComponent;
  let fixture: ComponentFixture<OssLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OssLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OssLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
