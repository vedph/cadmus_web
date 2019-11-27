import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePartComponent } from './note-part.component';

describe('NotePartComponent', () => {
  let component: NotePartComponent;
  let fixture: ComponentFixture<NotePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
