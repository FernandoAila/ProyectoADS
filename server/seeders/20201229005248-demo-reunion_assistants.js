'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const all_assistants = [2,3,4];
    const newData = [];

    for (const mod in all_modName) {
      const seedData = {
        nameModule: all_modName[mod],
        descriptionModule: 'Modulo de prueba',
        projectId: 1,
        assigned: all_modAssign[mod],
        createdAt:new Date(),
        updatedAt:new Date()
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