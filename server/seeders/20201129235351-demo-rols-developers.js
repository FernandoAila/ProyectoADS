'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const all_dids = [2,3,4];
    const all_rids = [3,3,4];
    const newData = [];

    for (const id in all_dids) {
      const seedData = {
        rolsId: all_rids[id],
        userId: all_dids[id],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }
    return queryInterface.bulkInsert('users_rols',newData);
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