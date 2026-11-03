# Backend de Tareas con Autenticación JWT

API REST desarrollada con **Node.js, Express y MongoDB (Mongoose)**. Permite registrar usuarios, iniciar sesión (se devuelve un token JWT) y administrar un CRUD de tareas protegido con **Bearer Token**. Cada usuario solo puede ver, modificar y eliminar sus propias tareas.

Proyecto de la materia Ingeniería de Software, Universidad Anáhuac Mayab, Marco Daniel Cruz Ixta.

## Tecnologías

- Node.js y Express
- MongoDB y Mongoose
- JSON Web Token (jsonwebtoken)
- bcrypt para el hash de contraseñas
- dotenv para las variables de entorno

## Instalación

1. Clone el repositorio e ingrese a la carpeta:

   ```bash
   git clone https://github.com/danicruzi/IngSoft-primer-backend.git
   cd IngSoft-primer-backend
   ```

2. Instale las dependencias:

   ```bash
   npm install
   ```

3. Cree un archivo `.env` en la raíz a partir de `.env.example` y complete sus valores:

   ```
   NODE_ENV=development
   PORT=5000
   MONGO_DB=<cadena de conexión a MongoDB>
   JWT_SECRET=<secreto para firmar los tokens>
   ```

## Ejecución

```bash
npm run server   # modo desarrollo (con nodemon)
npm start        # modo normal
```

El servidor queda disponible en `http://localhost:5000`.

## Endpoints

| Método | Ruta | Descripción | ¿Requiere token? |
|--------|------|-------------|------------------|
| POST | `/api/users` | Crear usuario (`name`, `email`, `password`) | No |
| POST | `/api/users/login` | Iniciar sesión y obtener el JWT (`email`, `password`) | No |
| GET | `/api/users/datos` | Datos del usuario dueño del token | Sí |
| GET | `/api/tareas` | Listar solo las tareas del usuario logueado | Sí |
| POST | `/api/tareas` | Crear una tarea (`descripcion`) | Sí |
| PUT | `/api/tareas/:id` | Modificar una tarea propia | Sí |
| DELETE | `/api/tareas/:id` | Eliminar una tarea propia | Sí |

Las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

## Seguridad

- Sin token o con un token inválido, la API responde `401 Unauthorized`.
- El id del usuario se obtiene del token, nunca del body ni de la URL.
- Cada tarea guarda el id de su dueño; si un usuario intenta modificar o eliminar una tarea ajena, la API responde con error y la tarea no cambia.
- Las contraseñas se almacenan con hash (bcrypt).
- Los archivos `.env` y `node_modules/` están excluidos mediante `.gitignore`.
