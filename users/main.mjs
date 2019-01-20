import express from "express";
const app = express();
app.get("/", (req, res) => res.json({ ok: true }));
app.listen(8080, () => console.log("ESM em com @std/esm"));
