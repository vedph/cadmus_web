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
import { CommentFragmentDemoComponent } from './comment-fragment-demo/comment-fragment-demo.component';
import { CategoriesPartComponent } from './categories-part/categories-part.component';
import { CategoriesPartDemoComponent } from './categories-part-demo/categories-part-demo.component';
import { KeywordsPartComponent } from './keywords-part/keywords-part.component';
import { KeywordsPartDemoComponent } from './keywords-part-demo/keywords-part-demo.component';
import { HistoricalDatePartComponent } from './historical-date-part/historical-date-part.component';
import { HistoricalDatePartDemoComponent } from './historical-date-part-demo/historical-date-part-demo.component';
import { ChronologyFragmentComponent } from './chronology-fragment/chronology-fragment.component';
import { ChronologyFragmentDemoComponent } from './chronology-fragment-demo/chronology-fragment-demo.component';
import { TiledTextPartComponent } from './tiled-text-part/tiled-text-part.component';
import { TextTileComponent } from './text-tile/text-tile.component';
import { TiledTextPartDemoComponent } from './tiled-text-part-demo/tiled-text-part-demo.component';
import { TiledDataComponent } from './tiled-data/tiled-data.component';
import { IndexKeywordsPartComponent } from './index-keywords-part/index-keywords-part.component';

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
    CategoriesPartComponent,
    CategoriesPartDemoComponent,
    ChronologyFragmentComponent,
    ChronologyFragmentDemoComponent,
    CommentFragmentComponent,
    CommentFragmentDemoComponent,
    HistoricalDatePartComponent,
    HistoricalDatePartDemoComponent,
    IndexKeywordsPartComponent,
    KeywordsPartComponent,
    KeywordsPartDemoComponent,
    NotePartComponent,
    NotePartDemoComponent,
    TextTileComponent,
    TiledTextPartComponent,
    TiledTextPartDemoComponent,
    TokenTextPartComponent,
    TokenTextPartDemoComponent,
    TiledDataComponent
  ],
  exports: [
    CategoriesPartComponent,
    CategoriesPartDemoComponent,
    ChronologyFragmentComponent,
    ChronologyFragmentDemoComponent,
    CommentFragmentComponent,
    CommentFragmentDemoComponent,
    HistoricalDatePartComponent,
    HistoricalDatePartDemoComponent,
    IndexKeywordsPartComponent,
    KeywordsPartComponent,
    KeywordsPartDemoComponent,
    NotePartComponent,
    NotePartDemoComponent,
    TextTileComponent,
    TiledTextPartComponent,
    TiledTextPartDemoComponent,
    TokenTextPartComponent,
    TokenTextPartDemoComponent
  ]
})
export class GeneralUiModule {}
