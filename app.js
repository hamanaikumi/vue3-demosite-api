const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
// cors設定
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// .envファイルの設定を読み込み
require("dotenv").config();

const DB_NAME = process.env.DB_NAME;
const USER_NAME = process.env.USER_NAME;
const USER_PASSWD = process.env.USER_PASSWD;
//クラスター名やホスティング先によって変わる
const HOST_NAME = process.env.HOST_NAME;
const MONGO_URI = `mongodb+srv://${USER_NAME}:${USER_PASSWD}@${HOST_NAME}/${DB_NAME}?retryWrites=true&w=majority`;

// MONGO_URIを設定
const DATABASE_URL = MONGO_URI || "http:localhost:3000";

MongoClient.connect(DATABASE_URL, async (error, client) => {
  if (error) {
    console.log("error :", error);
  } else {
    // req.app.locals.dbでアクセスできるように設定
    app.locals.db = client.db("demosite");
    // add Router
    const drinkRouter = require("./routes/drink");
    app.use("/drink", drinkRouter);

    const foodRouter = require("./routes/food");
    app.use("/food", foodRouter);

    const newsRouter = require("./routes/news");
    app.use("/news", newsRouter);

    const shopRouter = require("./routes/shop");
    app.use("/shop", shopRouter);

    const s3urlRouter = require("./routes/s3url");
    app.use("/s3url", s3urlRouter);

    // start express server
    var server = app.listen(PORT, function () {
      console.log("Node.js is listening to PORT:" + server.address().port);
    });
  }
});
