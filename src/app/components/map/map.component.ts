import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { } from 'googlemaps';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  lat = 31.7683;
  lng = 35.2137;
  mapV: google.maps.Map | undefined;
  markersArray: google.maps.Marker[] = [];
  allUsers: User[] = []

  constructor(public usersService: UsersService) {

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.usersService.getAllUsers().subscribe((res: any) => {
      console.log(res.data.getAllUsers);
      this.allUsers = res.data.getAllUsers
      this.usersService.allUsers =  this.allUsers;
    }, error=>{
      console.log(error);
    });
  }


}
