// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: "postgres",
//   logging: false,
// });

// export default sequelize;

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const sequelize = new Sequelize(
  process.env.DB_NAME || "edu-crud",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "admin123",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database connected successfully");
  } catch (error) {
    console.error("⚠️ Database connection failed:", error);
  }
})();

export default sequelize;
