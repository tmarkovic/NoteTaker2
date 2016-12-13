export class NoteModel {

    title: string;
    text: string;
    id?: string;
    userId?: string;
    color?: string;

    constructor(title: string, text: string) {
        this.title = title;
        this.text = text;

    }

}
