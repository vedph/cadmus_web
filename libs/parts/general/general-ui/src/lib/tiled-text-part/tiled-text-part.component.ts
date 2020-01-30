import { Component, OnInit } from '@angular/core';
import { DialogService, ModelEditorComponentBase } from '@cadmus/ui';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ThesaurusEntry } from '@cadmus/core';
import { TiledTextPart } from '../tiled-text-part';
import { AuthService } from '@cadmus/api';

@Component({
  selector: 'cadmus-tiled-text-part',
  templateUrl: './tiled-text-part.component.html',
  styleUrls: ['./tiled-text-part.component.css']
})
export class TiledTextPartComponent
  extends ModelEditorComponentBase<TiledTextPart>
  implements OnInit {

    // TODO: add properties

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
  }

  ngOnInit() {
    this.initEditor();
  }

  protected onModelSet(model: TiledTextPart): void {
    throw new Error('Method not implemented.');
  }
  protected getModelFromForm(): TiledTextPart {
    throw new Error('Method not implemented.');
  }
}
