'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const all_modName = ['ModuloPrueba1','ModuloPrueba2','ModuloPrueba3','ModuloPrueba4','ModuloPrueba5','ModuloPrueba6'];
    const all_modAssign = [true,true,true,true,false,false];
    const newData = [];

    for (const mod in all_modName) {
      const seedData = {
        nameModule: all_modName[mod],
        descriptionModule: 'Modulo de prueba',
        projectId: 1,
        assigned: all_modAssign[mod]
      };
      newData.push(seedData);
    }
    return queryInterface.bulkInsert('Modules',newData);
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