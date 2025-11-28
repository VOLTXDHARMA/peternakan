import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import ternakRoutes from './routes/ternak.routes';
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

export default app;