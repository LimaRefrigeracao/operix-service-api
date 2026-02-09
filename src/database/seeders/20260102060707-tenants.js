/** @type {import('sequelize-cli').Seeder} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tenants",
      [
        {
          name: "Lima Refrigeração",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tenants", null, {});
  },
};
