docker build -t autolote-api# Autolote de Importación - Clúster de Alta Disponibilidad

Este proyecto es la implementación de un clúster web con balanceo de carga para un Autolote de Importación, desarrollado para la cátedra de Gestión de Servidores Web. El objetivo principal es garantizar una alta disponibilidad (99.9%) mediante la contenedorización de una API en Node.js/Express y el uso de múltiples nodos idénticos.

## Arquitectura Base
*   **Backend:** Node.js con Express y TypeScript.
*   **Contenedores:** Docker.
*   **Orquestación Local:** Docker Compose (3 nodos en arquitectura activa-activa).
*   **Monitorización:** Script de Health Check en TypeScript.

## Requisitos Previos
*   Docker y Docker Desktop instalados y en ejecución.
*   Node.js (versión 20 o superior).
*   Git bash o PowerShell.

## Instalación y Despliegue

1. **Clonar el repositorio:**
   ```bash
   git clone git@github.com:CarlosGranados-devs/importadora-gsw.git
   cd importadora-gsw
   ```

2. **Instalar dependencias locales (para el verificador):**
   ```bash
   npm install
   ```

3. **Construir la imagen de Docker:**
   Empaqueta el código fuente en una imagen ligera basada en Alpine Linux:
   ```bash
   docker build -t autolote-api .
   ```

4. **Levantar el clúster (3 nodos):**
   ```bash
   docker compose up -d
   ```

## Comandos Útiles de Administración

A continuación, se presentan los comandos básicos para operar el clúster mediante `docker compose`:

*   **Ver el estado de los nodos:**
    Muestra qué nodos están encendidos y en qué puertos están escuchando.
    ```bash
    docker compose ps
    ```

*   **Detener el clúster completo:**
    Apaga los 3 nodos sin borrar su configuración.
    ```bash
    docker compose stop
    ```

*   **Destruir el clúster:**
    Apaga y elimina los contenedores (ideal para limpiar el entorno).
    ```bash
    docker compose down
    ```

*   **Ver los logs (registros) de un nodo específico:**
    Útil para depurar errores en un servidor en particular.
    ```bash
    docker logs importadora-gsw-nodo1-1
    ```
    *(Nota: el nombre exacto del contenedor puede variar ligeramente según la carpeta, verifícalo con `docker compose ps`)*.

## Simulacro de Fallas y Health Check (Failover)

El sistema cuenta con un verificador que hace ping a la ruta `/health` de los 3 nodos (puertos 9001, 9002 y 9003) para asegurar el *quórum*.

1. **Ejecutar el monitor de salud:**
   ```bash
   npx tsx verificador-salud.ts
   ```

2. **Simular la caída de un servidor (ej. nodo 2):**
   ```bash
   docker compose stop nodo2
   ```

3. **Verificar la caída:**
   Vuelve a ejecutar `npx tsx verificador-salud.ts` y notarás que el nodo 2 reporta "CAIDO".

4. **Recuperar el nodo (simular encendido post-falla):**
   ```bash
   docker compose start nodo2
   ```

## Rutas de la API (Endpoints)
*   `GET /health` : Devuelve el estado de salud del nodo y su identificador único (hostname).
*   `GET /health?simular=falla` : Fuerza al nodo a devolver un estado 503 (Error de servidor) para pruebas de monitorización.
*   `GET /api/vehiculos` : (En desarrollo) Retornará el catálogo de vehículos del autolote.docker compose ps