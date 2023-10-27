require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { relations } = require('./config/eagerLoading');
const { initDB } = require('./config/admin');

/* Required Routes */
const adminRouter = require('./routes/admin');
const nurseRouter = require('./routes/nurse');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Relations
relations();

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use(nurseRouter);

// Error Handling Middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const { message, data } = error;
  res.status(status).json({ message, data });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    initDB();
    console.log('Database connected successfully');
  })
  .catch(() => {
    throw new Error('Database connection failed');
  });
