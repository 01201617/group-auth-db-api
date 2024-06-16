const express = require("express");
const router = express.Router();
const pool = require("../db");
const authenticateToken = require("../middleware/auth");

// 試験データを作成
router.post("/", authenticateToken, async (req, res) => {
  const { content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tests (content) VALUES ($1) RETURNING *",
      [content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// グループに試験データを関連付け
router.post("/:testId/groups/:groupId", authenticateToken, async (req, res) => {
  const { testId, groupId } = req.params;
  try {
    await pool.query(
      "INSERT INTO group_tests (test_id, group_id) VALUES ($1, $2)",
      [testId, groupId]
    );
    res.json({ message: "Test linked to group" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ユーザーがアクセスできる試験データを取得
router.get("/user/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT DISTINCT t.* FROM tests t
      JOIN group_tests gt ON t.test_id = gt.test_id
      JOIN user_groups ug ON gt.group_id = ug.group_id
      WHERE ug.user_id = $1
    `,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
