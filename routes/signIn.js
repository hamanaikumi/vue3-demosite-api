const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await res.app.locals.db
    .collection("user")
    .find({ userId: req.body.userId, password: req.body.password })
    .toArray();

  if (user.length > 0) {
    res.send({
      status: "success",
      data: {
        userId: req.body.userId,
        password: req.body.password,
      },
    });
  } else {
    res.send({
      status: "no user",
    });
  }
});

module.exports = router;
