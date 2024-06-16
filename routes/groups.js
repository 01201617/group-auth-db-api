const express = require("express");
const router = express.Router();
const pool = require("../db");
const authenticateToken = require("../middleware/auth");

// グループを作成
router.post("/", authenticateToken, async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO groups (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ユーザーをグループに追加
router.post("/:groupId/users/:userId", authenticateToken, async (req, res) => {
  const { groupId, userId } = req.params;
  try {
    await pool.query(
      "INSERT INTO user_groups (group_id, user_id) VALUES ($1, $2)",
      [groupId, userId]
    );
    res.json({ message: "User added to group" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
