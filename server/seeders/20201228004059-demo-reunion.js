'use strict';
var DateComp = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
DateComp.setDate(DateComp.getDate() + 3);

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reunions', [{
      Date: DateComp,
      Hour: 10,
      Link:"https://zoom.us/j/91846711975",
      Title:"Coordinar proyecto",      
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