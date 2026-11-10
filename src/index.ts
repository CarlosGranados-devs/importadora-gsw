import express, { Request, Response } from 'express';
import * as os from 'os';

const app = express();
const port = process.env.PORT || 9000;

// Ruta requerida en la Clase 28
app.get('/health', (req: Request, res: Response) => {
    // Simulación de falla
    if (req.query.simular === 'falla') {
        return res.status(503).json({
            estado: 'no saludable',
            nodo: os.hostname(),
            timestamp: new Date().toISOString(),
            mensaje: 'Falla simulada'
        });
    }

    // Estado saludable normal
    res.status(200).json({
        estado: 'saludable',
        nodo: os.hostname(),
        timestamp: new Date().toISOString(),
    });
});

// Ruta de prueba para el autolote
app.get('/api/vehiculos', (req: Request, res: Response) => {
    res.json({ mensaje: 'Catálogo de vehículos del autolote próximamente' });
});

app.listen(port, () => {
    console.log(`Servidor de Autolote corriendo en http://localhost:${port}`);
});