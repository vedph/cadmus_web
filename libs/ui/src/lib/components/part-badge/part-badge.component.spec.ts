import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartBadgeComponent } from './part-badge.component';
import { ApiModule } from '@cadmus/api';

describe('PartBadgeComponent', () => {
  let component: PartBadgeComponent;
  let fixture: ComponentFixture<PartBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      declarations: [PartBadgeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
