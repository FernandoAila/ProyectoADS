'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash('password', salt);
    const all_devsNames = ['Desarrollador1','Desarrollador2','Freelance'];
    const all_devsMails = ['Desarrollador1@example.com','Desarrollador2@example.com','Freelance@example.com'];
    const newData = [];

    for (const dev in all_devsNames) {
      const seedData = {
        email: all_devsMails[dev],
        password: hashPass,
        createdAt: new Date(),
        updatedAt: new Date(),
        profilePic: null,
        firstTime: true,
        nombre: all_devsNames[dev],
        apellido: all_devsNames[dev],
        telefono: '000000000'
      };
      newData.push(seedData);
    }
    return queryInterface.bulkInsert('Users',newData);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};