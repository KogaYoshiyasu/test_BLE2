//cd C:\Users\mebiu\Documents\home\22T4081A\研究室\Webアプリ\server
//node http-server.js

//https://http-server-4ea977018793.herokuapp.com/

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.post("/save", (req, res) => {
  const data = req.body;
  console.log("受信データ:", data);
  fs.appendFileSync("data.json", JSON.stringify(data) + "\n");
  res.json({ message: "保存完了！" });
});

app.get("/data", (req, res) => {
  try {
    const data = fs.readFileSync("data.json", "utf8");
    const lines = data.trim().split("\n").map(line => JSON.parse(line));
    res.json(lines);
  } catch {
    res.json({ message: "できてない" });
  }
});

app.delete("/data", (req, res) => {
  fs.writeFileSync("data.json", "");
  res.json({ message: "データを削除しました。" });
});

app.listen(PORT, () => { 
    console.log(`✅ サーバー起動中: ポート ${PORT}`);
});