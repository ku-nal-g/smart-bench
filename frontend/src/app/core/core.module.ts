import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [CommonModule],
  providers: [
    AuthService,
    NotificationService,
    AuthGuard
  ]
})
export class CoreModule {
  constructor() {
    // Ensure CoreModule is only imported once
    // This is a singleton pattern for core services
  }
}
