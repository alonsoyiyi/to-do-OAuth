'use client';

import { Button } from "@/components/ui/button";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function LogoutButton() {
    const { user, isLoading } = useUser();

    const handleLogout = () => {
        window.location.href = `/api/auth/logout`; // Redirige a tu endpoint de logout
    }

    if (isLoading) return null; // Opcional: puedes mostrar un loader aquí

    return (
        user && (
            <Button onClick={handleLogout} variant="outline">
                Cerrar Sesión
            </Button>
        )
    );
}
