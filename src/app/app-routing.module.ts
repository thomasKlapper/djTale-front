import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomListComponent } from './components/room-list-components/room-list/room-list.component';
import { IsLoggedInGuard } from './auth/guards/isLoggedInGuard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'room-list' },
  { path: 'register', loadChildren: './auth/auth.module#AuthModule', },
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'room-list', component: RoomListComponent, canActivate: [IsLoggedInGuard]
  },
  { path: '**', redirectTo: 'room-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
