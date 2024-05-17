# Gestión de Tareas - CRUD con Node.js, Express y MongoDB

Este proyecto implementa una aplicación para la gestión de tareas, permitiendo realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando Node.js, Express y MongoDB con Mongoose.

## Librerías Usadas

- **Express**: Framework web para Node.js.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **dotenv**: Carga variables de entorno desde un archivo .env.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **express-validator**: Conjunto de middlewares para validar datos de entrada.

## Requisitos Funcionales

- **Crear tarea**: Permite crear una tarea especificando su título y descripción.
- **Leer todas las tareas**: Permite obtener una lista de todas las tareas registradas en la base de datos.
- **Leer una tarea**: Permite obtener los detalles de una tarea específica a través de su ID.
- **Actualizar tarea**: Permite actualizar los detalles de una tarea específica a través de su ID.
- **Eliminar tarea**: Permite eliminar una tarea específica a través de su ID.

## Requisitos No Funcionales

- La aplicación esta desarrollada en Node.js utilizando la librería Express y la base de datos MongoDB con Mongoose.
- La aplicación tiene todas las rutas necesarias para listar, crear, editar y eliminar las tareas existentes en la base de datos.
- La aplicación es capaz de manejar errores de manera adecuada (errores 500, 400, 404).

## Pasos a Realizar

1. Instalar las dependencias necesarias.
2. Configurar la conexión a la base de datos MongoDB utilizando Mongoose.
3. Agregar las rutas de Express para CRUD de tareas:
    - Crear una tarea
    - Leer todas las tareas
    - Leer una tarea
    - Actualizar una tarea
    - Eliminar una tarea
5. Validar los datos de entrada en la ruta de creación de tarea y crear una nueva tarea en la base de datos utilizando el modelo definido.
6. Obtener todas las tareas existentes en la base de datos utilizando el modelo definido en la ruta de obtención de todas las tareas.
7. Obtener la tarea existente basado en el ID en la ruta de obtención de una tarea.
8. Validar los datos de entrada y editar la tarea en la base de datos utilizando el modelo definido en la ruta de actualización de una tarea.
9. Obtener la tarea a eliminar y borrar de la base de datos la tarea encontrada en la ruta de eliminación de una tarea.
10. Manejar los errores de manera adecuada y devolver las respuestas correspondientes a cada solicitud.

## Instalación

1. Clona este repositorio:

2. Instala las dependencias:

    ```
    npm install
    ```

3. Configura las variables de entorno:

    - Crea un archivo '.env' en la raíz del proyecto.
    - Añade la línea de la URL de la conexión a MongoDB 

        ```
        DB_URL_CONNECTION=<URL_DE_CONEXION_MONGODB>
        PORT=4000
        ```

4. Inicia el servidor:

    ```
    npm run dev
    ```

## Uso

### Crear una Tarea (POST)

- **URL**: `POST http://localhost:4000/api/task/create`
- **Body (JSON)**:
    ```json
    {
        "title": "Tarea X",
        "description": "Descripción de la tarea X"
    }
    ```

### Leer Todas las Tareas (GET)

- **URL**: `GET http://localhost:4000/api/task/list-task`
- **Query Params (Opcional)**:
    - `page`: Número de página para paginación (ejemplo: `?page=1`).

### Leer Una Tarea (GET)

- **URL**: `GET http://localhost:4000/api/task/:id`
- **Params**:
    - `id`: ID de la tarea.

### Actualizar una Tarea (PUT)

- **URL**: `PUT http://localhost:4000/api/task/edit-task/:id`
- **Params**:
    - `id`: ID de la tarea.
- **Body (JSON)**:
    ```json
    {
        "title": "Nuevo Título",
        "description": "Nueva Descripción"
    }
    ```

### Eliminar una Tarea (DELETE)

- **URL**: `DELETE http://localhost:4000/api/task/delete-task/:id`
- **Params**:
    - `id`: ID de la tarea.

## Manejo de Errores

- **500** (Internal Server Error): Errores del servidor.
- **400** (Bad Request): Errores de validación de datos de entrada.
- **404** (Not Found): Tarea no encontrada.