import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratedTokenTextComponent } from './decorated-token-text.component';

describe('DecoratedTokenTextComponent', () => {
  let component: DecoratedTokenTextComponent;
  let fixture: ComponentFixture<DecoratedTokenTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoratedTokenTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoratedTokenTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
