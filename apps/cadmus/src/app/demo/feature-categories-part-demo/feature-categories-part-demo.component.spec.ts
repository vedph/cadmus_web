import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCategoriesPartDemoComponent } from './feature-categories-part-demo.component';

describe('FeatureCategoriesPartDemoComponent', () => {
  let component: FeatureCategoriesPartDemoComponent;
  let fixture: ComponentFixture<FeatureCategoriesPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureCategoriesPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureCategoriesPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
