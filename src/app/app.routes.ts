import { Routes } from '@angular/router';
import { Accesorios } from './view/accesorios/accesorios';
import { Usuario } from './view/usuario/usuario';
import { Competitions } from './view/competitions/competitions';
import { Home } from './view/home/home';
import { Login } from './view/login/login';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/auth.guard';
import { Registro } from './view/registro/registro';

export const routes: Routes = [
{path: "Accesorios", component:Accesorios, canActivate:[authGuard]},
{path:"", component:Home},
{path:"Usuario", component:Usuario, canActivate:[authGuard]},
{path:"Competitions", component:Competitions, canActivate:[authGuard]},
{path: "Login", component: Login, canActivate:[noAuthGuard]},
{path: 'Registro', component: Registro, canActivate: [authGuard] },

];
