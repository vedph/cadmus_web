import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePartDemoComponent } from './note-part-demo.component';

describe('NotePartDemoComponent', () => {
  let component: NotePartDemoComponent;
  let fixture: ComponentFixture<NotePartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotePartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
