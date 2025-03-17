# 📚 Virtual Library

Una aplicación web moderna para gestionar y organizar tu biblioteca personal de libros. ¡Nunca fue tan fácil mantener un registro de tus lecturas!

## 🚀 Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- Python 3.9 o superior → [Descargar Python](https://www.python.org/downloads/release/python-3132/)
- Node.js y npm → [Descargar Node.js](https://nodejs.org/en/download/)

## ⚙️ Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/srvenient/virtual-library.git
cd virtual-library
```

### 2️⃣ Instalar dependencias

#### Backend (Python con Poetry)
```bash
pip install poetry
poetry install
```

#### Frontend (React con npm)
```bash
cd frontend
npm install
```

## ▶️ Iniciar la aplicación

### 1️⃣ Iniciar el backend
Ejecuta el siguiente comando desde el directorio app del proyecto:
```bash
cd app
poetry run uvicorn main:app --reload
```
Esto iniciará el servidor de FastAPI en http://127.0.0.1:8000/.

### 2️⃣ Iniciar el frontend
```bash
cd frontend
npm run dev # Esto es por si estas en un entorno de desarrollo
```
Esto ejecutará la aplicación en modo desarrollo. Abre http://localhost:5174 en tu navegador.
