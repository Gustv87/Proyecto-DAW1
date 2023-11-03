# back-end-booking

# API de Gestión de Espacios de Estudio

¡Bienvenido a la API de Gestión de Espacios de Estudio! Esta API construida en Node.js te permite administrar usuarios, reservas, horarios y laboratorios en una base de datos. Puedes utilizarla para realizar operaciones CRUD completas en estas tablas.

## Instalación

1. Clona este repositorio en tu máquina local:



2. Accede al directorio del proyecto:

3. Instala las dependencias utilizando npm:  npm install


## Configuración de la Base de Datos

Antes de ejecutar la API, asegúrate de configurar la conexión a la base de datos. Sigue estos pasos:

1. Crea un archivo `.env` en la raíz del proyecto.
2. Agrega la siguiente línea al archivo `.env` y reemplaza `<TU_URL_DE_CONEXION>` con la URL de conexión a tu base de datos:


## Uso

Para ejecutar la API en modo de desarrollo, utiliza el siguiente comando:  npm run dev


La API estará disponible en `http://localhost:3000`.

## Endpoints

La API proporciona los siguientes endpoints:

- `GET /usuarios`: Obtiene la lista de usuarios.
- `POST /usuarios`: Crea un nuevo usuario.
- `PUT /usuarios/:id`: Actualiza un usuario por su ID.
- `DELETE /usuarios/:id`: Elimina un usuario por su ID.

- `GET /reservas`: Obtiene la lista de reservas.
- `POST /reservas`: Crea una nueva reserva.
- `PUT /reservas/:id`: Actualiza una reserva por su ID.
- `DELETE /reservas/:id`: Elimina una reserva por su ID.

- `GET /horarios`: Obtiene la lista de horarios.
- `POST /horarios`: Crea un nuevo horario.
- `PUT /horarios/:id`: Actualiza un horario por su ID.
- `DELETE /horarios/:id`: Elimina un horario por su ID.

- `GET /laboratorios`: Obtiene la lista de laboratorios.
- `POST /laboratorios`: Crea un nuevo laboratorio.
- `PUT /laboratorios/:id`: Actualiza un laboratorio por su ID.
- `DELETE /laboratorios/:id`: Desactiva un laboratorio por su ID.



Esta API te permite realizar operaciones relacionadas con usuarios, reservas, horarios y laboratorios.

## Usuarios

### Obtener lista de usuarios

Obtiene la lista de usuarios registrados en el sistema.

- **URL**: `/usuarios`
- **Método**: GET
- **Respuesta exitosa** (Código 200):
  - Contenido: Lista de usuarios en formato JSON.

### Crear un nuevo usuario

Crea un nuevo usuario en el sistema.

- **URL**: `/usuarios`
- **Método**: POST
- **Cuerpo de la solicitud** (JSON):
  ```json
  {
    "nombre": "Nombre",
    "apellido": "Apellido",
    "correo": "correo@example.com",
    "contrasenia": "contrasenia123",
    "id_rol": 1
  }
Respuesta exitosa (Código 201):
Contenido: Datos del usuario creado en formato JSON.

### Actualizar un usuario
Actualiza los datos de un usuario existente en el sistema.

- **URL**: `/usuarios/:id`
- **Método**: PUT
- **Cuerpo de la solicitud** (JSON):

  ```json
  {
  "nombre": "Nuevo Nombre",
  "apellido": "Nuevo Apellido",
  "correo": "nuevo_correo@example.com",
  "contrasenia": "nueva_contrasenia123",
  "id_rol": 2
  }
Respuesta exitosa (Código 200):
Contenido: Datos actualizados del usuario en formato JSON.

### Eliminar un usuario
Elimina un usuario existente del sistema.

- **URL**: `/usuarios/:id`
- **Método**: DELETE
- **Parámetros de la URL**: `id` - ID del usuario a eliminar.
Respuesta exitosa (Código 200):
Contenido: Mensaje de confirmación.

