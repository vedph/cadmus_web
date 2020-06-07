import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyPartDemoComponent } from './bibliography-part-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { BibliographyPartComponent } from '../bibliography-part/bibliography-part.component';

describe('BibliographyPartDemoComponent', () => {
  let component: BibliographyPartDemoComponent;
  let fixture: ComponentFixture<BibliographyPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        MaterialModule,
        UiModule,
      ],
      declarations: [
        BibliographyPartComponent,
        BibliographyPartDemoComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliographyPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
