'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const all_assistants = [2,3,4];
    const newData = [];

    for (const assis in all_assistants) {
      const seedData = {
        IdUser: all_assistants[assis],
        IdReu: 1,
        createdAt:new Date(),
        updatedAt:new Date()
      };
      newData.push(seedData);
    }
    return queryInterface.bulkInsert('Reunion_Assistants',newData);
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