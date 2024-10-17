'use client'

import { useState, useEffect } from "react"

export default function ToDo() {
    const [isLogged, setIsLogged] = useState(false)

    const login = async () => {
        setIsLogged(true)
    }
    useEffect(() => {
        // if (isLogged === true) {
        //     window.location.href = `./home`
        // }
        setIsLogged(false)
    }, [isLogged]);

    return (
        <>
            <a href="/api/auth/login" onClick={login}>Login</a>
            <h1>Bienvenido</h1>
        </>
    )
};