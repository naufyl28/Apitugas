'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "andi",
        email: "andi@gmail.com",
        password: "1234",
      },
      {
        name: "archie",
        email: "archie@gmail.com",
        password: "123",
      },
      {
        name: "nopal",
        email: "nopal@gmail.com",
        password: "123",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
