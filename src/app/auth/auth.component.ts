import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = false;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService,
        private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        if(!authForm.valid) {
            return;
        }

        this.isLoading = true;

        const email = authForm.value.email;
        const password = authForm.value.password;

        let authObs: Observable<AuthResponseData>;

        if(!this.isLoginMode) {
            authObs = this.authService.signup(email, password);
        } else {
            authObs = this.authService.login(email, password);
        }

        authObs.subscribe(response => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
        });

        authForm.reset();
    }
}