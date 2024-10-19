import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@auth0/nextjs-auth0/edge';

export default withAuth(
  // Este callback se ejecuta si el usuario está autenticado o no
  function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    if (!req.auth) {
      const loginUrl = new URL('/api/auth/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Si está autenticado, permitir el acceso a la ruta
    return NextResponse.next();
  },
  {
    // Definimos las rutas que queremos proteger
    callbacks: {
      authorized: ({ req }) => {
        const { pathname } = req.nextUrl;
        // Proteger únicamente las rutas '/dashboard' y '/profile'
        return ['/dashboard', '/profile'].some(path => pathname.startsWith(path));
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard', '/profile'], // Rutas protegidas por el middleware
};