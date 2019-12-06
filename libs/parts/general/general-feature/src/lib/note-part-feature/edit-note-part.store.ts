import { StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { NotePart } from '@cadmus/parts/general/general-ui';
import {
  EditPartState,
  EditPartStore
} from '@cadmus/features/edit-state';

export interface EditNotePartState extends EditPartState<NotePart> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'net.fusisoft.note' })
export class EditNotePartStore extends EditPartStore<NotePart> {}
