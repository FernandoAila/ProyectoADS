'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash('password', salt);

    return queryInterface.bulkInsert('Users', [{
      email: 'example@example.com',
      password: hashPass,
      createdAt: new Date(),
      updatedAt: new Date(),
      nombre: 'admin',
      apellido: 'admin',
      telefono: '000000000'
    }]);
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
