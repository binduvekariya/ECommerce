const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./Middleware/error');

app.use(express.json());
app.use(cookieParser);

// Route imports
const product = require('./routes/productRoutes');
const user = require('./routes/userRoutes');

app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;