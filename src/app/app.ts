import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './core/services/user.service';
import { LoadingScreenComponent } from './shared/loading-screen.component/loading-screen.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LoadingScreenComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  loading = true;
  userService = inject(UserService);

  ngOnInit() {
    // Call a lightweight ping endpoint to wake Azure Free Tier backend
    this.userService.getUsers().subscribe({
      next: () => (this.loading = false),
      error: () => {
        // Even if ping fails, hide after 5s to avoid blocking UI
        setTimeout(() => (this.loading = false), 5000);
      },
    });
  }
}
