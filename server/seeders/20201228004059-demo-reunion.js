'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reunions', [{
      Date: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()),
      Hour: 10,
      Minute: 0,
      IdJefe: 1,
      createdAt:new Date(),
      updatedAt:new Date()
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