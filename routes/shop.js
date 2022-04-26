const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await res.app.locals.db.collection("shop").find().toArray();
  res.send(result);
});

router.post("/", async (req, res) => {
  const collection = res.app.locals.db.collection("shop");
  // id取得
  const array = await res.app.locals.db.collection("shop").find().toArray();
  const lastId = array.slice(-1)[0].id;

  await collection.insertOne(
    {
      id: lastId + 1,
      name: req.body.name,
      postCode: req.body.postCode,
      address: req.body.address,
      holiday: req.body.holiday,
      tel: req.body.tel,
      open: req.body.open,
      seats: req.body.seats,
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
            postCode: req.body.postCode,
            postCode: req.body.postCode,
            image: req.body.image,
          },
        });
      }
    }
  );
});

module.exports = router;
