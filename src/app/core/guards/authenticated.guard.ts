import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  return userService.loadUserInfo().pipe(tap(result => !result && router.navigateByUrl('/auth/login')));
};
