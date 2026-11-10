async function verificarNodo(url: string) {
    try {
        // Espera máximo 3 segundos por respuesta
        const respuesta = await fetch(`${url}/health`, {
            signal: AbortSignal.timeout(3000) 
        });
        if (!respuesta.ok) return { url, saludable: false };
        const detalle = await respuesta.json();
        return { url, saludable: true, detalle };
    } catch {
        return { url, saludable: false };
    }
}

async function verificarCluster(nodos: string[]) {
    // Promise.all revisa todos los nodos al mismo tiempo (en paralelo)
    const resultados = await Promise.all(nodos.map(verificarNodo));
    
    for (const r of resultados) {
        const icono = r.saludable ? "🟢 OK" : "🔴 CAIDO";
        console.log(`${icono} ${r.url}`);
    }
    const sanos = resultados.filter((r) => r.saludable).length;
    console.log(`\n${sanos} de ${resultados.length} nodos saludables.`);
}

// Revisamos los 3 puertos de nuestro clúster
verificarCluster([
    "http://localhost:9001",
    "http://localhost:9002",
    "http://localhost:9003"
]);