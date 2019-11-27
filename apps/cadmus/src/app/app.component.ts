import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MspOperation, DifferResultToMspAdapter } from '@cadmus/core';
import { diff_match_patch } from 'diff-match-patch';
import { DialogService } from '@cadmus/ui';
import { OrthographyFragment } from '@cadmus/parts/philology/philology-ui';

@Component({
  selector: 'cadmus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly _differ: diff_match_patch;
  private readonly _adapter: DifferResultToMspAdapter;

  title = 'cadmus';
  public dialogResult: boolean;

  public parseGroup: FormGroup;
  public text: FormControl;
  public operation: MspOperation;

  public diffGroup: FormGroup;
  public textA: FormControl;
  public textB: FormControl;

  public operations: MspOperation[];

  public sampleMsp: MspOperation;

  public orthographyFragment: OrthographyFragment;

  constructor(formBuilder: FormBuilder,
    private _dialogService: DialogService) {
    this._differ = new diff_match_patch();
    this._adapter = new DifferResultToMspAdapter();

    // forms
    this.text = formBuilder.control(null, Validators.required);
    this.parseGroup = formBuilder.group({
      text: this.text
    });

    this.textA = formBuilder.control('bixit', Validators.required);
    this.textB = formBuilder.control('vixit', Validators.required);
    this.diffGroup = formBuilder.group({
      textA: this.textA,
      textB: this.textB
    });

    this.sampleMsp = MspOperation.parse('"b"@1="v"');

    this.orthographyFragment = {
      location: '2.2',
      baseText: 'bixit',
      standard: null,
      operations: []
    };
  }

  public parseMsp() {
    if (!this.parseGroup.valid) {
      return;
    }
    this.operation = MspOperation.parse(this.text.value);
  }

  public diffMsp() {
    if (!this.diffGroup.valid) {
      return;
    }
    const result = this._differ.diff_main(this.textA.value, this.textB.value);
    this.operations = this._adapter.adapt(result);
  }

  public showDialog() {
    this._dialogService.confirm('Armageddon', 'Destroy the whole Earth?')
      .subscribe(r => {
        this.dialogResult = r;
      });
  }
}
