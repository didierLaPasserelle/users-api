import users from "../data/users.js";

// Gestionnaire de route pour lister tous les users
const getAllUsers = (req, res) => {
  res.json(users);
};

// Gestionnaire de route pour récupérer un user par id
const getUserById = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "User id must be a number" });
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

// Gestionnaire de route pour créer un user
const createUser = (req, res) => {
  const { firstName, age, city } = req.body;

  const newUser = {
    id: Date.now(),
    firstName,
    age,
    city,
  };

  users.push(newUser);

  res.status(201).json(newUser);
};

// Gestionnaire de route pour mettre à jour un user
const updateUser = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "User id must be a number" });
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[userIndex] = {
    id,
    ...req.body,
  };

  res.json(users[userIndex]);
};

// Gestionnaire de route pour supprimer un user
const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "User id must be a number" });
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);

  res.status(204).end();
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
