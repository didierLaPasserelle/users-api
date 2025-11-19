import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

// Route GET /users : récupère tous les users
router.get("/", getAllUsers);

// Route GET /users/:id : récupère un user précis
router.get("/:id", getUserById);

// Route POST /users : crée un user
router.post("/", createUser);

// Route PUT /users/:id : met à jour un user
router.put("/:id", updateUser);

// Route DELETE /users/:id : supprime un user
router.delete("/:id", deleteUser);

export default router;
