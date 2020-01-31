import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledDataComponent } from './tiled-data.component';

describe('TiledDataComponent', () => {
  let component: TiledDataComponent;
  let fixture: ComponentFixture<TiledDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiledDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
