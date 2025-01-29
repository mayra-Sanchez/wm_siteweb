import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(LoginComponent) loginComponent: LoginComponent | undefined;
  isAuthenticated: boolean = false;
  username: string = '';
  authStatusSubscription!: Subscription; // Using definite assignment assertion

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Subscribe to the authSubject to reactively update authentication status
    this.authStatusSubscription = this.apiService.authSubject.subscribe(status => {
      this.isAuthenticated = status;
      if (this.isAuthenticated) {
        const user = this.apiService.getUser();
        this.username = user.username || '';
      } else {
        this.username = '';
      }
    });
  }

  showLoginModal() {
    if (!this.isAuthenticated && this.loginComponent) {
      this.loginComponent.openLogin(); // Show modal if not authenticated
    }
  }

  logout() {
    this.apiService.logout();
    this.username = ''; // Clear username on logout
  }

  ngOnDestroy() {
    this.authStatusSubscription?.unsubscribe(); // Safely unsubscribe
  }

  mostrarCarritoModal = false;

  mostrarCarrito(): void {
    this.mostrarCarritoModal = true;
  }

}
