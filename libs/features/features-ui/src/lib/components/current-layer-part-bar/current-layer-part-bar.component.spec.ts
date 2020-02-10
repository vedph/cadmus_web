import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLayerPartBarComponent } from './current-layer-part-bar.component';

describe('CurrentLayerPartBarComponent', () => {
  let component: CurrentLayerPartBarComponent;
  let fixture: ComponentFixture<CurrentLayerPartBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLayerPartBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLayerPartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
