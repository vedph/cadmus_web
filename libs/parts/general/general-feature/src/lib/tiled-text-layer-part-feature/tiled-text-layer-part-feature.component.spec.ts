import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledTextLayerPartFeatureComponent } from './tiled-text-layer-part-feature.component';
import { CurrentItemBarComponent, FeaturesUiModule } from '@cadmus/features/features-ui';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material';

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
        UiModule,
        FeaturesUiModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        },
        {
          provide: 'apiEndpoint',
          useValue: 'http://localhost:60304/api/'
        },
        {
          provide: 'databaseId',
          useValue: 'cadmus'
        },
        {
          provide: MatDialog,
          useValue: {
            open: (_: any) => { },
            closeAll: (): void => undefined
          }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => { },
            afterClosed: () => { }
          }
        }
      ],
      declarations: [
        CurrentItemBarComponent,
        TiledTextLayerPartFeatureComponent
      ]
    })
    .compileComponents();
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
