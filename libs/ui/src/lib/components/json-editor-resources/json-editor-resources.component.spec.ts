import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorResourcesComponent } from './json-editor-resources.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ErrorListComponent } from '../error-list/error-list.component';
import { DialogService } from '../../services/dialog.service';

describe('JsonEditorResourcesComponent', () => {
  let component: JsonEditorResourcesComponent;
  let fixture: ComponentFixture<JsonEditorResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        MonacoEditorModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
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
