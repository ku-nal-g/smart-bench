import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

export interface ToastConfig {
  title?: string;
  message: string;
  timeOut?: number;
  closeButton?: boolean;
  progressBar?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  // Toast Notification Methods
  showSuccess(message: string, title?: string, config?: Partial<ToastConfig>): void {
    this.toastr.success(message, title, {
      timeOut: config?.timeOut || 3000,
      closeButton: config?.closeButton ?? true,
      progressBar: config?.progressBar ?? true,
      positionClass: 'toast-top-right',
      enableHtml: true
    });
  }

  showError(message: string, title?: string, config?: Partial<ToastConfig>): void {
    this.toastr.error(message, title, {
      timeOut: config?.timeOut || 5000,
      closeButton: config?.closeButton ?? true,
      progressBar: config?.progressBar ?? true,
      positionClass: 'toast-top-right',
      enableHtml: true
    });
  }

  showWarning(message: string, title?: string, config?: Partial<ToastConfig>): void {
    this.toastr.warning(message, title, {
      timeOut: config?.timeOut || 4000,
      closeButton: config?.closeButton ?? true,
      progressBar: config?.progressBar ?? true,
      positionClass: 'toast-top-right',
      enableHtml: true
    });
  }

  showInfo(message: string, title?: string, config?: Partial<ToastConfig>): void {
    this.toastr.info(message, title, {
      timeOut: config?.timeOut || 3000,
      closeButton: config?.closeButton ?? true,
      progressBar: config?.progressBar ?? true,
      positionClass: 'toast-top-right',
      enableHtml: true
    });
  }

  // Custom toast with configuration
  showToast(type: 'success' | 'error' | 'warning' | 'info', config: ToastConfig): void {
    const options = {
      timeOut: config.timeOut || 3000,
      closeButton: config.closeButton ?? true,
      progressBar: config.progressBar ?? true,
      positionClass: 'toast-top-right',
      enableHtml: true
    };

    switch (type) {
      case 'success':
        this.toastr.success(config.message, config.title, options);
        break;
      case 'error':
        this.toastr.error(config.message, config.title, options);
        break;
      case 'warning':
        this.toastr.warning(config.message, config.title, options);
        break;
      case 'info':
        this.toastr.info(config.message, config.title, options);
        break;
    }
  }

  // Clear all toasts
  clearToasts(): void {
    this.toastr.clear();
  }

  // Spinner Methods
  showSpinner(name?: string, options?: any): void {
    this.spinner.show(name, {
      size: 'medium',
      color: '#007bff',
      type: 'ball-scale-multiple',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      fullScreen: true,
      template: `
        <div class="custom-spinner-template">
          <div class="spinner-content">
            <p style="color: white; margin-top: 20px;">Loading...</p>
          </div>
        </div>
      `,
      ...options
    });
  }

  showSpinnerWithMessage(message: string, name?: string): void {
    this.spinner.show(name, {
      size: 'medium',
      color: '#007bff',
      type: 'ball-scale-multiple',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      fullScreen: true,
      template: `
        <div class="custom-spinner-template">
          <div class="spinner-content">
            <p style="color: white; margin-top: 20px; font-size: 16px;">${message}</p>
          </div>
        </div>
      `
    });
  }

  hideSpinner(name?: string): void {
    this.spinner.hide(name);
  }

  // Check if spinner is showing (Note: isSpinning method may not be available in all versions)
  // Use this method with caution or implement your own state tracking
  isSpinnerShowing(name?: string): boolean {
    // Alternative implementation: track spinner state manually
    // For now, we'll return false as a fallback
    return false;
  }

  // Quick Methods for Common Use Cases
  showLoadingSpinner(): void {
    this.showSpinnerWithMessage('Please wait...');
  }

  showSavingSpinner(): void {
    this.showSpinnerWithMessage('Saving...');
  }

  showLoginSpinner(): void {
    this.showSpinnerWithMessage('Logging in...');
  }

  showProcessingSpinner(): void {
    this.showSpinnerWithMessage('Processing...');
  }

  hideAllSpinners(): void {
    this.spinner.hide();
  }
}
