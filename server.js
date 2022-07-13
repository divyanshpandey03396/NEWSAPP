const express = require("express");
const app = express();
const newsRoute = require("./routes/newsRoute");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const connectDB = require("./dbConnect");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use("/api/newsitems", newsRoute);
app.use("/api/users", userRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(
        `Server running successfully on port ${PORT} and connected to DB`
      )
    );
  } catch (err) {
    console.log(err);
  }
};

start();
