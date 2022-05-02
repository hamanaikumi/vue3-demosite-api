var express = require("express");
var router = express.Router();
var { generateUploadURL } = require("./s3");
var { deleteFile } = require("./s3");

// 画像URL生成
router.get("/", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

// 画像をバケットから削除
router.delete("/", async (req, res) => {
  await deleteFile(req.body.image);
  res.send({ status: "success" });
});

module.exports = router;
