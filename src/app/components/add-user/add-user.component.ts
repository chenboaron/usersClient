import { Component } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  public userFrom: FormGroup | any;
  public id: FormControl | any;
  public fullName: FormControl | any;
  public email: FormControl | any;
  public address: FormControl | any;
  public acl: FormControl | any;
  public lat: FormControl | any;
  public lon: FormControl | any;

  constructor(public usersService: UsersService) {

  }


  ngOnInit(): void {
    this.id = new FormControl("");
    this.fullName = new FormControl("", [Validators.required]);
    this.email = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]);
    this.address = new FormControl("", Validators.required);
    this.acl = new FormControl("", Validators.required);
    this.lat = new FormControl("", [Validators.required]);
    this.lon = new FormControl("", [Validators.required]);

    this.userFrom = new FormGroup({
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      address: this.address,
      acl: this.acl,
      lat: this.lat,
      lon: this.lon
    })
    if (this.usersService.isEditMode) {
      console.log(this.usersService.userUpdate);
      if(this.usersService.userUpdate !== undefined){
        this.userFrom.controls['id'].setValue(this.usersService.userUpdate.id);
        this.userFrom.controls['fullName'].setValue(this.usersService.userUpdate.fullName);
        this.userFrom.controls['email'].setValue(this.usersService.userUpdate.email);
        this.userFrom.controls['address'].setValue(this.usersService.userUpdate.address);
        this.userFrom.controls['acl'].setValue(this.usersService.userUpdate.acl);
        this.userFrom.controls['lat'].setValue(this.usersService.userUpdate.lat);
        this.userFrom.controls['lon'].setValue(this.usersService.userUpdate.lon);
      }
      }


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.usersService.isEditMode = false;
    this.usersService.userUpdate = undefined;

  }


  submit() {


    if (this.usersService.isEditMode) {
      let user: User = new User(this.userFrom.value.id, this.userFrom.value.fullName, this.userFrom.value.email, this.userFrom.value.address, this.userFrom.value.acl, +this.userFrom.value.lat, +this.userFrom.value.lon);
      this.usersService.updateUser(user).subscribe(res => {
        this.usersService.isEditMode = false;
        this.usersService.userUpdate = undefined;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'The user is updated',
          showConfirmButton: false,
          timer: 1500
        })

      })
    }else{
      let id = uuid();
      let user: User = new User(id, this.userFrom.value.fullName, this.userFrom.value.email, this.userFrom.value.address, this.userFrom.value.acl, +this.userFrom.value.lat, +this.userFrom.value.lon);
      this.usersService.createUser(user).subscribe(res=> {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'The user is saved',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }




  }

}
