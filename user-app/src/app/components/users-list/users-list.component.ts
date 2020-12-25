import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  User: any = [];
  constructor(private apiService: ApiService) {
    this.readUser();
  }

  ngOnInit() {}

  readUser() {
    this.apiService.getUsers().subscribe((data) => {
     this.User = data;
    });
  }

  removeUser(user, index) {
    if (window.confirm('Are you sure to delete?')) {
        this.apiService.deleteUser(user._id).subscribe((data) => {
          this.User.splice(index, 1);
        }
      );
    }
  }

}
