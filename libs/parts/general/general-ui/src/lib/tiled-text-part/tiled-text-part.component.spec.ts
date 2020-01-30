import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledTextPartComponent } from './tiled-text-part.component';

describe('TiledTextPartComponent', () => {
  let component: TiledTextPartComponent;
  let fixture: ComponentFixture<TiledTextPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiledTextPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledTextPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
