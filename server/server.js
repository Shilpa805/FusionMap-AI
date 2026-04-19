import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoutes from './routes/uploadRoutes.js';
import dataRoutes from './routes/dataRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/data', dataRoutes);

// Unified Production Deployment: Serve frontend static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all to serve index.html for React Router
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
