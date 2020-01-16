import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JsonEditorResourcesComponent } from './json-editor-resources.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';
import { ErrorListComponent } from '../error-list/error-list.component';
import { DialogService } from '../../services/dialog.service';
// note we import from @angular/material/dialog, not just @angular/material!
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

describe('JsonEditorResourcesComponent', () => {
  let component: JsonEditorResourcesComponent;
  let fixture: ComponentFixture<JsonEditorResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        MonacoEditorModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        },
        {
          provide: NGX_MONACO_EDITOR_CONFIG,
          useValue: {}
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
        },
        DialogService
      ],
      declarations: [
        ErrorListComponent,
        JsonEditorResourcesComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
