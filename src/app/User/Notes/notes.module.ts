import { ValidationModule } from '../../Shared/Validation/validation.module';
import { NoteListComponent } from './NoteList/note-list.component';
import { FlashMessageModule } from './../../Shared/FlashMessage/flash-message.module';
import { NgModule } from '@angular/core';
import { NotesService, NotesComponent } from './';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteEditorComponent } from './NoteEditor/note-editor.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TagDirective } from '../../Shared/Directives/Tag/tag.directive';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, FlashMessageModule, CommonModule, BrowserModule, ValidationModule],
    exports: [NotesComponent],
    declarations: [NotesComponent, NoteEditorComponent, NoteListComponent, TagDirective],
    providers: [NotesService],
})
export class NotesModule { }
