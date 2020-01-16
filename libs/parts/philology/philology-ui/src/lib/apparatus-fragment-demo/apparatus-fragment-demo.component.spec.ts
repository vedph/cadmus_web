import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { ApparatusFragmentDemoComponent } from './apparatus-fragment-demo.component';
import { ApparatusFragmentComponent } from '../apparatus-fragment/apparatus-fragment.component';
import { UiModule } from '@cadmus/ui';

describe('ApparatusFragmentDemoComponent', () => {
  let component: ApparatusFragmentDemoComponent;
  let fixture: ComponentFixture<ApparatusFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UiModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        }
      ],
      declarations: [
        ApparatusFragmentComponent,
        ApparatusFragmentDemoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparatusFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
