import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { TableComponent } from './components/table/table.component';
import { AddUserComponent } from './components/add-user/add-user.component'

const routes: Routes = [
  { path: '', redirectTo: 'addUser', pathMatch: 'full' },
  { path: "map", component: MapComponent },
  { path: "table", component: TableComponent },
  { path: "addUser", component: AddUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
