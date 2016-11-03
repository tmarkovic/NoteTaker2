import { NgModule } from '@angular/core';
import { NotesService, NotesComponent } from './';

@NgModule({
    imports: [],
    exports: [NotesComponent],
    declarations: [NotesComponent],
    providers: [NotesService],
})
export class NotesModule { }
