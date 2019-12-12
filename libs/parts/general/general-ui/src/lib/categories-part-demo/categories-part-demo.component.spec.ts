import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPartDemoComponent } from './categories-part-demo.component';

describe('CategoriesPartDemoComponent', () => {
  let component: CategoriesPartDemoComponent;
  let fixture: ComponentFixture<CategoriesPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
