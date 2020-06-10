import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { RouterTestingModule } from '@angular/router/testing';
import { WitnessesFragmentFeatureComponent } from './witnesses-fragment-feature.component';
import {
  WitnessesFragmentComponent,
  WITNESSES_FRAGMENT_TYPEID,
} from '@cadmus/parts/philology/philology-ui';
import { CurrentItemBarComponent } from '@cadmus/features/features-ui';
import { MomentModule } from 'ngx-moment';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MarkdownModule } from 'ngx-markdown';

describe('WitnessesFragmentFeatureComponent', () => {
  let component: WitnessesFragmentFeatureComponent;
  let fixture: ComponentFixture<WitnessesFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MonacoEditorModule.forRoot(),
        MarkdownModule.forRoot(),
        MomentModule,
        MaterialModule,
        UiModule,
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: 'partEditorKeys',
          useValue: {
            [WITNESSES_FRAGMENT_TYPEID]: {
              part: 'philology',
            },
          },
        },
      ],
      declarations: [
        CurrentItemBarComponent,
        WitnessesFragmentComponent,
        WitnessesFragmentFeatureComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitnessesFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
