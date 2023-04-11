const express = require('express');
const sequelize = require('./util/database');

/* Required Models */
const Clinic = require('./models/clinic');
const Dentist = require('./models/dentist');
const Outpatient = require('./models/outpatient');
const Patient = require('./models/patient');
const Role = require('./models/role');
const Specialized = require('./models/specialized');
const User = require('./models/user');
const Admin = require('./models/admin');

/* Required Routes */
const adminRouter = require('./routes/admin');
const nurseRouter = require('./routes/nurse');

const app = express();

app.use(express.json());

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
