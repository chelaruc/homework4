import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersListComponent {
  users = signal<any[]>([]);
  since = signal(0);
  loading = signal(false);

  constructor(private readonly usersService: UsersService) {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);

    this.usersService.getUsers(this.since()).subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          this.loading.set(false);
          return;
        }

        this.users.update(prev => [...prev, ...res]);
        this.since.set(res.at(-1)!.id);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
