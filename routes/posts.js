const express = require("express");
const router = express.Router();
const controller = require("../controllers/PostController");

router.post("/add", controller.SavePost);
router.delete("/delete/:post_id", controller.DeletePost);
router.get("/:teacher_id", controller.getTeacherPosts);
module.exports = router;
