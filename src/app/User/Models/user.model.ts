export interface AddUserModel {
    username: string;
    password: string;
    passwordConfirmation: string;
}

export interface UsernameAvailability {
    username: string;
    available: boolean;
}
