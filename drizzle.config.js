require('dotenv').config();
const { defineConfig } = require('drizzle-kit');
const config = defineConfig({
  // 'out' folder: Yahan Drizzle apni migration files save karega
  out: './drizzle',
  // 'schema' file: Aapka schema file kahan hai
  schema: 'models/index.js',
  
  // 'dialect': Hum konsa database use kar rahe hain
  dialect: 'postgresql',
  
  // 'dbCredentials': Database se connect karne ki details
  dbCredentials: {
    // Hum .env file se connection string read kar rahe hain
    url: process.env.DATABASE_URL, 
  },});
module.exports = config;