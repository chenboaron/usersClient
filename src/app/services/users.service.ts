import { Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public allUsers: User[] = [];
  userUpdate: User | undefined;
  public isEditMode: boolean = false;

  private getAll = gql`
  query
  {
    getAllUsers {
      id,
      fullName,
      email,
      address,
      acl,
      lat,
      lon
    }

  }`;

  private createUserQuery = gql`
  mutation addUser($user :  UserInputDTO!)
{
  addUser(user : $user)
  {
    id,
   	fullName,
    email,
    address,
    acl,
    lat,
    lon

  }
}`;


  private updateUserQuery =gql`
  mutation updateUser($user :  UserInputDTO!)
{
  updateUser(user : $user)
  {
    id,
   	fullName,
    email,
    address,
    acl,
    lat,
    lon

  }
}`;

  private deleteUserQuery = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id,
      fullName,
    }
  }`;

  constructor(private apollo: Apollo) { }

  getAllUsers() {
    return this.apollo.query({ query: this.getAll });
  }

  updateUser(user: User) {
    return this.apollo.mutate({ mutation: this.updateUserQuery, variables: { user } })
  }

  createUser(user: User) {
    return this.apollo.mutate({ mutation: this.createUserQuery, variables: { user } })
  }

  deleteUser(id: string) {
    return this.apollo.mutate({ mutation: this.deleteUserQuery, variables: { id } })
  }


}
