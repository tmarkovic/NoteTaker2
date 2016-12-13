export enum FlashMessageType {
    ERROR,
    WARNING,
    SUCCES,
    INFO,
};

export class FlashMessage {
    private _types: string[] = ['is-danger', 'is-warning', 'is-success', 'is-info'];
    private _type: string = 'is-info';
    private _message: string;
    private _duration?: number;
    private _callbackFn: () => void;


    constructor(private flashMessageType: FlashMessageType, private __message?: string, private __duration?: number, callbackFn?: () => void) {
        this._type = this._types[flashMessageType];
        this._message = __message;
        this._duration = __duration;
        this._callbackFn = callbackFn;
    }

    get callbackFn(): () => void {
        return this._callbackFn;
    }
    get duration(): number {
        return this._duration;
    }

    get type(): string {
        return this._type;
    }

    get message(): string {
        return this._message;
    }

}

