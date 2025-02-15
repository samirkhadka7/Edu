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

dotenv.config(); // Ensure environment variables are loaded

const sequelize = new Sequelize(
  process.env.DB_NAME || "edu-crud",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "admin123",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false, // Disable console logging of raw SQL queries
    pool: {
      max: 10, // Maximum connections in the pool
      min: 0, // Minimum connections in the pool
      acquire: 30000, // Max time (ms) for acquiring a connection before throwing error
      idle: 10000, // Max time (ms) a connection can be idle before being released
    },
    define: {
      freezeTableName: true, // Prevent table name pluralization
      timestamps: true, // Add timestamps by default (can be overridden per model)
    },
  }
);

// Function to test database connection
const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

// Run connection test
testDBConnection();

export default sequelize;

