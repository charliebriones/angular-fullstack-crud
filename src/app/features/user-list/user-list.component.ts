import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { baseImports } from '../../shared/base-imports';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/modal/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../../core/models/user.interface';
import { UserDto } from '../../services/api-client';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [...baseImports],
  styleUrls: ['user-list.component.scss'],
  templateUrl: 'user-list.component.html',
})
export class UserList {
  displayedColumns: string[] = ['name', 'username', 'email', 'actions'];
  userService = inject(UserService);
  dialog = inject(MatDialog);
  router = inject(Router);

  // Use MatTableDataSource instead of Observable for table
  dataSource = new MatTableDataSource<UserDto>([]);

  ngOnInit() {
    // Fetch users and update table
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = users ?? [];
    });
  }

  goToDetail(user: any) {
    this.router.navigate(['detail', user.id]);
  }

  deleteUser(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            console.log('User deleted', user.id);
            this.userService.getUsers().subscribe((users) => {
              this.dataSource.data = users ?? [];
            });
          },
          error: (err) => console.error('Delete failed', err),
        });
      }
    });
  }
}
