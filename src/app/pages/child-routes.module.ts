import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { RxjsComponent } from './rxjs/rxjs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'} },
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario'} },

      //Rutas de admin
     // { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación'} },
      { path: 'usuarios',  component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación'} },
];
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [
    RouterModule
  ]
})
export class ChildRoutesModule { }
