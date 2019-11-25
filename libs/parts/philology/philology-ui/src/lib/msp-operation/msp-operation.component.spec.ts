import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspOperationComponent } from './msp-operation.component';

describe('MspOperationComponent', () => {
  let component: MspOperationComponent;
  let fixture: ComponentFixture<MspOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
