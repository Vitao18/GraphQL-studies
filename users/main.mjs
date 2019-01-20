import express from "express";
import expressGraphQL from "express-graphql";

const app = express();

app.use("/graphql", expressGraphQL({ graphiql: true }));

app.get("/", (req, res) => res.json({ ok: true }));

app.listen(8080, () => console.log("ESM em com @std/esm"));
