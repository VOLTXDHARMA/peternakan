import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import ternakRoutes from './routes/ternak.routes';
import umkmRoutes from './routes/umkm.routes';
import pelatihanRoutes from './routes/pelatihan.routes';
import materiPelatihanRoutes from './routes/materi_pelatihan.routes';
import progresPelatihanRoutes from './routes/progres_pelatihan.routes';
import publicRoutes from './routes/public.routes';
import { errorHandler } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import { apiLimiter } from './middlewares/rateLimiter.middleware';
import './config/database';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ternak', ternakRoutes);
	app.use('/api/umkm', umkmRoutes);
	app.use('/api/pelatihan', pelatihanRoutes);
	app.use('/api/materi_pelatihan', materiPelatihanRoutes);
	app.use('/api/progres_pelatihan', progresPelatihanRoutes);
	// Public testing routes (local only)
	app.use('/public', publicRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

export default app;