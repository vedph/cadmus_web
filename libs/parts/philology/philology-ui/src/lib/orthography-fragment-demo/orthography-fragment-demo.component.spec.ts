import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { OrthographyFragmentDemoComponent } from './orthography-fragment-demo.component';
import { OrthographyFragmentComponent } from '../orthography-fragment/orthography-fragment.component';
import { MspOperationComponent } from '../msp-operation/msp-operation.component';
import { UiModule } from '@cadmus/ui';

describe('OrthographyFragmentDemoComponent', () => {
  let component: OrthographyFragmentDemoComponent;
  let fixture: ComponentFixture<OrthographyFragmentDemoComponent>;

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
        MspOperationComponent,
        OrthographyFragmentComponent,
        OrthographyFragmentDemoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthographyFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
