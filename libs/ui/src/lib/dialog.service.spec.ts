import { TestBed, inject } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { Provider } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

describe('DialogService', () => {
  const mockMatDialog = {
    closeAll: (): void => undefined
  };

  beforeEach(() => {
    const mockProviders: Provider[] = [
      { provide: MatDialog, useValue: mockMatDialog },
      // https://github.com/angular/components/issues/8419
      {
        provide: MatDialogRef,
        useValue: {
          close: (dialogResult: any) => { }
        }
      }
    ];

    TestBed.configureTestingModule({
      providers: [mockProviders, DialogService]
    });
  });

  it('should be created', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));
});
