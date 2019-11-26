import { async, TestBed } from '@angular/core/testing';
import { UiModule } from './ui.module';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Provider } from '@angular/core';

describe('UiModule', () => {
  // https://stackoverflow.com/questions/56299501/how-to-inject-matdialog-in-a-test-module
  const mockMatDialog = {
    closeAll: (): void => undefined
  };

  beforeEach(async(() => {
    const mockProviders: Provider[] = [
      { provide: MatDialog, useValue: mockMatDialog },
      // https://github.com/angular/components/issues/8419
      {
        provide: MatDialogRef,
        useValue: {
          close: (dialogResult: any) => {}
        }
      }
    ];

    TestBed.configureTestingModule({
      imports: [UiModule],
      providers: [mockProviders]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiModule).toBeDefined();
  });
});
