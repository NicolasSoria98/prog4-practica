EJERCICIO DE PRÁCTICA - Sistema de Gestión de Hotel
Problema: "Hotel Paradise - Sistema de Reservas"
Tu tarea es desarrollar una API para administrar un hotel que registra huéspedes, habitaciones y reservas.
Toda la información se almacena en un único archivo JSON. No se permite usar bases de datos reales.

1. Contexto General
La API debe permitir:

Administrar huéspedes (guests)
Administrar habitaciones (rooms)
Administrar reservas (reservations)

Archivo inicial hotel.json:
json{
  "guests": [],
  "rooms": [],
  "reservations": []
}

2. Entidades y Reglas del Sistema
2.1 Huésped (guest)
Cada huésped posee:

id (autoincremental)
name (string, 3-50 caracteres)
email (string, formato válido)
phone (string, 10 caracteres exactos)
identificationType (string: "DNI", "Pasaporte", "Cédula")
identificationNumber (string, único)
isVip (boolean, inicia en false)
registeredAt (timestamp ISO)
totalReservations (entero, inicia en 0)

Restricciones:

El email debe ser único
El identificationNumber debe ser único
Solo se puede eliminar un huésped si totalReservations es 0


2.2 Habitación (room)
Cada habitación posee:

id (autoincremental)
number (string, número de habitación, único)
type (string: "simple", "doble", "suite", "presidencial")
capacity (entero, 1-6 personas)
pricePerNight (decimal, precio por noche)
floor (entero, 1-20)
isAvailable (boolean, inicia en true)
amenities (array de strings: ["wifi", "tv", "minibar", "jacuzzi", "vista al mar"])
createdAt (timestamp ISO)

Restricciones:

El número de habitación debe ser único
Solo se pueden eliminar habitaciones que no tengan reservas activas (status "active")

Precio por tipo (sugerido):

simple: $50-100/noche
doble: $80-150/noche
suite: $150-300/noche
presidencial: $300-600/noche


2.3 Reserva (reservation)
Cada reserva registra:

id (autoincremental)
guestId (ID del huésped)
roomId (ID de la habitación)
checkInDate (string, fecha de entrada: "YYYY-MM-DD")
checkOutDate (string, fecha de salida: "YYYY-MM-DD")
numberOfGuests (entero, cantidad de personas)
status (string: "active", "completed", "cancelled")
totalPrice (decimal, precio total calculado)
specialRequests (string, puede ser null)
createdAt (timestamp ISO)
completedAt (timestamp ISO o null)

Reglas:

Solo se pueden reservar habitaciones disponibles (isAvailable = true)
Solo pueden reservar huéspedes que existan
checkOutDate debe ser posterior a checkInDate
numberOfGuests no puede exceder la capacidad de la habitación
No se pueden hacer reservas si la habitación ya está reservada en esas fechas
totalPrice se calcula automáticamente: (días * pricePerNight)
Si el huésped es VIP, aplicar 15% de descuento


3. Lógica de Reservas
3.1 Crear Reserva (POST /reservations)
Request body:
json{
  "guestId": 1,
  "roomId": 2,
  "checkInDate": "2025-12-15",
  "checkOutDate": "2025-12-18",
  "numberOfGuests": 2,
  "specialRequests": "Cama king size"
}
Validaciones previas:

El huésped debe existir
La habitación debe existir
La habitación debe estar disponible (isAvailable = true)
checkOutDate debe ser posterior a checkInDate
numberOfGuests no puede exceder room.capacity
La habitación no debe tener reservas activas que se solapen con estas fechas

Proceso:

Calcular días de estadía: dias = checkOutDate - checkInDate
Calcular precio base: precioBase = dias * room.pricePerNight
Si el huésped es VIP: totalPrice = precioBase * 0.85 (15% descuento)
Crear la reserva con status "active"
Incrementar totalReservations del huésped en 1


3.2 Completar Reserva (PATCH /reservations/:id/complete)
Validaciones:

La reserva debe existir
La reserva debe estar "active"

Proceso:

Cambiar status a "completed"
Actualizar completedAt con timestamp actual


3.3 Cancelar Reserva (PATCH /reservations/:id/cancel)
Validaciones:

La reserva debe existir
La reserva debe estar "active"

Proceso:

Cambiar status a "cancelled"
Decrementar totalReservations del huésped en 1


4. Requisitos Técnicos
4.1 Arquitectura

Node.js + Express
fs.promises para manejar hotel.json
Arquitectura en capas:

routes/
controllers/
services/
repositories/
middlewares/



4.2 Middlewares obligatorios

Logger global (método, ruta, timestamp)
Timer global (duración de cada request)
Error handler global


5. Endpoints Obligatorios
Guests

POST /guests - Crear huésped
GET /guests - Listar huéspedes

Filtros: isVip


GET /guests/:id - Obtener un huésped
GET /guests/:id/reservations - Historial de reservas del huésped
PATCH /guests/:id - Actualizar huésped (name, phone, email)
PATCH /guests/:id/vip - Cambiar status VIP

Body: { "isVip": true/false }


DELETE /guests/:id - Eliminar huésped (solo si totalReservations = 0)

Rooms

POST /rooms - Crear habitación
GET /rooms - Listar habitaciones

Filtros: type, isAvailable, minPrice, maxPrice


GET /rooms/:id - Obtener una habitación
PATCH /rooms/:id - Actualizar habitación (number, pricePerNight, amenities)
PATCH /rooms/:id/availability - Cambiar disponibilidad

Body: { "isAvailable": true/false }


DELETE /rooms/:id - Eliminar habitación (solo si no tiene reservas active)

Reservations

POST /reservations - Crear reserva
GET /reservations - Listar reservas

Filtros: guestId, roomId, status


GET /reservations/:id - Obtener una reserva
PATCH /reservations/:id/complete - Completar reserva (checkout)
PATCH /reservations/:id/cancel - Cancelar reserva


6. Validaciones Específicas
Para Guests:

Email formato válido
Teléfono exactamente 10 dígitos
Email único
identificationNumber único
identificationType debe ser válido

Para Rooms:

number único
type debe ser válido
capacity entre 1-6
pricePerNight mayor a 0
floor entre 1-20

Para Reservations:

checkOutDate > checkInDate
numberOfGuests <= room.capacity
La habitación no debe tener solapamiento de fechas con otras reservas active


7. Respuestas de Error

400 - Datos inválidos, validación fallida
404 - Recurso no encontrado
409 - Conflicto (email/identificación duplicada, habitación ocupada en esas fechas)
403 - Acción no permitida (eliminar huésped con reservas, eliminar habitación con reservas activas)
500 - Error interno del servidor


8. Relaciones entre Entidades
Al crear una reserva:

Incrementar totalReservations del huésped en 1

Al cancelar una reserva:

Decrementar totalReservations del huésped en 1

