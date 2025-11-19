import express from "express";
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Route de test pour vérifier que le serveur est en ligne
const confirmServerIsRunning = (req, res) => {
  res.json({ message: "Users API is running" });
};

app.get("/", confirmServerIsRunning);

// Routes pour les users
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// route = méthode HTTP + path
// gestionnaire de route = fonction qui est exécutée lorsque la route est visitée
