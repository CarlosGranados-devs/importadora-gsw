# J&L Imports - Autolote de Importación (GSW)

## 🏗️ Diagrama de Arquitectura

El siguiente esquema representa la integración del servidor proxy inverso con HTTPS y el clúster de alta disponibilidad en Docker. Nginx reparte las peticiones entre los 3 nodos (activo-activo, round robin) y, si un nodo cae, deja de enviarle tráfico.

```mermaid
flowchart TD
    Cliente([Navegador Web del Cliente]) -->|HTTPS / Puerto 443| Servidor[Servidor Nginx<br/>Proxy Inverso + SSL]

    subgraph Cluster["Clúster Docker Compose"]
        Servidor -->|Round Robin| Nodo1[Nodo 1<br/>autolote-api<br/>puerto interno 9000<br/>expuesto en 9001]
        Servidor -->|Round Robin| Nodo2[Nodo 2<br/>autolote-api<br/>puerto interno 9000<br/>expuesto en 9002]
        Servidor -->|Round Robin| Nodo3[Nodo 3<br/>autolote-api<br/>puerto interno 9000<br/>expuesto en 9003]
    end

    Nodo1 --> BD[(Archivos Estáticos<br/>y Catálogo API)]
    Nodo2 --> BD
    Nodo3 --> BD

    classDef nodo fill:#22c55e,stroke:#16a34a,color:white;
    classDef proxy fill:#f59e0b,stroke:#d97706,color:white;
    class Nodo1,Nodo2,Nodo3 nodo;
    class Servidor proxy;
```