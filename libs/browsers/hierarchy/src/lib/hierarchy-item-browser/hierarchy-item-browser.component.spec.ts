import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyItemBrowserComponent } from './hierarchy-item-browser.component';
import { CoreModule } from '@cadmus/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from '@cadmus/api';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { GeneralUiModule } from '@cadmus/parts/general/general-ui';
import { EditStateModule } from '@cadmus/features/edit-state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('HierarchyItemBrowserComponent', () => {
  let component: HierarchyItemBrowserComponent;
  let fixture: ComponentFixture<HierarchyItemBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        CoreModule,
        ApiModule,
        CoreModule,
        MaterialModule,
        UiModule,
        GeneralUiModule,
        EditStateModule,
      ],
      declarations: [HierarchyItemBrowserComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyItemBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
