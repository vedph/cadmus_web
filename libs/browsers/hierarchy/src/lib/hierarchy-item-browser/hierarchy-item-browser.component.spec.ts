import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyItemBrowserComponent } from './hierarchy-item-browser.component';

describe('HierarchyItemBrowserComponent', () => {
  let component: HierarchyItemBrowserComponent;
  let fixture: ComponentFixture<HierarchyItemBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyItemBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyItemBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
