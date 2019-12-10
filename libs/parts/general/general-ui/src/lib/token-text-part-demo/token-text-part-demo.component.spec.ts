import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenTextPartDemoComponent } from './token-text-part-demo.component';

describe('TokenTextPartDemoComponent', () => {
  let component: TokenTextPartDemoComponent;
  let fixture: ComponentFixture<TokenTextPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenTextPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenTextPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
