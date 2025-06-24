# IntroDex - Frontend

IntroDex es una aplicación web desarrollada como proyecto integrador académico y colaborativo, orientada a la gestión y exploración de información del universo Pokémon. Este frontend permite a los usuarios interactuar de manera intuitiva con los datos provistos por un backend propio, facilitando la consulta, búsqueda y administración de pokémones, movimientos y equipos.

## ¿Qué es este proyecto?

Este frontend es la interfaz visual y de usuario de un sistema completo de gestión de datos Pokémon. Permite a cualquier usuario:
- Buscar y explorar pokémones, movimientos y equipos.
- Consultar información detallada de cada entidad.
- Crear y administrar equipos personalizados.
- Navegar de forma sencilla y atractiva por las distintas secciones del sistema.

El backend, desarrollado en FastAPI y documentado por separado, expone todos los endpoints necesarios para la obtención y manipulación de los datos. Este repositorio se enfoca exclusivamente en la experiencia de usuario y la interacción visual.

## Tecnologías utilizadas

- **Lenguaje principal:** JavaScript (ES6+)
- **Framework:** SvelteKit (Svelte 5)
- **Estilos:** Tailwind CSS
- **Gestión de dependencias:** npm
- **Control de versiones:** Git y GitHub
- **Despliegue backend:** Render.com (FastAPI)

## Estructura y buenas prácticas

- Arquitectura basada en componentes reutilizables para facilitar el mantenimiento y la escalabilidad.
- Separación clara entre lógica de negocio (backend) y presentación/interacción (frontend).
- Código limpio, modular y documentado, siguiendo las mejores prácticas de desarrollo web moderno.
- Uso de herramientas de control de versiones y trabajo colaborativo en ramas, con revisiones de código entre pares.

## Trabajo en equipo y colaboración

Este proyecto fue desarrollado en equipo, fomentando la colaboración, la revisión de código y la integración continua. Cada integrante asumió responsabilidades en distintas secciones del frontend, revisando y aprobando los aportes de sus compañeros para garantizar la calidad y coherencia del producto final.

## ¿A quién está dirigido?

IntroDex está pensado tanto para usuarios fanáticos de Pokémon como para evaluadores académicos y reclutadores técnicos. El objetivo es demostrar habilidades en:
- Desarrollo frontend moderno
- Consumo de APIs REST
- Trabajo en equipo y metodologías ágiles
- Aplicación de buenas prácticas de UI/UX

## ¿Cómo se conecta con el backend?

El frontend consume los endpoints REST documentados en el backend (FastAPI), permitiendo la visualización y manipulación de los datos en tiempo real. Toda la lógica de negocio y persistencia de datos reside en el backend, mientras que el frontend se encarga de la experiencia de usuario.

## Instalación y ejecución

1. Clonar este repositorio.
2. Instalar dependencias con `npm install`.
3. Iniciar el servidor de desarrollo con `npm run dev`.
4. Acceder a la aplicación en `http://localhost:5173`.

> Para el correcto funcionamiento, asegúrate de tener el backend desplegado y accesible. La URL del backend puede configurarse en los archivos de constantes del frontend.

---

Este proyecto es una muestra de integración de conocimientos adquiridos en bases de datos, desarrollo backend y frontend, y trabajo colaborativo. ¡Gracias por tu interés en IntroDex!