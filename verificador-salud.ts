async function verificarNodo(url: string) {
    try {
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
    const resultados = await Promise.all(nodos.map(verificarNodo));

    for (const r of resultados) {
        const icono = r.saludable ? "🟢 OK" : "🔴 CAIDO";
        console.log(`${icono} ${r.url}`);
    }
    const sanos = resultados.filter((r) => r.saludable).length;
    console.log(`\n${sanos} de ${resultados.length} nodos saludables.`);
}

verificarCluster([
    "http://localhost:9001",
    "http://localhost:9002",
    "http://localhost:9003"
]);