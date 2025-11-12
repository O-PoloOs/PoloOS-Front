# PoloOS-Front

Interfaz de escritorio web de PoloOS construida con React, TypeScript y Vite. Simula el flujo de un sistema operativo (encendido → boot → login → escritorio) y se comunica con:

- Backend (API REST + SSE) en `http://localhost:3000`
- Servicio de IA (FastAPI + RAG) en `http://localhost:8000`

La UI incluye aplicaciones:
- Bloc de Notas: lee/guarda archivos del usuario vía backend.
- Consola: ejecuta comandos simulados vía backend.
- PoliChat: chat con el servicio de IA con respuesta en streaming.

## Requisitos
- Node.js 18+ (Vite 5 requiere Node 18 o superior).
- npm 9+ o pnpm/yarn equivalente.

## Variables de Entorno
Configura un archivo `.env` (o `.env.local`) en la carpeta `PoloOS-Front` para apuntar al backend/IA si no usas los valores por defecto.

```
VITE_API_BASE_URL=http://localhost:3000
VITE_AI_BASE_URL=http://localhost:8000
```

Si no defines estas variables, se usarán esos mismos valores por defecto.

## Instalación y Ejecución
- Instalar dependencias
  ```bash
  npm install
  ```

- Ejecutar en desarrollo (por defecto en `http://localhost:5173`)
  ```bash
  npm run dev
  ```

## Comandos útiles
- `npm run dev`: servidor de desarrollo.
- `npm run build`: build de producción.
- `npm run preview`: previsualización del build.
- `npm run typecheck`: verificación de tipos TypeScript.

## Flujo de Uso
1) Enciende: pantalla de energía y boot.
2) Login: usa el usuario admin creado por el seed del backend (`admin` / `admin`).
3) Escritorio: abre apps desde los íconos. Los eventos de archivos (crear, renombrar, borrar) se reflejan vía SSE del backend.

## Problemas Comunes
- Si no ves archivos o falla el login, revisa que el backend esté corriendo, que la base de datos esté migrada/seeded y que `VITE_API_BASE_URL` sea correcto.
- Si PoliChat no responde, valida que el servicio de IA esté en `VITE_AI_BASE_URL` y que tenga configurada su `API_KEY`.

