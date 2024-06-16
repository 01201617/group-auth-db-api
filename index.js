const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const userRoutes = require("./routes/users");
const groupRoutes = require("./routes/groups");
const testRoutes = require("./routes/tests");
const authRoutes = require("./routes/auth");

app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/tests", testRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
