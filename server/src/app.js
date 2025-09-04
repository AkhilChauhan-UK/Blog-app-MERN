const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const { notFound, errorHandler } = require('./middleware/error');

const app = express();

app.use(helmet());
app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'].filter(Boolean),
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/posts', postRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
