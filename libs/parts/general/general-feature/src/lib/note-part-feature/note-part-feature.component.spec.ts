import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePartFeatureComponent } from './note-part-feature.component';

describe('NotePartFeatureComponent', () => {
  let component: NotePartFeatureComponent;
  let fixture: ComponentFixture<NotePartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotePartFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
