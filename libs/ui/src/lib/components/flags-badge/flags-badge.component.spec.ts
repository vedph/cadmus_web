import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsBadgeComponent } from './flags-badge.component';

describe('FlagsBadgeComponent', () => {
  let component: FlagsBadgeComponent;
  let fixture: ComponentFixture<FlagsBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagsBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
