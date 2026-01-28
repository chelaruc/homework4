import { Component, OnInit, signal } from "@angular/core";
import { UsersService } from "../users.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-details.html',
  styleUrl: './users-details.scss'
})
export class UsersDetailsComponent {
  user = signal<any>(null);
  repos = signal<any[]>([]);
  loading = signal(false);

  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute
  ) {
    const username = this.route.snapshot.paramMap.get('login');
    if (username) {
      this.loadUser(username);
    }
  }

  loadUser(username: string) {
    this.loading.set(true);

    this.usersService.getUser(username).subscribe({
      next: (res) => this.user.set(res),
      error: () => this.loading.set(false)
    });

    this.usersService.getUserRepos(username).subscribe({
      next: (res) => {
        this.repos.set(res);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}