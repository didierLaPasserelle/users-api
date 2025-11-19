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

app.get("/", confirmServerIsRunning); // Vérifier si le serveur est en ligne

// Gestionnaire de route pour lister tous les users
const getAllUsers = (req, res) => {
  res.json(users);
};

// Route GET /users : récupère tous les users
app.get("/users", getAllUsers);

// Gestionnaire de route pour récupérer un user par id
const getUserById = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "User id must be a number" }); // verif NAN
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

// Route GET /users/:id : récupère un user précis
app.get("/users/:id", getUserById);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// route = méthode HTTP + path
// gestionnaire de route = fonction qui est exécutée lorsque la route est visitée
