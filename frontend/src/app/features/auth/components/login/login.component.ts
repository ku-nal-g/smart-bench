import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoginCredentials } from '../../../../models/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';
  showPassword = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';

      // Show loading spinner
      this.notificationService.showLoginSpinner();

      const credentials: LoginCredentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.notificationService.hideAllSpinners();
          this.isLoading = false;

          if (response.token || response.success !== false) {
            this.notificationService.showSuccess(
              'Welcome back! You have been successfully logged in.',
              'Login Successful'
            );
            this.errorMessage = '';
          } else {
            this.notificationService.showError(
              response.message || 'Invalid email or password. Please check your credentials and try again.',
              'Login Failed'
            );
            this.errorMessage = response.message || 'Invalid credentials. Please try again.';
          }
        },
        error: (error) => {
          this.notificationService.hideAllSpinners();
          this.isLoading = false;

          this.notificationService.showError(
            'Login failed. Please check your credentials and try again.',
            'Login Failed'
          );
          this.errorMessage = 'Login failed. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();

      if (this.loginForm.invalid) {
        this.notificationService.showWarning(
          'Please fill in all required fields correctly.',
          'Form Validation'
        );
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  fillCredentials(email: string, password: string): void {
    this.loginForm.patchValue({
      email: email,
      password: password
    });
    // Clear any existing error messages
    this.errorMessage = '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter methods for easy access in template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
