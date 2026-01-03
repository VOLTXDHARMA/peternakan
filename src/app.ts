import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import umkmRoutes from './routes/umkm.routes.js';
import pelatihanRoutes from './routes/pelatihan.routes.js';
import materiPelatihanRoutes from './routes/materi_pelatihan.routes.js';
import progresPelatihanRoutes from './routes/progres_pelatihan.routes.js';
import ternakRoutes from './routes/ternak.routes.js';
import publicRoutes from './routes/public.routes.js';
import pembiayaanRoutes from './routes/pembiayaan.routes.js';
import dokumenPembiayaanRoutes from './routes/dokumen_pembiayaan.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';
import { apiLimiter } from './middlewares/rateLimiter.middleware.js';
import './config/database.js';

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: true, // Allow all origins
    credentials: true
}));

app.use(express.json());
app.use((req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        try {
            if (req.body && typeof req.body === 'string') {
                req.body = JSON.parse(req.body);
            }
        } catch (e) {
            return res.status(400).json({ message: 'Invalid JSON format in request body. Please check your JSON syntax.' });
        }
    }
    next();
});
app.use(morgan('dev'));

app.use('/api/', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/umkm', umkmRoutes);
app.use('/api/pelatihan', pelatihanRoutes);
app.use('/api/materi_pelatihan', materiPelatihanRoutes);
app.use('/api/progres_pelatihan', progresPelatihanRoutes);
app.use('/api/pembiayaan', pembiayaanRoutes);
app.use('/api/dokumen_pembiayaan', dokumenPembiayaanRoutes);
app.use('/api/ternak', ternakRoutes);
app.use('/public', publicRoutes);

app.use('/api-docs', (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
        tryItOutEnabled: true,
        requestInterceptor: (req: any) => {
            console.log('Swagger Request:', req);
            return req;
        },
        responseInterceptor: (res: any) => {
            console.log('Swagger Response:', res);
            return res;
        }
    }
}));
app.use(errorHandler);

export default app;