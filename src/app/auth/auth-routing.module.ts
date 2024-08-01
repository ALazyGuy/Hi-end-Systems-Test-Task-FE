import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { anonymousGuard } from '../core/guards/anonymous.guard';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent, canActivate: [anonymousGuard]},
  {path: 'register', component: RegisterPageComponent, canActivate: [anonymousGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
