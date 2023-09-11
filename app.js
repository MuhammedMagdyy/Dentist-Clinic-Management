require('dotenv').config();

const express = require('express');
const sequelize = require('./util/database');
const cors = require('cors');

/* Required Models */
const Clinic = require('./models/clinic');
const Dentist = require('./models/dentist');
const Outpatient = require('./models/outpatient');
const Patient = require('./models/patient');
const Role = require('./models/role');
const Specialized = require('./models/specialized');
const User = require('./models/user');
const Appointment = require('./models/appointments');

/* Required Routes */
const adminRouter = require('./routes/admin');
const nurseRouter = require('./routes/nurse');
const authRouter = require('./routes/auth');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Relations
User.hasMany(Patient, {
  foreignKey: 'created_by',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Patient.belongsTo(User, {
  foreignKey: 'created_by',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Role.hasOne(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
User.belongsTo(Role, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Patient.hasOne(Outpatient, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Outpatient.belongsTo(Patient, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Outpatient, {
  foreignKey: 'created_by',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Outpatient.belongsTo(User, {
  foreignKey: 'created_by',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Dentist.hasMany(Outpatient, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Outpatient.belongsTo(Dentist, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Clinic.hasMany(Outpatient, {
  foreignKey: 'transferedId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Outpatient.belongsTo(Clinic, {
  foreignKey: 'transferedId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Dentist.hasMany(Specialized, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Specialized.belongsTo(Dentist, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Patient.hasMany(Specialized, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Specialized.belongsTo(Patient, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Clinic.hasMany(Specialized, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Specialized.belongsTo(Clinic, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Specialized, {
  foreignKey: 'created_by',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Specialized.belongsTo(User, {
  foreignKey: 'created_by',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Clinic.hasMany(Appointment, {
  foreignKey: { name: 'clinicId' },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Appointment.belongsTo(Clinic, {
  foreignKey: { name: 'clinicId' },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Patient.hasMany(Appointment, {
  foreignKey: { name: 'patientId' },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Appointment.belongsTo(Patient, {
  foreignKey: { name: 'patientId' },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Appointment.hasOne(Appointment, {
  foreignKey: { name: 'transferedTo', allowNull: true },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

const initDB = async () => {
  // check table is empty
  const roleCount = await Role.count();
  if (roleCount) {
    return;
  }
  const userCount = await User.count();
  if (userCount) {
    return;
  }
  const role = await Role.create({ name: 'admin' });
  // password: admin@123 (must change)
  await User.create({
    name: 'admin',
    email: 'admin@admin.com',
    password: '$2a$12$ntcNczGXs1oIsX.vrLyjbOP6E3TS9S6NYqyt9vW.NFrFBtKAiO2G.',
    roleId: role.id,
  });
};

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use(nurseRouter);

// Error Handling Middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const { message, data } = error;
  res.status(status).json({ message, data });
});

app.listen(process.env.PORT || PORT, () => {
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
