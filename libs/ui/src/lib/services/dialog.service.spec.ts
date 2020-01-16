import { TestBed, inject } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { Provider } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';

describe('DialogService', () => {
  beforeEach(() => {
      // https://github.com/angular/components/issues/8419
      const mockProviders: Provider[] = [
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
      }
    ];

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatDialogModule
      ],
      providers: [
        mockProviders,
        DialogService
      ]
    });
  });

  it('should be created', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));
});
