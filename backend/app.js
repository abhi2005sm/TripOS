import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from '@exortek/express-mongo-sanitize';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import specs from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(mongoSanitize());

const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS: origin ${origin} not allowed`));
            }
        },
        credentials: true,
    })
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests' },
});
app.use('/api/', limiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/search', searchRoutes);

if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) return next();
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.json({ message: 'TripOS API running' });
    });
}

app.use(notFound);
app.use(errorHandler);

export default app;
