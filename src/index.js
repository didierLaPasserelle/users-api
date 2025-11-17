const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [
  { id: 1, firstName: "Alice", age: 28, city: "Paris" },
  { id: 2, firstName: "Bruno", age: 34, city: "Lyon" },
  { id: 3, firstName: "Chloé", age: 22, city: "Marseille" },
];

const confirmServerIsRunning = (req, res) => {
    res.json({ message: "Users API is running" });
  };

app.get("/", confirmServerIsRunning);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
