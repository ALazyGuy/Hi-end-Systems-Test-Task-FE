import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
