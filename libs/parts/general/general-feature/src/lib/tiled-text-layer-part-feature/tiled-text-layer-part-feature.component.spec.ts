import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledTextLayerPartFeatureComponent } from './tiled-text-layer-part-feature.component';
import { FeaturesUiModule } from '@cadmus/features/features-ui';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreModule } from '@cadmus/core';
import {
  TILED_TEXT_PART_TYPEID,
  TextTileComponent,
} from '@cadmus/parts/general/general-ui';

describe('TiledTextLayerPartFeatureComponent', () => {
  let component: TiledTextLayerPartFeatureComponent;
  let fixture: ComponentFixture<TiledTextLayerPartFeatureComponent>;

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
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: 'partEditorKeys',
          useValue: {
            [TILED_TEXT_PART_TYPEID]: {
              part: 'general',
            },
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: (_: any) => {},
            closeAll: (): void => undefined,
          },
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => {},
            afterClosed: () => {},
          },
        },
      ],
      declarations: [TextTileComponent, TiledTextLayerPartFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledTextLayerPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
