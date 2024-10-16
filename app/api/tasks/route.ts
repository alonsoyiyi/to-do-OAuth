import { NextRequest, NextResponse } from 'next/server';
let tasks: { id: number; title: string; completed: boolean }[] = [];
tasks.push({ id: 123, title: 'tarea1', completed: false })
// GET: Listar todas las tareas
export async function GET() {
    console.log(tasks)
    return NextResponse.json({ tasks });
}
// POST: Guardar una nueva tarea
export async function POST(req: NextRequest) {
    const { title } = await req.json();
    const newTask = { id: Date.now(), title, completed: false };
    tasks.push(newTask);
    return NextResponse.json({ message: 'Task created successfully', task: newTask });
}

export async function DELETE(req:NextRequest) {
    const { id } = await req.json();
    const tempTasks = tasks.filter(task=>task.id !== id);
    tasks = tempTasks
}