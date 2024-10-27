// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from '@auth0/nextjs-auth0';
// import mongoose from 'mongoose';

// // Importa tu modelo de tarea
// import TaskModel from '@/models/Task';

// // Asegúrate de conectarte a la base de datos antes de realizar consultas
// const connectToDatabase = async () => {
//     if (mongoose.connection.readyState === 0) {
//         await mongoose.connect(process.env.MONGODB_URI!); // Asegúrate de que la URI esté definida
//         console.log('Conectado a MongoDB');
//     }
// };

// export async function GET(req: NextRequest) {
//     await connectToDatabase(); // Conecta a la base de datos

//     // Obtén la sesión del usuario utilizando la función getSession
//     const session = await getSession(req);

//     // Verifica que la sesión y el usuario sean válidos
//     if (!session || !session.user || !session.user.sub) {
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const userId = session.user.sub; // Obtén el ID del usuario

//     // Obtén las tareas del usuario desde la base de datos
//     const tasks = await TaskModel.find({ userId }); // Busca las tareas asociadas al usuario

//     return NextResponse.json({ tasks });
// }

// export async function POST(req: NextRequest) {
//     await connectToDatabase(); // Conecta a la base de datos

//     // Obtén la sesión del usuario utilizando la función getSession
//     const session = await getSession(req);

//     // Verifica que la sesión y el usuario sean válidos
//     if (!session || !session.user || !session.user.sub) {
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const userId = session.user.sub; // Obtén el ID del usuario

//     const { title } = await req.json();
//     const newTask = new TaskModel({ title, completed: false, userId }); // Crea una nueva tarea
//     await newTask.save(); // Guarda la tarea en la base de datos
//     console.log('Tarea guardada:', newTask);


//     return NextResponse.json({ message: 'Task created successfully', task: newTask });
// }

// export async function DELETE(req: NextRequest) {
//     await connectToDatabase(); // Conecta a la base de datos

//     // Obtén la sesión del usuario utilizando la función getSession
//     const session = await getSession(req);

//     // Verifica que la sesión y el usuario sean válidos
//     if (!session || !session.user || !session.user.sub) {
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const userId = session.user.sub; // Obtén el ID del usuario

//     const { id } = await req.json();
//     const result = await TaskModel.deleteOne({ _id: id, userId }); // Elimina la tarea asociada al usuario

//     if (result.deletedCount === 0) {
//         return NextResponse.json({ error: 'Task not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Task deleted successfully' });
// }

// export async function PUT(req: NextRequest) {
//     await connectToDatabase(); // Conecta a la base de datos

//     // Obtén la sesión del usuario utilizando la función getSession
//     const session = await getSession(req);

//     // Verifica que la sesión y el usuario sean válidos
//     if (!session || !session.user || !session.user.sub) {
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const userId = session.user.sub; // Obtén el ID del usuario

//     const { id } = await req.json();
//     const tarea = await TaskModel.findOne({ _id: id, userId }); // Busca la tarea asociada al usuario

//     if (tarea) {
//         tarea.completed = !tarea.completed; // Cambia el estado de la tarea
//         await tarea.save(); // Guarda los cambios
//         return NextResponse.json({ message: 'Task updated successfully', task: tarea });
//     }

//     return NextResponse.json({ error: 'Task not found' }, { status: 404 });
// }

// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

// GET: Obtener todas las tareas
export async function GET() {
  await dbConnect();

  try {
    const tasks = await Task.find({});
    return NextResponse.json({ success: true, data: tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error fetching tasks' }, { status: 400 });
  }
}

// POST: Crear una nueva tarea
export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const data = {
        title: body.title, 
        userMail: body.userMail,
        completed: false,
    }
    const task = await Task.create(data);
    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error creating task' }, { status: 400 });
  }
}