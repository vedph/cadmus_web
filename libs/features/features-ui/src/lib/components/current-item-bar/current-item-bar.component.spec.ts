import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentItemBarComponent } from './current-item-bar.component';

describe('CurrentItemBarComponent', () => {
  let component: CurrentItemBarComponent;
  let fixture: ComponentFixture<CurrentItemBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentItemBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentItemBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
