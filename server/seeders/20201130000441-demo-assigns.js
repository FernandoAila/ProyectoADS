'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const all_modId = [1,2,3,4];
    const all_devId = [2,2,3,3];
    const newData = [];

    for (const mod in all_modId) {
      const seedData = {
        developerId: all_devId[mod],
        moduleId: all_modId[mod]

      };
      newData.push(seedData);
    }
    return queryInterface.bulkInsert('Developers_Modules',newData);
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