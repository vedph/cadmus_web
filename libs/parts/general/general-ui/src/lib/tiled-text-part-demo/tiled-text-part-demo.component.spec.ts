import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledTextPartDemoComponent } from './tiled-text-part-demo.component';

describe('TiledTextPartDemoComponent', () => {
  let component: TiledTextPartDemoComponent;
  let fixture: ComponentFixture<TiledTextPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiledTextPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledTextPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
