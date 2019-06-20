import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomListComponent } from './components/room-list-components/room-list/room-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'room-list' },
  { path: 'auth/register', loadChildren: './auth/auth.module#AuthModule', },
  {
    path: 'auth/login',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'room-list', component: RoomListComponent
  },
  { path: '**', redirectTo: 'room-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
