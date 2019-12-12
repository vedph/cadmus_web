import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsPartComponent } from './keywords-part.component';

describe('KeywordsPartComponent', () => {
  let component: KeywordsPartComponent;
  let fixture: ComponentFixture<KeywordsPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
