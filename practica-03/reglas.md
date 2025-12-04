2.1 Dueño (owner)
Cada dueño posee:

id (autoincremental)
name (string, 3-50 caracteres)
phone (string, 10 caracteres exactos)
email (string, formato válido)
address (string)
registeredAt (timestamp ISO)
totalPets (entero, inicia en 0)

Restricciones:

El email debe ser único
El teléfono debe ser único
Solo se puede eliminar un dueño si no tiene mascotas registradas


2.2 Mascota (pet)
Cada mascota posee:

id (autoincremental)
name (string, 2-30 caracteres)
species (string: "Perro", "Gato", "Ave", "Conejo", "Otro")
breed (string, raza)
age (entero, 0-30 años)
weight (decimal, 0.1-100 kg)
ownerId (ID del dueño)
medicalStatus (string: "healthy", "sick", "treatment", "critical")
lastCheckup (timestamp ISO o null)
registeredAt (timestamp ISO)

Restricciones:

Una mascota DEBE tener un dueño
El dueño debe existir y ser válido
No se puede eliminar una mascota si tiene citas pendientes (status = "scheduled")


2.3 Cita (appointment)
Cada cita registra:

id (autoincremental)
petId (ID de la mascota)
appointmentDate (timestamp ISO, fecha programada)
reason (string: "checkup", "vaccination", "surgery", "emergency", "followup")
status (string: "scheduled", "completed", "cancelled")
diagnosis (string, puede ser null si no está completada)
treatment (string, puede ser null si no está completada)
cost (decimal, costo de la consulta)
createdAt (timestamp ISO)
completedAt (timestamp ISO o null)

Reglas:

Solo se pueden crear citas para mascotas que existan
Una mascota no puede tener más de 3 citas con status "scheduled" simultáneamente
Las citas con status "critical" en medicalStatus tienen prioridad
No se pueden crear citas con fechas pasadas