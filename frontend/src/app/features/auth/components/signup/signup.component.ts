import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;
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

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['EMPLOYEE', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.signupForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Show loading spinner
      this.notificationService.showLoginSpinner();

      const { confirmPassword, ...userData } = this.signupForm.value;

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.notificationService.hideAllSpinners();
          this.isLoading = false;

          if (response.success !== false) {
            this.notificationService.showSuccess(
              'Account created successfully! Please login with your credentials.',
              'Registration Successful'
            );
            this.successMessage = 'Account created successfully! Redirecting to login...';

            // Redirect to login after success
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 2000);
          } else {
            this.notificationService.showError(
              response.message || 'Registration failed. Please try again.',
              'Registration Failed'
            );
            this.errorMessage = response.message || 'Registration failed. Please try again.';
          }
        },
        error: (error) => {
          this.notificationService.hideAllSpinners();
          this.isLoading = false;

          this.notificationService.showError(
            'Registration failed. Please check your information and try again.',
            'Registration Error'
          );
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();

      if (this.signupForm.invalid) {
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

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToLogin(): void {
    // Don't navigate if user is logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.router.navigate(['/auth/login']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter methods for easy access in template
  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get role() {
    return this.signupForm.get('role');
  }
}
