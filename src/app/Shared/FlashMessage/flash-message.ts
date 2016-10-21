export enum FlashMessageType {
    ERROR,
    WARNING,
    SUCCES,
    INFO,
};

export interface FlashMessage {
    type: string;
    message: string;
    duration?: number;
}

