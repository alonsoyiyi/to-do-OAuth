
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: String, required: true } // Este campo es importante para vincular tareas a usuarios
});

const TaskModel = mongoose.models.Task || mongoose.model('Task', TaskSchema);
export default TaskModel;
