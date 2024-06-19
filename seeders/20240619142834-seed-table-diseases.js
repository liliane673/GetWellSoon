'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../db/diseases.json').map((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("Diseases", data);

    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Diseases');
    /**
     * Add commands to revert seed here.
    *
    * Example:
     */
  }
};
