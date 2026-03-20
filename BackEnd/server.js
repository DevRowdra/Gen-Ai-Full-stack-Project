const app = require("./src/app");
const connectToDB = require("./src/config/database");
const invokeGeminiAi = require("./src/services/ai.services");
const PORT = process.env.PORT || 5000;

// ** Connect to the database and start the server
connectToDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
