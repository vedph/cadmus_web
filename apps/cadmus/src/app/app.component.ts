import { Component } from '@angular/core';
import { DialogService } from '@cadmus/ui';
import { OrthographyFragment } from '@cadmus/parts/philology/philology-ui';

@Component({
  selector: 'cadmus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public dialogResult: boolean;
  public orthographyFragment: OrthographyFragment;

  constructor(private _dialogService: DialogService) {
    this.orthographyFragment = {
      location: '2.2',
      baseText: 'bixit',
      standard: null,
      operations: []
    };
  }

  public showDialog() {
    this._dialogService.confirm('Armageddon', 'Destroy the whole Earth?')
      .subscribe(r => {
        this.dialogResult = r;
      });
  }
}
