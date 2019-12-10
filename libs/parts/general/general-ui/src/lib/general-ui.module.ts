import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MarkdownModule } from 'ngx-markdown';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { NotePartComponent } from './note-part/note-part.component';
import { NotePartDemoComponent } from './note-part-demo/note-part-demo.component';
import { TokenTextPartComponent } from './token-text-part/token-text-part.component';
import { TokenTextPartDemoComponent } from './token-text-part-demo/token-text-part-demo.component';
import { CommentFragmentComponent } from './comment-fragment/comment-fragment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    MarkdownModule,
    // cadmus
    CoreModule,
    MaterialModule,
    UiModule
  ],
  declarations: [
    NotePartComponent,
    NotePartDemoComponent,
    TokenTextPartComponent,
    TokenTextPartDemoComponent,
    CommentFragmentComponent
  ],
  exports: [
    NotePartComponent,
    NotePartDemoComponent,
    TokenTextPartComponent,
    TokenTextPartDemoComponent,
    CommentFragmentComponent
  ]
})
export class GeneralUiModule {}
