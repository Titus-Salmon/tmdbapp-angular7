import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditT0dComponent } from './edit-t0d.component';

describe('EditT0dComponent', () => {
  let component: EditT0dComponent;
  let fixture: ComponentFixture<EditT0dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditT0dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditT0dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
