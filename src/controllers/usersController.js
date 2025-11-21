import { supabase } from "../config/supabase.js";

// Gestionnaire de route pour lister tous les users
const getAllUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// Gestionnaire de route pour récupérer un user par id
const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "User id must be a number" });
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// Gestionnaire de route pour créer un user
const createUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is required" });
  }

  const { firstName, age, city } = req.body;

  const { data, error } = await supabase
    .from("users")
    .insert([{ firstName, age, city }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
};

// Gestionnaire de route pour mettre à jour un user
const updateUser = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "User id must be a number" });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is required" });
  }

  const { data, error } = await supabase
    .from("users")
    .update(req.body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// Gestionnaire de route pour supprimer un user
const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "User id must be a number" });
  }

  // Vérifier si le user existe avant de supprimer
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", id)
    .single();

  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  // Supprimer le user
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(204).end();
};

// Gestionnaire de route pour supprimer plusieurs users
const deleteMultipleUsers = async (req, res) => {
  if (!req.body || !req.body.ids) {
    return res
      .status(400)
      .json({ error: "ids property is required in request body" });
  }

  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "ids must be an array" });
  }

  // Filtrer les IDs valides
  const validIds = ids.filter((id) => !Number.isNaN(Number(id))).map(Number);

  if (validIds.length === 0) {
    return res.json({
      deleted: [],
      notFound: [],
    });
  }

  // Vérifier quels users existent avant suppression
  const { data: existingUsers } = await supabase
    .from("users")
    .select("id")
    .in("id", validIds);

  const existingIds = existingUsers.map((user) => user.id);
  const notFoundIds = validIds.filter((id) => !existingIds.includes(id));

  // Supprimer les users qui existent
  if (existingIds.length > 0) {
    const { error } = await supabase
      .from("users")
      .delete()
      .in("id", existingIds);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.json({
    deleted: existingIds,
    notFound: notFoundIds,
  });
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteMultipleUsers,
};
