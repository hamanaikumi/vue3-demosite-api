const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await res.app.locals.db.collection("food").find().toArray();
  res.send(result);
});

router.post("/", async (req, res) => {
  const collection = res.app.locals.db.collection("food");
  // id取得
  const array = await res.app.locals.db.collection("food").find().toArray();
  const lastId = array.slice(-1)[0].id;

  await collection.insertOne(
    {
      id: lastId + 1,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    },
    function (err, data) {
      if (err) {
        res.send(500, "something went wrong");
      } else {
        res.send({
          status: "success",
          data: {
            id: lastId + 1,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
          },
        });
      }
    }
  );
});

module.exports = router;
