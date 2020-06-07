import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenTextLayerPartFeatureComponent } from './token-text-layer-part-feature.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { CurrentItemBarComponent, CurrentLayerPartBarComponent } from '@cadmus/features/features-ui';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreModule } from '@cadmus/core';
import { TILED_TEXT_PART_TYPEID } from '@cadmus/parts/general/general-ui';

describe('TokenTextLayerPartFeatureComponent', () => {
  let component: TokenTextLayerPartFeatureComponent;
  let fixture: ComponentFixture<TokenTextLayerPartFeatureComponent>;

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
        CoreModule,
        MaterialModule,
        UiModule,
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
      declarations: [
        CurrentItemBarComponent,
        CurrentLayerPartBarComponent,
        TokenTextLayerPartFeatureComponent,
      ],
    }).compileComponents();
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
