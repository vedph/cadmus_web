import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTiledTextPartDemoComponent } from './feature-tiled-text-part-demo.component';

describe('FeatureTiledTextPartDemoComponent', () => {
  let component: FeatureTiledTextPartDemoComponent;
  let fixture: ComponentFixture<FeatureTiledTextPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureTiledTextPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTiledTextPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
