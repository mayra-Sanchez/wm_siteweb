import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
  username: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.username = this.apiService.getUsername();
  }

  logout(): void {
    this.apiService.logout();
  }
}
