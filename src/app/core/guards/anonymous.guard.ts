import { map, tap } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const anonymousGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  return userService.loadUserInfo().pipe(
    map(status => !status),
    tap(res => !res && router.navigateByUrl('/actions/home'))
  );
};
