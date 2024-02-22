import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../guards/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  providers: [
    UserService,
    AuthGuard,
  ],
  imports: [
    MatListModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const jwtToken = localStorage.getItem('jwtToken') || '';

    this.userService.getUsers(jwtToken).subscribe((data) => {
      this.users = data.map(user => ({...user, status: user.status === 'true'}));
    });
  }
  saveUser(user: any) {
    this.userService.updateUserStatus(user.id, { status: user.status }).subscribe(
      response => console.log('User updated successfully:', response),
      error => console.error('Error updating user:', error)
    );
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
