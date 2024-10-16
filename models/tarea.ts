import mongoose from 'mongoose';
const { Schema } = mongoose;

const tareaSchema = new Schema({
    nombre: String, // String is shorthand for {type: String}
    tarea: String,
    status: Boolean,
});