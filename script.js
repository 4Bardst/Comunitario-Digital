// --- CONFIGURACIÓN ---
// Pega aquí los códigos que obtuviste en el Paso 1.
const CALENDAR_ID = '4f79f3cfe7dc586a7c6ae86e7f1a4189efb1bd9c0ec7c67467aacf3c3b864568@group.calendar.google.com';
const API_KEY = 'AIzaSyBTsWnSYjXyQYh3LUdo0gRjsXCDzvYYk2Q';

// --- CÓDIGO ---

// Se asegura de que la página esté cargada antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});

// Función para pedir los datos de eventos a Google Calendar.
function fetchEvents() {
    const eventsContainer = document.getElementById('eventos-container');
    const loadingMessage = document.getElementById('loading-message');

    // URL de la API de Google. Pide los próximos 12 eventos, ordenados por fecha de inicio.
    const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${new Date().toISOString()}&maxResults=12&singleEvents=true&orderBy=startTime`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            loadingMessage.style.display = 'none'; // Oculta el mensaje de "cargando".
            
            if (data.items && data.items.length > 0) {
                displayEvents(data.items); // Si hay eventos, los muestra.
            } else {
                // Si no hay eventos, muestra un mensaje amigable.
                eventsContainer.innerHTML = `<p class="text-center text-gray-500 md:col-span-3">No hay eventos programados por el momento.</p>`;
            }
        })
        .catch(error => {
            console.error('Error al cargar los eventos:', error);
            loadingMessage.style.display = 'none';
            // Si algo falla (ej: API Key o ID incorrectos), muestra un error.
            eventsContainer.innerHTML = `<p class="text-center text-red-500 md:col-span-3">No se pudieron cargar los eventos. Verifica la configuración en el archivo script.js.</p>`;
        });
}

// Función para dibujar las tarjetas de los eventos en la página.
function displayEvents(events) {
    const eventsContainer = document.getElementById('eventos-container');
    eventsContainer.innerHTML = ''; // Limpia el contenedor por si acaso.

    events.forEach(event => {
        // Formatea la fecha y la hora para que sean fáciles de leer.
        const start = new Date(event.start.dateTime || event.start.date);
        const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = start.toLocaleDateString('es-ES', optionsDate);
        
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedTime = event.start.dateTime ? `${start.toLocaleTimeString('es-ES', optionsTime)}h` : 'Todo el día';

        // Crea el HTML para cada tarjeta usando clases de TailwindCSS.
        const eventCardHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col transition-transform transform hover:-translate-y-1">
                <div class="flex-grow">
                    <p class="text-sm font-semibold text-blue-600 uppercase">${formattedDate}</p>
                    <h3 class="text-xl font-bold text-gray-900 mt-2 mb-2">${event.summary || 'Evento sin título'}</h3>
                    <p class="text-gray-600 mb-3 text-sm">
                        <span class="font-semibold">🕒 ${formattedTime}</span>
                        ${event.location ? `<br><span class="font-semibold">📍 ${event.location}</span>` : ''}
                    </p>
                    <p class="text-gray-700 text-sm">${event.description || ''}</p>
                </div>
                <a href="${event.htmlLink}" target="_blank" class="mt-4 text-blue-600 font-semibold hover:underline text-sm self-start">
                    Ver más detalles &rarr;
                </a>
            </div>
        `;
        
        // Añade la tarjeta recién creada al contenedor.
        eventsContainer.innerHTML += eventCardHTML;
    });
}
