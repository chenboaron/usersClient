import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  dataSource: any;
  displayedColumns: string[] = ['fullName', 'email', 'address', 'acl', 'lat', 'lon', 'action'];

  constructor(public usersService: UsersService, private router: Router) { }



  ngOnInit() {

    this.usersService.getAllUsers().subscribe((res: any) => {
      console.log(res.data.getAllUsers);
      this.usersService.allUsers = res.data.getAllUsers;
      this.dataSource = new MatTableDataSource(this.usersService.allUsers);
    }, error => {
      console.log(error);
    });
  }


  onClickDelete(id: string) {
    this.usersService.deleteUser(id).subscribe(res => {
      this.usersService.allUsers = this.usersService.allUsers.filter(item => {
        return item.id !== id
      })
      this.dataSource = new MatTableDataSource(this.usersService.allUsers);
    })
  }


  onClickEdit(id: string) {
    let user = this.usersService.allUsers.find(x=> x.id === id);
    this.usersService.userUpdate = user;
    this.usersService.isEditMode = true;
    this.router.navigateByUrl('/addUser');
  }
}


