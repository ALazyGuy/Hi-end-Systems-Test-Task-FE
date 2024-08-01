import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if(!!token) {
    req = req.clone({setHeaders: {token: `Bearer: ${token}`}});
  }

  return next(req);
};
