import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulDeleteComponent } from './successful-delete.component';

describe('SuccessfulDeleteComponent', () => {
  let component: SuccessfulDeleteComponent;
  let fixture: ComponentFixture<SuccessfulDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
