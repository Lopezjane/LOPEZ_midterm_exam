const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 4000;

//database connection
const sequelize = new Sequelize('LOPEZ_midterm_exam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

//test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database Connected!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//define user model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

//sync database
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced!');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
})();

//define route to fetch users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Cannot fetch users at this moment...', error);
    res.status(500).send('Internal Server Error');
  }
});

//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});