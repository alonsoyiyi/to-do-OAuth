import mongoose from "mongoose";

declare global {
	var mongoose: any; // Aquí definimos mongoose para que lo use globalmente
}