// // import { Sequelize } from "sequelize";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
// //   host: process.env.DB_HOST,
// //   port: process.env.DB_PORT,
// //   dialect: "postgres",
// //   logging: false,
// // });

// // export default sequelize;

// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config(); // Ensure environment variables are loaded

// const sequelize = new Sequelize(
//   process.env.DB_NAME || "try",
//   process.env.DB_USER || "postgres",
//   process.env.DB_PASS || "admin123",
//   {
//     host: process.env.DB_HOST || "localhost",
//     port: process.env.DB_PORT || 5432,
//     dialect: "postgres",
//     logging: false, // Disable console logging of raw SQL queries
//     pool: {
//       max: 10, // Maximum connections in the pool
//       min: 0, // Minimum connections in the pool
//       acquire: 30000, // Max time (ms) for acquiring a connection before throwing error
//       idle: 10000, // Max time (ms) a connection can be idle before being released
//     },
//     define: {
//       freezeTableName: true, // Prevent table name pluralization
//       timestamps: true, // Add timestamps by default (can be overridden per model)
//     },
//   }
// );
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
// export default sequelize;


// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config(); // Ensure environment variables are loaded

// const sequelize = new Sequelize(
//   process.env.DB_NAME || "try",
//   process.env.DB_USER || "postgres",
//   process.env.DB_PASS || "admin123",
//   {
//     host: process.env.DB_HOST || "localhost",
//     port: process.env.DB_PORT || 5432,
//     dialect: "postgres",
//     logging: false, // Disable console logging of raw SQL queries
//     pool: {
//       max: 10, // Maximum connections in the pool
//       min: 0, // Minimum connections in the pool
//       acquire: 30000, // Max time (ms) for acquiring a connection before throwing error
//       idle: 10000, // Max time (ms) a connection can be idle before being released
//     },
//     define: {
//       freezeTableName: true, // Prevent table name pluralization
//       timestamps: true, // Add timestamps by default (can be overridden per model)
//     },
//   }
// );

// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// export default sequelize;


// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   logging: false,
//   dialectOptions: process.env.NODE_ENV === "production"
//     ? { ssl: { require: true, rejectUnauthorized: false } }
//     : {},
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   define: {
//     freezeTableName: true,
//     timestamps: true,
//   },
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log(" Database connected successfully.");
//   })
//   .catch((err) => {
//     console.error(" Unable to connect to the database:", err);
//   });

// export default sequelize;


import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('Database Connected'));

  await mongoose.connect(`${process.env.MONGODB_URI}/EDU-CONNECT`);
};

export default connectDB;
