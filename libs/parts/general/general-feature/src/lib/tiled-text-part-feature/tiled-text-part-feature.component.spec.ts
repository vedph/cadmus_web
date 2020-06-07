import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledTextPartFeatureComponent } from './tiled-text-part-feature.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import {
  FeaturesUiModule,
} from '@cadmus/features/features-ui';
import { CoreModule } from '@cadmus/core';
import {
  TILED_TEXT_PART_TYPEID,
  TiledDataComponent,
  TiledTextPartComponent,
  TextTileComponent,
} from '@cadmus/parts/general/general-ui';

describe('TiledTextPartFeatureComponent', () => {
  let component: TiledTextPartFeatureComponent;
  let fixture: ComponentFixture<TiledTextPartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AkitaNgDevtools.forRoot(),
        MomentModule,
        MaterialModule,
        CoreModule,
        UiModule,
        FeaturesUiModule,
      ],
      providers: [
        {
          provide: 'partEditorKeys',
          useValue: {
            [TILED_TEXT_PART_TYPEID]: {
              part: 'general',
            },
          },
        },
      ],
      declarations: [
        TiledDataComponent,
        TextTileComponent,
        TiledTextPartComponent,
        TiledTextPartFeatureComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledTextPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
