const express = require('express');
const sequelize = require('./util/database');
const Clinic = require('./models/clinic');
const Dentist = require('./models/dentist');
const Examination = require('./models/examination');
const Outpatient = require('./models/outpatient');
const Patient = require('./models/patient');
const Role = require('./models/role');
const Specialized = require('./models/specialized');
const User = require('./models/user');
const Admin = require('./models/amdin');

const app = express();

app.use(express.json());

// app.get('/', (req, res, next) => {
//   res.status(200).json({
//     message: 'Hello from Graduation Project!',
//     status: 200,
//   });
// });

// Relations
Role.hasMany(User);
Clinic.hasMany(Dentist);
Specialized.belongsTo(Clinic);
Examination.belongsTo(Dentist);
Examination.belongsTo(Outpatient);
Examination.belongsTo(Specialized);
Examination.hasMany(Patient);

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
