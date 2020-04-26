import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQueryComponent } from './item-query.component';

describe('ItemQueryComponent', () => {
  let component: ItemQueryComponent;
  let fixture: ComponentFixture<ItemQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
