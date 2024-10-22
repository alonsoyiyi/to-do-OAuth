'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export default function Welcome() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Este efecto se ejecutará en el cliente, así que lo usamos para mostrar el contenido.
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Bienvenido a Tu Lista de Tareas</h1>
        <p className="text-xl text-white mb-8">Organiza tu día de manera eficiente</p>
        <Button 
          onClick={() => window.location.href = '/api/auth/login'} 
          className="bg-white text-purple-600 hover:bg-purple-100"
        >
          Iniciar Sesión
        </Button>
      </motion.div>
    </div>
  );
}
