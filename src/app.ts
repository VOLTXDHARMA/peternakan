import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import umkmRoutes from './routes/umkm.routes';
import pelatihanRoutes from './routes/pelatihan.routes';
import ternakRoutes from './routes/ternak.routes';
import { errorHandler } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import { apiLimiter } from './middlewares/rateLimiter.middleware';
import './config/database';

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
app.use('/api/ternak', ternakRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
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