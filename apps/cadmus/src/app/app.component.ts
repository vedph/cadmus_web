import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MspOperation } from '@cadmus/core';

@Component({
  selector: 'cadmus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cadmus';

  public test: FormGroup;
  public text: FormControl;
  public operation: MspOperation;

  constructor(formBuilder: FormBuilder) {
    this.text = formBuilder.control(null, Validators.required);
    this.test = formBuilder.group({
      text: this.text
    });
  }

  public parseMsp() {
    if (!this.test.valid) {
      return;
    }
    this.operation = MspOperation.parse(this.text.value);
  }
}
