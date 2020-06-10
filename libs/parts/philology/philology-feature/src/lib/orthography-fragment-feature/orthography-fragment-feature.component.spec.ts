import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { RouterTestingModule } from '@angular/router/testing';
import { OrthographyFragmentFeatureComponent } from './orthography-fragment-feature.component';
import {
  OrthographyFragmentComponent,
  MspOperationComponent,
  ORTHOGRAPHY_FRAGMENT_TYPEID,
} from '@cadmus/parts/philology/philology-ui';
import { CurrentItemBarComponent } from '@cadmus/features/features-ui';
import { MomentModule } from 'ngx-moment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

describe('OrthographyFragmentFeatureComponent', () => {
  let component: OrthographyFragmentFeatureComponent;
  let fixture: ComponentFixture<OrthographyFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MomentModule,
        MaterialModule,
        UiModule,
      ],
      providers: [
        {
          provide: 'partEditorKeys',
          useValue: {
            [ORTHOGRAPHY_FRAGMENT_TYPEID]: {
              part: 'philology',
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
        MspOperationComponent,
        OrthographyFragmentComponent,
        OrthographyFragmentFeatureComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthographyFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
