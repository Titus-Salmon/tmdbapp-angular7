import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanT0dComponent } from './scan-t0d.component';

describe('ScanT0dComponent', () => {
  let component: ScanT0dComponent;
  let fixture: ComponentFixture<ScanT0dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanT0dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanT0dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
