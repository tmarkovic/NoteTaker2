import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../User/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService) { }

    canActivate() {
        return this.userService.isAuthenticated;
    }
}