const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await res.app.locals.db.collection("news").find().toArray();
  res.send(result);
});

router.post("/", async (req, res) => {
  const collection = res.app.locals.db.collection("news");
  // id取得
  const array = await res.app.locals.db.collection("news").find().toArray();
  const id = array[array.length - 1].id + 1;

  await collection.insertOne(
    {
      id: id,
      date: req.body.date,
      title: req.body.title,
      detail: req.body.detail,
      image: req.body.image,
    },
    function (err, data) {
      if (err) {
        res.send(500, "something went wrong");
      } else {
        res.send({
          status: "success",
          data: {
            id: id,
            date: req.body.date,
            title: req.body.title,
            detail: req.body.detail,
            image: req.body.image,
          },
        });
      }
    }
  );
});

module.exports = router;
