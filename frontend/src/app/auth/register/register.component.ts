import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Adjust the path as needed
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule], // Import ReactiveFormsModule if needed
})
export class RegisterComponent {
    registerForm: FormGroup;
    registrationSuccess = false;
    registrationError: string | null = null;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
        }, { validator: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: FormGroup) {
        return form.get('password')?.value === form.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const formData = this.registerForm.value;
            console.log("fornData", formData);
            this.authService.register(formData).subscribe({
                next: (response) => {
                    console.log('Registration successful', response);
                    this.registrationSuccess = true;
                    this.registrationError = null;
                    this.router.navigate(['/login']); // Navigate to login on success
                },
                error: (error) => {
                    console.error('Registration failed', error);
                    this.registrationError = 'Registration failed. Please try again.';
                }
            });
        }
    }
}
