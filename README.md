# Tablón Comunitario Digital

Este es un micro sitio web para mostrar los eventos de un Google Calendar público. Está diseñado para ser desplegado fácilmente en GitHub Pages.

## 🚀 Puesta en Marcha (Pasos Obligatorios)

Sigue estos 4 pasos para que el sitio funcione.

### Paso 1: Crear el Calendario Público en Google

1.  Ve a [Google Calendar](https://calendar.google.com).
2.  En el menú de la izquierda, junto a "Otros calendarios", haz clic en el `+` y selecciona **"Crear un calendario"**.
3.  Dale un nombre (ej: "Eventos del Pueblo") y una descripción. Haz clic en **"Crear calendario"**.
4.  Una vez creado, vuelve a la configuración del calendario. En la sección **"Permisos de acceso a los eventos"**, marca la casilla **"Compartir públicamente"**. Acepta la advertencia. ¡Esto es crucial!
5.  Ve a la pestaña **"Integrar el calendario"**. Copia el **ID del calendario**. Luce algo así: `xxxxxxxxxx@group.calendar.google.com`.
    * **Pega este valor** en la constante `CALENDAR_ID` dentro del archivo `script.js`.

### Paso 2: Obtener una API Key de Google

1.  Ve a la [Consola de Google Cloud](https://console.cloud.google.com/). Es posible que necesites crear una cuenta.
2.  Crea un nuevo proyecto (o selecciona uno existente). Dale un nombre como "Web de Eventos".
3.  En el buscador de la parte superior, busca y selecciona **"API de Google Calendar"**. Haz clic en el botón **"Habilitar"**.
4.  Una vez habilitada, ve al menú de la izquierda: **"Credenciales"**.
5.  En la parte superior, haz clic en **"+ Crear credenciales"** y selecciona **"Clave de API"**.
6.  Se generará tu clave. **¡Cópiala!**
    * **Pega esta clave** en la constante `API_KEY` dentro del archivo `script.js`.
7.  **IMPORTANTE (Seguridad):** Haz clic en "Restringir clave". En "Restricciones de aplicaciones", selecciona "Referentes HTTP". Añade la URL de tu sitio de GitHub Pages (ej: `tunombredeusuario.github.io/*`). Esto evita que otros usen tu clave.

### Paso 3: Crear el Formulario de Propuestas

1.  Ve a [Google Forms](https://forms.google.com/).
2.  Crea un nuevo formulario con las preguntas que necesites: Título del evento, fecha, hora, lugar, descripción, email de contacto (para ti).
3.  Haz clic en el botón **"Enviar"** de la esquina superior derecha. Ve a la pestaña del icono de enlace (`<>`) y copia el enlace.
    * **Pega este enlace** en la constante `GOOGLE_FORM_URL` en `script.js` y también en la etiqueta `<a>` del archivo `index.html`.

### Paso 4: Desplegar en GitHub Pages

1.  Crea una cuenta en [GitHub](https://github.com/).
2.  Crea un nuevo repositorio. **El nombre del repositorio debe ser `tunombredeusuario.github.io`** (reemplaza `tunombredeusuario` con tu nombre de usuario real de GitHub). Esto creará un sitio personal.
3.  Sube los 3 archivos (`index.html`, `script.js`, `README.md`) a este repositorio.
4.  ¡Y ya está! Espera unos minutos y tu sitio web estará disponible en `https://tunombredeusuario.github.io`.

¡Felicidades, ya tienes tu tablón de eventos comunitario online!
