'use strict';

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
    const all_rols = ['admin', 'jefe de proyecto', 'desarrollador', 'freelance', 'cliente'];
    const newData = [];

    for (const rol in all_rols) {
      const seedData = {
        rolsName: all_rols[rol],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }
    return queryInterface.bulkInsert('rols',newData);
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
