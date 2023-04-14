const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');

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

app.use(express.json());
app.use(bodyParser.json());

// Relations
User.hasMany(Patient, {
  foreignKey: 'created_by',
});
Role.hasOne(User);
Patient.hasOne(Outpatient);
User.hasMany(Outpatient, {
  foreignKey: 'created_by',
});
Dentist.hasMany(Outpatient);
Clinic.hasMany(Outpatient, {
  foreignKey: 'transferedId',
});
Dentist.hasMany(Specialized);
Patient.hasMany(Specialized);
Clinic.hasMany(Specialized);
User.hasMany(Specialized, {
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

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
