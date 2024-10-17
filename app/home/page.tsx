import TodoApp from "../todo";

export default function Todo() {
    return (
        <>
            <a href="/api/auth/logout">Logout</a>
            <a href="../user">Mi perfil</a>
            <TodoApp />
        </>
    )

}