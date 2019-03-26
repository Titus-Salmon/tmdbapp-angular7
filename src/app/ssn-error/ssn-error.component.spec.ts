import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsnErrorComponent } from './ssn-error.component';

describe('SsnErrorComponent', () => {
  let component: SsnErrorComponent;
  let fixture: ComponentFixture<SsnErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsnErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsnErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
