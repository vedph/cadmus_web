import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureNotePartDemoComponent } from './feature-note-part-demo.component';

describe('FeatureNotePartDemoComponent', () => {
  let component: FeatureNotePartDemoComponent;
  let fixture: ComponentFixture<FeatureNotePartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureNotePartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureNotePartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
