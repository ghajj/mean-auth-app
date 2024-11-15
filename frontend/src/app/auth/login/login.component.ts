import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Adjust the path as needed
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule], // Import ReactiveFormsModule if needed
})
export class LoginComponent {
    loginForm: FormGroup;
    loginError: string | null = null;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const formData = this.loginForm.value;
            this.authService.login(formData).subscribe({
                next: (response) => {
                    console.log("login successful");
                    localStorage.setItem('token', response.token); // Save token
                    console.log("is Authenticated", this.authService.isAuthenticated());
                    this.router.navigate(['/dashboard']); // Navigate to dashboard
                },

                error: (error) => {
                    console.error('Login failed', error);
                    this.loginError = 'Login failed. Please check your credentials and try again.';
                }
            });
        }
    }
}
