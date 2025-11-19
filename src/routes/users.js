import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
} from "../controllers/usersController.js";

// Route GET /users : récupère tous les users
router.get("/", getAllUsers);

// Route GET /users/:id : récupère un user précis
router.get("/:id", getUserById);

// Route POST /users : crée un user
router.post("/", createUser);

// Route PUT /users/:id : met à jour un user
router.put("/:id", updateUser);

export default router;
