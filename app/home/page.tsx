import TodoApp from "../../components/todo";
import LogoutButton from '@/components/LogoutButton'

export default function Todo() {
    return (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Mis Tareas</h1>
            <LogoutButton />
          </div>
          <TodoApp />
        </div>
      )
}