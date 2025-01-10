import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authenticateGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si el usuario está autenticado
  if (!authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

 // Verificamos si la ruta tiene roles requeridos definidos
 const requiredRoles = route.data['role'] as Array<string>;
 if (!requiredRoles || requiredRoles.length === 0) {
   // Si no hay roles definidos en la ruta, permitir acceso
   return true;
 }

  // Obtener los roles del usuario desde AuthService
  const userRoles = authService.getRole() || "";

  // Verificar si el usuario tiene al menos uno de los roles requeridos
  const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

  if (!hasRequiredRole) {
    // Redirigir a una página de acceso no autorizado o a donde desees
    router.navigate(['/']);
    return false;
  }
 return true;
};
