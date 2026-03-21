const app = require("./src/app");
const connectToDB = require("./src/config/database");

const PORT = process.env.PORT || 5000;

// ** Connect to the database and start the server
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
