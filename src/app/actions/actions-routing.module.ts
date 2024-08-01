import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authenticatedGuard } from '../core/guards/authenticated.guard';

const routes: Routes = [
  {path: 'home', component: HomePageComponent, canActivate: [authenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
