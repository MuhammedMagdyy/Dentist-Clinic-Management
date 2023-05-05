require('dotenv').config();

const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Required Models */
const Clinic = require('./models/clinic');
const Dentist = require('./models/dentist');
const Outpatient = require('./models/outpatient');
const Patient = require('./models/patient');
const Role = require('./models/role');
const Specialized = require('./models/specialized');
const User = require('./models/user');

/* Required Routes */
const adminRouter = require('./routes/admin');
const nurseRouter = require('./routes/nurse');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Relations
User.hasMany(Patient, {
  foreignKey: 'created_by',
});
Patient.belongsTo(User, {
  foreignKey: 'created_by',
});

Role.hasOne(User);
User.belongsTo(Role);

Patient.hasOne(Outpatient);
Outpatient.belongsTo(Patient);

User.hasMany(Outpatient, {
  foreignKey: 'created_by',
});
Outpatient.belongsTo(User, {
  foreignKey: 'created_by',
});

Dentist.hasMany(Outpatient);
Outpatient.belongsTo(Dentist);

Clinic.hasMany(Outpatient, {
  foreignKey: 'transferedId',
});
Outpatient.belongsTo(Clinic, {
  foreignKey: 'transferedId',
});

Dentist.hasMany(Specialized);
Specialized.belongsTo(Dentist);

Patient.hasMany(Specialized);
Specialized.belongsTo(Patient);

Clinic.hasMany(Specialized);
Specialized.belongsTo(Clinic);

User.hasMany(Specialized, {
  foreignKey: 'created_by',
});
Specialized.belongsTo(User, {
  foreignKey: 'created_by',
});

// CORS Headers Middleware (Allowing all origins) - For Development Only (Remove in Production)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use(nurseRouter);

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const { message, data } = error;
  res.status(status).json({
    message,
    data,
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running');
});

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    console.log('Database connected');
  })
  .catch(err => {
    console.log(err);
  });
