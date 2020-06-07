import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledDataComponent } from './tiled-data.component';
import { UiModule } from '@cadmus/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TiledDataComponent', () => {
  let component: TiledDataComponent;
  let fixture: ComponentFixture<TiledDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        CoreModule,
        MaterialModule,
        UiModule,
      ],
      declarations: [TiledDataComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
