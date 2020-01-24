import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenTextLayerPartFeatureComponent } from './token-text-layer-part-feature.component';

describe('TokenTextLayerPartFeatureComponent', () => {
  let component: TokenTextLayerPartFeatureComponent;
  let fixture: ComponentFixture<TokenTextLayerPartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenTextLayerPartFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenTextLayerPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
