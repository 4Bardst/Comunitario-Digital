// --- CONFIGURACIÓN ---
// REEMPLAZA ESTOS VALORES con los de tu propio Google Calendar.
// Las instrucciones para obtenerlos están en el archivo README.md

const CALENDAR_ID = 'TU_CALENDAR_ID@group.calendar.google.com';
const API_KEY = 'TU_API_KEY';
const GOOGLE_FORM_URL = 'URL_DE_TU_GOOGLE_FORM'; // Reemplázalo también en el HTML

// --- CÓDIGO PRINCIPAL ---

// Ejecutamos el código cuando el contenido del DOM esté cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Actualizamos el enlace del botón en el HTML (opcional pero buena práctica)
    const proposeButton = document.querySelector(`a[href="URL_DE_TU_GOOGLE_FORM"]`);
    if (proposeButton) {
        proposeButton.href = GOOGLE_FORM_URL;
    }

    fetchEvents();
});

// Función para obtener los eventos de la API de Google Calendar
function fetchEvents() {
    const eventsContainer = document.getElementById('eventos-container');
    const loadingMessage = document.getElementById('loading-message');

    // Construimos la URL de la API
    // timeMin=new Date().toISOString() -> para obtener solo eventos futuros.
    // maxResults=9 -> limita a los próximos 9 eventos.
    // singleEvents=true&orderBy=startTime -> asegura que los eventos recurrentes aparezcan individualmente y ordenados.
    const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${new Date().toISOString()}&maxResults=9&singleEvents=true&orderBy=startTime`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            loadingMessage.style.display = 'none'; // Ocultamos el mensaje de "cargando"
            
            if (data.items && data.items.length > 0) {
                // Si encontramos eventos, los mostramos.
                displayEvents(data.items);
            } else {
                // Si no hay eventos, mostramos un mensaje amigable.
                eventsContainer.innerHTML = `<p class="text-center text-gray-500 md:col-span-2 lg:col-span-3">No hay eventos programados por el momento. ¡Anímate a proponer uno!</p>`;
            }
        })
        .catch(error => {
            console.error('Error al cargar los eventos:', error);
            loadingMessage.style.display = 'none';
            // Mostramos un mensaje de error si algo falla.
            eventsContainer.innerHTML = `<p class="text-center text-red-500 md:col-span-2 lg:col-span-3">No se pudieron cargar los eventos. Revisa la configuración de CALENDAR_ID y API_KEY en el archivo script.js.</p>`;
        });
}

// Función para mostrar los eventos en el HTML
function displayEvents(events) {
    const eventsContainer = document.getElementById('eventos-container');
    eventsContainer.innerHTML = ''; // Limpiamos el contenedor

    events.forEach(event => {
        // Obtenemos la fecha y hora de inicio.
        // El formato puede ser 'dateTime' (con hora) o 'date' (todo el día).
        const start = event.start.dateTime || event.start.date;
        const eventDate = new Date(start);

        // Formateamos la fecha y la hora para que sea fácil de leer.
        const formattedDate = eventDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = event.start.dateTime ? eventDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }) + 'h' : 'Todo el día';

        // Creamos la tarjeta del evento con clases de TailwindCSS
        const eventCard = `
            <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col">
                <div class="flex-grow">
                    <p class="text-sm font-semibold text-blue-600">${formattedDate}</p>
                    <h3 class="text-xl font-bold text-gray-900 mt-1 mb-2">${event.summary || 'Evento sin título'}</h3>
                    <p class="text-gray-500 mb-2">${formattedTime} @ ${event.location || 'Ubicación por confirmar'}</p>
                    <p class="text-gray-700">${event.description || 'No hay descripción disponible.'}</p>
                </div>
                ${event.htmlLink ? `<a href="${event.htmlLink}" target="_blank" class="mt-4 text-blue-600 font-semibold hover:underline self-start">Ver en Calendario &rarr;</a>` : ''}
            </div>
        `;
        
        eventsContainer.innerHTML += eventCard;
    });
}
