"use client"
import { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
interface Todo {
    id: number
    title: string
    completed: boolean
}
export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function fetchTasks() {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        setTodos(data.tasks)
    }
    const addTodo = async () => {
        if (newTodo.trim() !== "") {
            const title = newTodo
            setIsLoading(true);
            await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            setNewTodo("")
            setIsLoading(false);
        }
    }
    const toggleTodo = async (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
        setIsLoading(true);
        await fetch('api/tasks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        }
        );
        setIsLoading(false);
    }
    const deleteTodo = async (id: number) => {
        setIsLoading(true)
        await fetch('api/tasks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        setIsLoading(false);
    }
    useEffect(() => {
        if (!isLoading) {
            fetchTasks();
        }
    }, [isLoading]);
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Lista de Tareas</h1>
            <div className="flex mb-4">
                <Input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Nueva tarea"
                    className="mr-2"
                />
                <Button onClick={addTodo}>
                    <Plus className="h-4 w-4 mr-2" /> Agregar
                </Button>
            </div>
            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between bg-gray-100 p-3 rounded"
                    >
                        <div className="flex items-center">
                            <Checkbox
                                checked={todo.completed}
                                onCheckedChange={() => toggleTodo(todo.id)}
                                className="mr-2"
                            />
                            <span className={todo.completed ? "line-through" : ""}>
                                {todo.title}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}