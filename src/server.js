require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const feedRoutes = require("./routes/feedRoutes");
app.use(cors());
app.use(express.json());

app.use("/api/p/user", userRoutes);
app.use("/api/a", categoryRoutes, feedRoutes);
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
